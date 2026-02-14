import fs from "fs";
import path from "path";
import https from "https";

const envPath = path.resolve(process.cwd(), ".env");
let supabaseUrl = "";

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    if (line.startsWith("VITE_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim();
    }
  }
}

if (!supabaseUrl) {
  console.log("No Supabase URL found");
  process.exit(1);
}

// Construct likely URLs
// Standard format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[file]
const candidates = [
  `${supabaseUrl}/storage/v1/object/public/videos/hero.mp4`,
  `${supabaseUrl}/storage/v1/object/public/public/hero.mp4`,
  `${supabaseUrl}/storage/v1/object/public/assets/hero.mp4`,
  `${supabaseUrl}/storage/v1/object/public/media/hero.mp4`,
  `${supabaseUrl}/storage/v1/object/public/hero/hero.mp4`, // sometimes bucket is named 'hero'
];

console.log("Checking URLs...");

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD" }, (res) => {
      console.log(`${url} -> ${res.statusCode}`);
      if (res.statusCode === 200 || res.statusCode === 206) {
        resolve(url);
      } else {
        resolve(null);
      }
    });
    req.on("error", () => resolve(null));
    req.end();
  });
}

async function run() {
  for (const url of candidates) {
    const found = await checkUrl(url);
    if (found) {
      console.log("FOUND:", found);
      process.exit(0);
    }
  }
  console.log("No valid video URL found.");
}

run();
