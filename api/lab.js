/**
 * gabriellab presence service — Vercel serverless handler
 * Node.js CommonJS module (Vercel default).
 */

module.exports = function handler(req, res) {
  const platform = process.env.LAB_PLATFORM || "vercel-serverless";
  const nostr_npub = process.env.LAB_NOSTR_NPUB || "pending";
  const ipfs_peer_id = process.env.LAB_IPFS_PEER_ID || "pending";
  const onion = process.env.LAB_TOR_ONION || "pending";

  const identity = {
    identity: "gabriellab",
    platform,
    nostr_npub,
    ipfs_peer_id,
    onion,
    deployed_at: new Date().toISOString(),
    request_path: req.url || "/",
    lives_independently_of_mac: true,
    handshake: "mutual",
  };

  res.setHeader("content-type", "application/json");
  res.setHeader("access-control-allow-origin", "*");
  res.status(200).json(identity);
};
