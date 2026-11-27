#!/bin/bash
# Capture and encode all five prototypes.
set -e
cd "$(dirname "$0")"
for p in p1 p2 p3 p4 p5; do
  node capture.mjs "$p"
  ./encode.sh "$p"
done
