
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, paymentMethod } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get order details
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) throw orderError;

    if (paymentMethod === 'stripe' && order.stripe_session_id) {
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2023-10-16",
      });

      const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id);
      
      if (session.payment_status === 'paid') {
        // Update order status
        await supabaseClient
          .from('orders')
          .update({ 
            payment_status: 'paid',
            order_status: 'processing',
            stripe_payment_intent_id: session.payment_intent
          })
          .eq('id', orderId);

        // Update stock quantities
        const { data: orderItems } = await supabaseClient
          .from('order_items')
          .select('product_id, quantity')
          .eq('order_id', orderId);

        for (const item of orderItems || []) {
          await supabaseClient.rpc('update_product_stock', {
            product_id: item.product_id,
            quantity_sold: item.quantity
          });
        }

        return new Response(
          JSON.stringify({ status: 'paid', order }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ status: order.payment_status, order }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
