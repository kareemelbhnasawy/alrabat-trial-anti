import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
let supabaseUrl = "";
let supabaseKey = "";

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    if (line.startsWith("VITE_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim();
    }
    if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) {
      supabaseKey = line.split("=")[1].trim();
    }
  }
}

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDB() {
  console.log("Checking divisions table...");
  const { data, error } = await supabase.from("divisions").select("*").limit(1);

  if (error) {
    console.log("Error or table not found:", error.message);
  } else {
    console.log("Found divisions table!", data);
    if (data && data.length > 0) {
      console.log("Sample row:", data[0]);
    }
  }

  // Also check for 'hero' or 'settings' table
  console.log("Checking settings/hero table...");
  const { data: settings, error: sErr } = await supabase
    .from("settings")
    .select("*")
    .limit(1);
  if (sErr) {
    console.log("Error or table not found:", sErr.message);
  } else {
    console.log("Found settings table!", settings);
  }
}

checkDB();
