#!/bin/bash
# PNG sequence → MP4 (h264) for review, and a GIF for inline previews.
#   ./encode.sh p1          → out/p1.mp4 + review/p1.gif
set -e
cd "$(dirname "$0")"
mkdir -p out review
for p in "$@"; do
  ffmpeg -y -loglevel error -framerate 30 -i "frames/$p/%04d.png" \
    -vf "scale=1280:720:flags=lanczos,format=yuv420p" \
    -c:v libx264 -preset slow -crf 19 -profile:v high -level 4.0 \
    -movflags +faststart -an "out/$p.mp4"
  ffmpeg -y -loglevel error -i "out/$p.mp4" \
    -vf "fps=18,scale=900:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle" \
    -loop 0 "review/$p.gif"
  echo "$p → out/$p.mp4 + review/$p.gif"
done
