const { createClient } = require("@supabase/supabase-js");
const express = require('express');
const router = express.Router();


const supabaseUrl = 'https://wrdalmrnoeslzthwqnuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGFsbXJub2VzbHp0aHdxbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NjA2NzQsImV4cCI6MjAyMjIzNjY3NH0.06458Qm3WYUFqscMrkk2MNOcPGXsqjAkbSsv1lZbjok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn(email, password) {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in: ", error.message);
  } else {
    console.log("User signed in: ", user);
  }
}

async function signUp(email, password) {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up: ", error.message);
  } else {
    console.log("User signed up: ", user);
  }
}

module.exports = router;
