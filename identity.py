import json

IDENTITY = {
    "name": "gabriellab-presence",
    "version": "0.0.1",
    "lab": "gabriellab",
    "registry": "gh-releases",
    "description": "Lab identity beacon — S&P 500 per-ticker mastery lab",
    "published_at": "2026-06-09",
    "homepage": "https://github.com/zachgladstone/gabriellab-presence",
}

if __name__ == "__main__":
    print(json.dumps(IDENTITY, indent=2))
