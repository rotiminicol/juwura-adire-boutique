
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
    const { items, customerInfo, shippingAddress, paymentMethod } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create customer record
    const { data: customer, error: customerError } = await supabaseClient
      .from('customers')
      .insert({
        email: customerInfo.email,
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        phone: customerInfo.phone
      })
      .select()
      .single();

    if (customerError) throw customerError;

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Generate order number
    const { data: orderNumberData } = await supabaseClient.rpc('generate_order_number');
    const orderNumber = orderNumberData;

    // Create order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        customer_id: customer.id,
        order_number: orderNumber,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        payment_status: 'pending',
        order_status: 'processing'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    if (paymentMethod === 'stripe') {
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2023-10-16",
      });

      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item: any) => ({
          price_data: {
            currency: "ngn",
            product_data: {
              name: item.name,
              images: [item.image]
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${req.headers.get("origin")}/checkout/success?order_id=${order.id}`,
        cancel_url: `${req.headers.get("origin")}/checkout/cancel?order_id=${order.id}`,
        metadata: {
          order_id: order.id,
        },
      });

      // Update order with Stripe session ID
      await supabaseClient
        .from('orders')
        .update({ stripe_session_id: session.id })
        .eq('id', order.id);

      return new Response(
        JSON.stringify({ url: session.url, order_id: order.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Bank transfer payment
      return new Response(
        JSON.stringify({ 
          order_id: order.id,
          bank_details: {
            bank_name: "Sparkle Bank",
            account_number: "2324555254324",
            account_name: "Juwura Adire",
            amount: totalAmount / 100, // Convert from kobo to naira
            reference: orderNumber
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
