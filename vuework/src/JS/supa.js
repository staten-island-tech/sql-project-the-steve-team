import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vxaferopnqdpzeundppw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4YWZlcm9wbnFkcHpldW5kcHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzQ4MTIzMCwiZXhwIjoxOTk5MDU3MjMwfQ.tVG2YuF-_XHSDtUYqchdpQjlLRmd2n7LZaPI-i88vhA"
const supabase = createClient(supabaseUrl, supabaseKey)

const SUPA = {
    base: supabase
}
export {SUPA}