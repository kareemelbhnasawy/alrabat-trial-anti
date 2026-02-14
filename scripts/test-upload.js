import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load env
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

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing upload of small file to 'videos'...");
  const dummyBuffer = Buffer.from("test videocontent");
  const fileName = "test.txt";

  const { data, error } = await supabase.storage
    .from("videos")
    .upload(fileName, dummyBuffer, {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.error(
      `Test Upload Failed: ${error.message} (Status: ${error.statusCode})`,
    );
    if (error.message.includes("Bucket not found")) {
      console.log(
        "CONFIRMED: Bucket 'videos' is not accessible. Please check permissions or creation.",
      );
    }
  } else {
    console.log(`Test Upload SUCCESS! Bucket 'videos' works.`);
    const { data: publicUrlData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);
    console.log(`URL: ${publicUrlData.publicUrl}`);
  }
}

test();
