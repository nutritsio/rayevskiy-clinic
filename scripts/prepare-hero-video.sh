#!/usr/bin/env bash

set -euo pipefail

INPUT_PATH="${1:-public/assets/hero/hero.MP4}"
OUTPUT_DIR="${2:-public/assets/hero}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed."
  echo "Install ffmpeg and re-run this script."
  exit 1
fi

if [ ! -f "$INPUT_PATH" ]; then
  echo "Error: input file not found: $INPUT_PATH"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Generating MP4 fallback..."
ffmpeg -y -i "$INPUT_PATH" \
  -an \
  -vf "scale=1280:-2,fps=24" \
  -c:v libx264 \
  -preset slow \
  -crf 24 \
  -movflags +faststart \
  "$OUTPUT_DIR/hero-bg.mp4"

echo "Generating WEBM primary..."
ffmpeg -y -i "$INPUT_PATH" \
  -an \
  -vf "scale=1280:-2,fps=24" \
  -c:v libvpx-vp9 \
  -b:v 0 \
  -crf 34 \
  "$OUTPUT_DIR/hero-bg.webm"

echo "Done:"
ls -lh "$OUTPUT_DIR/hero-bg.mp4" "$OUTPUT_DIR/hero-bg.webm"
