import fs from "fs";
import path from "path";
import https from "https";

const FILE_KEY = "aGMqzHMsAiwCUU5DSgUe1S";
const TOKEN = process.env.FIGMA_TOKEN;
const OUT_DIR = path.resolve("public/figma-exports/radio");

const variants = [
  { selected: "off", state: "default", border: "on", inverted: "off", size: "medium", nodeId: "360:642" },
  { selected: "off", state: "default", border: "on", inverted: "off", size: "small", nodeId: "526:14111" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:660" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "small", nodeId: "526:14120" },
  { selected: "off", state: "default", border: "on", inverted: "on", size: "medium", nodeId: "360:651" },
  { selected: "off", state: "default", border: "on", inverted: "on", size: "small", nodeId: "526:14677" },
  { selected: "off", state: "default", border: "off", inverted: "on", size: "medium", nodeId: "360:669" },
  { selected: "off", state: "default", border: "off", inverted: "on", size: "small", nodeId: "526:14686" },
  { selected: "off", state: "error", border: "on", inverted: "off", size: "medium", nodeId: "360:678" },
  { selected: "off", state: "error", border: "on", inverted: "off", size: "small", nodeId: "526:14129" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:698" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "small", nodeId: "526:14139" },
  { selected: "off", state: "error", border: "on", inverted: "on", size: "medium", nodeId: "360:688" },
  { selected: "off", state: "error", border: "on", inverted: "on", size: "small", nodeId: "526:14695" },
  { selected: "off", state: "error", border: "off", inverted: "on", size: "medium", nodeId: "360:708" },
  { selected: "off", state: "error", border: "off", inverted: "on", size: "small", nodeId: "526:14705" },
  { selected: "off", state: "disabled", border: "on", inverted: "off", size: "medium", nodeId: "360:718" },
  { selected: "off", state: "disabled", border: "on", inverted: "off", size: "small", nodeId: "526:14149" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:736" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "small", nodeId: "526:14158" },
  { selected: "off", state: "disabled", border: "on", inverted: "on", size: "medium", nodeId: "360:727" },
  { selected: "off", state: "disabled", border: "on", inverted: "on", size: "small", nodeId: "526:14715" },
  { selected: "off", state: "disabled", border: "off", inverted: "on", size: "medium", nodeId: "360:745" },
  { selected: "off", state: "disabled", border: "off", inverted: "on", size: "small", nodeId: "526:14724" },
  { selected: "on", state: "default", border: "on", inverted: "off", size: "medium", nodeId: "360:790" },
  { selected: "on", state: "default", border: "on", inverted: "off", size: "small", nodeId: "526:14167" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:808" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "small", nodeId: "526:14176" },
  { selected: "on", state: "default", border: "on", inverted: "on", size: "medium", nodeId: "360:799" },
  { selected: "on", state: "default", border: "on", inverted: "on", size: "small", nodeId: "526:14733" },
  { selected: "on", state: "default", border: "off", inverted: "on", size: "medium", nodeId: "360:817" },
  { selected: "on", state: "default", border: "off", inverted: "on", size: "small", nodeId: "526:14742" },
  { selected: "on", state: "error", border: "on", inverted: "off", size: "medium", nodeId: "360:826" },
  { selected: "on", state: "error", border: "on", inverted: "off", size: "small", nodeId: "526:14185" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:846" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "small", nodeId: "526:14195" },
  { selected: "on", state: "error", border: "on", inverted: "on", size: "medium", nodeId: "360:836" },
  { selected: "on", state: "error", border: "on", inverted: "on", size: "small", nodeId: "526:14751" },
  { selected: "on", state: "error", border: "off", inverted: "on", size: "medium", nodeId: "360:856" },
  { selected: "on", state: "error", border: "off", inverted: "on", size: "small", nodeId: "526:14761" },
  { selected: "on", state: "disabled", border: "on", inverted: "off", size: "medium", nodeId: "360:866" },
  { selected: "on", state: "disabled", border: "on", inverted: "off", size: "small", nodeId: "526:14205" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:884" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "small", nodeId: "526:14214" },
  { selected: "on", state: "disabled", border: "on", inverted: "on", size: "medium", nodeId: "360:875" },
  { selected: "on", state: "disabled", border: "on", inverted: "on", size: "small", nodeId: "526:14771" },
  { selected: "on", state: "disabled", border: "off", inverted: "on", size: "medium", nodeId: "360:893" },
  { selected: "on", state: "disabled", border: "off", inverted: "on", size: "small", nodeId: "526:14780" },
];

// Also export the full component set grid
const GRID_NODE_ID = "360:641";

function fileName(v) {
  return `${v.selected}-${v.state}-${v.border}-${v.inverted}-${v.size}.png`;
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "X-Figma-Token": TOKEN } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${data.slice(0, 200)}`)); }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

async function main() {
  if (!TOKEN) {
    console.error("Set FIGMA_TOKEN env var");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Build node ID list (all 48 variants + grid)
  const allNodeIds = [...variants.map((v) => v.nodeId), GRID_NODE_ID];

  // Figma API allows batching node IDs in a single request
  const ids = allNodeIds.join(",");
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

  console.log(`Requesting export URLs for ${allNodeIds.length} nodes...`);
  const resp = await fetchJSON(url);

  if (resp.err) {
    console.error("Figma API error:", resp.err);
    process.exit(1);
  }

  const images = resp.images;
  let downloaded = 0;
  let failed = 0;

  // Download variant images
  for (const v of variants) {
    const imgUrl = images[v.nodeId];
    if (!imgUrl) {
      console.warn(`  SKIP ${v.nodeId} — no URL returned`);
      failed++;
      continue;
    }
    const dest = path.join(OUT_DIR, fileName(v));
    try {
      await downloadFile(imgUrl, dest);
      downloaded++;
      process.stdout.write(`  [${downloaded}/${variants.length}] ${fileName(v)}\n`);
    } catch (e) {
      console.warn(`  FAIL ${fileName(v)}: ${e.message}`);
      failed++;
    }
  }

  // Download grid image
  const gridUrl = images[GRID_NODE_ID];
  if (gridUrl) {
    const gridDest = path.join(OUT_DIR, "grid-full.png");
    await downloadFile(gridUrl, gridDest);
    console.log(`  grid-full.png downloaded`);
  }

  console.log(`\nDone: ${downloaded} downloaded, ${failed} failed`);
}

main().catch((e) => { console.error(e); process.exit(1); });
