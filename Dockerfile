FROM python:3.11-slim

LABEL org.opencontainers.image.title="gabriellab-presence" \
      org.opencontainers.image.version="0.0.1" \
      org.opencontainers.image.description="Lab identity beacon — S&P 500 per-ticker mastery lab" \
      org.opencontainers.image.url="https://github.com/zachgladstone/gabriellab-presence" \
      org.opencontainers.image.source="https://github.com/zachgladstone/gabriellab-presence" \
      org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY identity.py ./identity.py

CMD ["python", "identity.py"]