import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterSignupData {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Newsletter signup function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { email }: NewsletterSignupData = await req.json();
    console.log('Newsletter signup for:', email);

    const emailResponse = await resend.emails.send({
      from: "HBCX Digital Securities <onboarding@resend.dev>",
      to: ["david@bingabeach.com"],
      subject: `Newsletter Signup - HBCX Digital Securities`,
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signed up on:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Please add this email to the HBCX Digital Securities newsletter list.</p>
      `,
    });

    console.log("Newsletter signup email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);