import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rrhiqiwlgakcmjmvcgak.supabase.co'
const SUPABASE_KEY = 'sb_publishable_poc9C8kOyGD3noxtCZteSw_NSXG9vxq'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
