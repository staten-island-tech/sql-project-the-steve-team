import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vxaferopnqdpzeundppw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4YWZlcm9wbnFkcHpldW5kcHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzQ4MTIzMCwiZXhwIjoxOTk5MDU3MjMwfQ.tVG2YuF-_XHSDtUYqchdpQjlLRmd2n7LZaPI-i88vhA"
const supabase = createClient(supabaseUrl, supabaseKey)

const SUPA = {
    base: supabase,
    userSignUp: async function(username,email,password){
        return await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                },
                emailRedirectTo: {

                }
            }
        })
    },
    userLogIn: async function(email,password){
        return await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
    },
    getCurrentUser: async function(){
        const { data: { user } } = await supabase.auth.getUser()
        return user
    }
}
export {SUPA}