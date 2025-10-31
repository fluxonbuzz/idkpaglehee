import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { env } from '../env'

export const getBrowserSupabase = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

export const getServerSupabase = (cookies: {
  get(name: string): { name: string; value: string } | undefined
  set(name: string, value: string, options: CookieOptions): void
  remove(name: string, options: CookieOptions): void
}) =>
  createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies,
  })

// Admin client for server-side operations (RLS bypass). DO NOT expose to client.
export const getAdminSupabase = () =>
  createAdminClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)


