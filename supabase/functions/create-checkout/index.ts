
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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { items, shippingData, paymentMethod, shippingMethodId } = await req.json();

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    // Get shipping cost
    const { data: shippingMethod } = await supabaseClient
      .from('shipping_methods')
      .select('price')
      .eq('id', shippingMethodId)
      .single();

    const shippingCost = shippingMethod?.price || 0;
    const total = subtotal + shippingCost;

    // Generate order number
    const { data: orderNumber } = await supabaseClient.rpc('generate_order_number');

    // Create customer
    const { data: customer, error: customerError } = await supabaseClient
      .from('customers')
      .insert({
        first_name: shippingData.firstName,
        last_name: shippingData.lastName,
        email: shippingData.email,
        phone: shippingData.phone
      })
      .select()
      .single();

    if (customerError) throw customerError;

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'ngn',
          product_data: {
            name: item.name,
            images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: item.price, // Already in kobo
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get("origin")}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      metadata: {
        customer_id: customer.id,
        order_number: orderNumber,
        shipping_method_id: shippingMethodId,
      },
    });

    // Create order in database
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        customer_id: customer.id,
        order_number: orderNumber,
        total_amount: total,
        subtotal_amount: subtotal,
        shipping_cost: shippingCost,
        shipping_method_id: shippingMethodId,
        payment_method: 'stripe',
        payment_status: 'pending',
        order_status: 'processing',
        stripe_session_id: session.id,
        shipping_address: {
          street_address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          postal_code: shippingData.zipCode,
          country: 'Nigeria'
        }
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

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error creating checkout:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
