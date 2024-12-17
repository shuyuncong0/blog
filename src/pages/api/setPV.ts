import type { APIRoute } from "astro";
import { Redis } from '@upstash/redis'
const isDev = import.meta.env.DEV;
const KV_REST_API_URL =  Buffer.from("aHR0cHM6Ly9vcmdhbmljLXJhdHRsZXItMzMwMDQudXBzdGFzaC5pbw==", 'base64').toString('utf-8');
const KV_REST_API_TOKEN = Buffer.from("QVlEc0FBSWpjREUyTkdJek1HUmpZMlJqWmprME1XUmtPVFUxTURrM01EVXpOR1F4TlRJNE1uQXhNQQ==", 'base64').toString('utf-8');

export const prerender = false;
export const GET: APIRoute = async ctx => {
  
  if (isDev) {
    return new Response(
      JSON.stringify({
        state: "ok",
        message: "999+",
      })
    );
  }
  try {
   
    if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
      throw new Error("missing env");
    }
    
    const v = ctx.url.searchParams.get("v") || "404";
    const client = new Redis({
      url: KV_REST_API_URL,
      token: KV_REST_API_TOKEN,
    });
    const number = await client.incr(`PV_${v}`);
    return new Response(
      JSON.stringify({
        state: "ok",
        message: number,
      })
    );
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};