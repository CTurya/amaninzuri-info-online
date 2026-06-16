// Client-side middleware: attach the user's Supabase access token to every
// outgoing server-function request so the server-side `requireSupabaseAuth`
// middleware can authenticate the caller.
import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
);
