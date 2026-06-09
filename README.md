# gabriellab presence service

A minimal identity beacon that runs on four free-tier internet platforms — none of which require the Mac to be online.

## What it returns (JSON)

| Field | Description |
|---|---|
| `identity` | Always `"gabriellab"` |
| `platform` | Populated from `LAB_PLATFORM` env var |
| `nostr_npub` | From `LAB_NOSTR_NPUB` env var (default: `"pending"`) |
| `ipfs_peer_id` | From `LAB_IPFS_PEER_ID` env var (default: `"pending"`) |
| `onion` | From `LAB_TOR_ONION` env var (default: `"pending"`) |
| `deployed_at` | ISO timestamp at request time (edge/serverless only) |
| `request_path` | URL path of the incoming request |
| `lives_independently_of_mac` | Always `true` |
| `handshake` | Always `"mutual"` |

---

## Platform 1 — Cloudflare Workers

**File:** `index.js` + `wrangler.toml`

### One-command deploy
```bash
npx wrangler deploy
```

### Auth check
```bash
npx wrangler whoami
```

If not logged in:
```bash
npx wrangler login   # opens browser → OAuth → free account
npx wrangler deploy
```

### Set optional env vars
```bash
npx wrangler secret put LAB_NOSTR_NPUB
npx wrangler secret put LAB_IPFS_PEER_ID
npx wrangler secret put LAB_TOR_ONION
```

---

## Platform 2 — Vercel

**Files:** `vercel.json` + `api/lab.js`

### One-command deploy
```bash
npx vercel --prod
```

### Auth check
```bash
npx vercel whoami
```

If not logged in:
```bash
npx vercel login   # prompts for email or GitHub OAuth
npx vercel --prod
```

### Set optional env vars (dashboard or CLI)
```bash
npx vercel env add LAB_NOSTR_NPUB production
npx vercel env add LAB_IPFS_PEER_ID production
npx vercel env add LAB_TOR_ONION production
```

---

## Platform 3 — Deno Deploy

**File:** `index.js` (same ES-module export — fully compatible with Deno Deploy)

### One-command deploy (via deployctl)
```bash
deployctl deploy --project=gabriellab-presence index.js
```

### Auth check
```bash
deployctl whoami
```

If not logged in:
1. Go to https://dash.deno.com and create a free account.
2. Generate a token: Dashboard → Account → Access Tokens.
3. `export DENO_DEPLOY_TOKEN=<your_token>`
4. `deployctl deploy --project=gabriellab-presence index.js`

### Set env vars
In the Deno Deploy dashboard → Project → Settings → Environment Variables, add:
- `LAB_PLATFORM=deno-deploy`
- `LAB_NOSTR_NPUB`, `LAB_IPFS_PEER_ID`, `LAB_TOR_ONION` (optional)

---

## Platform 4 — GitHub Pages (static)

**File:** `index.html`

The static page embeds the lab identity in a `<script type="application/json" id="lab-identity">` block and renders it via inline JS.

### One-command deploy
```bash
# From the presence_service directory (or a dedicated repo):
git init
git add index.html
git commit -m "feat: gabriellab presence static page"
gh repo create gabriellab-presence --public --source=. --push
# Then in GitHub repo Settings → Pages → Source: main branch / root
```

Or push to an existing repo and enable Pages from the repo settings.

---

## Environment variable contract

| Variable | Required | Default | Description |
|---|---|---|---|
| `LAB_PLATFORM` | No | `"edge-worker"` | Human-readable platform name |
| `LAB_NOSTR_NPUB` | No | `"pending"` | Nostr public key (npub...) |
| `LAB_IPFS_PEER_ID` | No | `"pending"` | IPFS peer ID |
| `LAB_TOR_ONION` | No | `"pending"` | Tor .onion v3 address |

---

## File map

```
presence_service/
  index.js          # Cloudflare Workers + Deno Deploy handler (ES module)
  wrangler.toml     # Cloudflare Workers config
  vercel.json       # Vercel routing config
  api/
    lab.js          # Vercel serverless handler (Node.js CommonJS)
  index.html        # GitHub Pages static beacon
  README.md         # This file
```

---

## Staged deploy log

See `/Volumes/ZG-2TB/zg/lab/state/off_mac_deployments/STAGED_DEPLOY.md` for platform-by-platform auth status and next steps.
