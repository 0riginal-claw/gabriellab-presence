/**
 * gabriellab presence service — Node.js HTTP server wrapper
 * Used by: Render, Railway, Fly.io, Modal (and any plain-Node host).
 * Reuses the same identity object as the Workers/Deno edge variant.
 */

import { createServer } from "node:http";

const PORT = parseInt(process.env.PORT || "8080", 10);

const handler = (req, res) => {
  const identity = {
    identity: "gabriellab",
    platform: process.env.LAB_PLATFORM || "node-http",
    nostr_npub: process.env.LAB_NOSTR_NPUB || "pending",
    ipfs_peer_id: process.env.LAB_IPFS_PEER_ID || "pending",
    onion: process.env.LAB_TOR_ONION || "pending",
    deployed_at: new Date().toISOString(),
    request_path: req.url || "/",
    lives_independently_of_mac: true,
    handshake: "mutual",
  };

  const body = JSON.stringify(identity, null, 2);
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
};

createServer(handler).listen(PORT, () => {
  console.log(`gabriellab presence service listening on :${PORT}`);
});
