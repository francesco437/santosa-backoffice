import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrhiqiwlgakcmjmvcgak.supabase.co'
const supabaseAnonKey = 'sb_publishable_poc9C8kOyGD3noxtCZteSw_NSXG9vxq'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
