"""gabriellab-presence — lab identity beacon."""

import json

IDENTITY = {
    "name": "gabriellab-presence",
    "version": "0.0.1",
    "lab": "gabriellab",
    "registry": "pypi",
    "description": "Lab identity beacon — S&P 500 per-ticker mastery lab",
    "published_at": "2026-06-09",
    "homepage": "https://github.com/zachgladstone/gabriellab-presence",
}


def identity() -> dict:
    """Return the lab identity dict."""
    return IDENTITY


def main() -> None:
    print(json.dumps(IDENTITY, indent=2))


if __name__ == "__main__":
    main()
