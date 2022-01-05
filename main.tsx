import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case "GET": {
      return new Response("a", {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    case "POST": {
      const body = await req.formData();
      const name = body.get("name") || "anonymous";
      return new Response(`Hello ${name}!`);
    }

    default:
      return new Response("Invalid method", { status: 405 });
  }
}

console.log("Listening on http://localhost:8000");
serve(handler);
