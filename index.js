/**
 * gabriellab presence service
 * ES-module default export fetch handler.
 * Compatible with: Cloudflare Workers, Deno Deploy.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const identity = {
      identity: "gabriellab",
      platform: (env && env.LAB_PLATFORM) ? env.LAB_PLATFORM : "edge-worker",
      nostr_npub: (env && env.LAB_NOSTR_NPUB) ? env.LAB_NOSTR_NPUB : "pending",
      ipfs_peer_id: (env && env.LAB_IPFS_PEER_ID) ? env.LAB_IPFS_PEER_ID : "pending",
      onion: (env && env.LAB_TOR_ONION) ? env.LAB_TOR_ONION : "pending",
      deployed_at: new Date().toISOString(),
      request_path: url.pathname,
      lives_independently_of_mac: true,
      handshake: "mutual",
    };

    return new Response(JSON.stringify(identity, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
  },
};
