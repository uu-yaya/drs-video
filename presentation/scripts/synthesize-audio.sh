#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# synthesize-audio.sh — read audio-segments.json and call edge-tts
# to produce one mp3 per segment under public/audio/<chapter>/<N>.mp3.
#
# Prereq:
#   1. npm run extract-narrations   (writes audio-segments.json)
#   2. pip install edge-tts
#
# Behavior:
#   • Serial calls (edge-tts is free but be polite).
#   • Skips segments whose mp3 already exists. Pass --force to overwrite.
#   • Defaults: voice=zh-CN-XiaoyiNeural, rate=+20% (lively, faster).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEGMENTS="$ROOT/audio-segments.json"
OUT_DIR="$ROOT/public/audio"

VOICE="zh-CN-XiaoyiNeural"
RATE="+20%"
FORCE=false

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    --voice=*) VOICE="${arg#--voice=}" ;;
    --rate=*) RATE="${arg#--rate=}" ;;
    *) echo "✗ unknown arg: $arg" >&2; exit 1 ;;
  esac
done

if [[ ! -f "$SEGMENTS" ]]; then
  echo "✗ $SEGMENTS not found. Run: npm run extract-narrations" >&2
  exit 1
fi
if ! command -v edge-tts >/dev/null; then
  echo "✗ edge-tts not in PATH. Install:  pip install edge-tts" >&2
  exit 1
fi
if ! command -v jq >/dev/null; then
  echo "✗ jq is required to read audio-segments.json" >&2
  exit 1
fi

total=$(jq 'length' "$SEGMENTS")
i=0
synthesized=0
skipped=0
failed=0

echo "▸ voice=$VOICE  rate=$RATE  total=$total"
echo

while IFS= read -r row; do
  i=$((i + 1))
  chapter=$(echo "$row" | jq -r '.chapter')
  step=$(echo "$row" | jq -r '.step')
  text=$(echo "$row" | jq -r '.text')
  out="$OUT_DIR/$chapter/$step.mp3"

  if [[ -z "$text" ]]; then
    skipped=$((skipped + 1))
    printf "[%3d/%d] %-30s skip (empty narration)\n" "$i" "$total" "$chapter/$step.mp3"
    continue
  fi

  if [[ -f "$out" && "$FORCE" != true ]]; then
    skipped=$((skipped + 1))
    printf "[%3d/%d] %-30s skip (exists)\n" "$i" "$total" "$chapter/$step.mp3"
    continue
  fi

  mkdir -p "$(dirname "$out")"
  start=$(date +%s)
  if edge-tts --text "$text" --voice "$VOICE" --rate "$RATE" --write-media "$out" >/dev/null 2>&1; then
    elapsed=$(( $(date +%s) - start ))
    synthesized=$((synthesized + 1))
    printf "[%3d/%d] %-30s ✓ %ss\n" "$i" "$total" "$chapter/$step.mp3" "$elapsed"
  else
    failed=$((failed + 1))
    printf "[%3d/%d] %-30s ✗ FAILED\n" "$i" "$total" "$chapter/$step.mp3" >&2
  fi
done < <(jq -c '.[]' "$SEGMENTS")

echo
echo "✓ done — synthesized $synthesized, skipped $skipped, failed $failed"
[[ $failed -eq 0 ]] || exit 2
