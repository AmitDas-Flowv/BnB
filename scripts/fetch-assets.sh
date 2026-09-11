#!/usr/bin/env bash
# ============================================================
# Localize remote images into /assets/img and repoint data.js.
#
# Why: the prototype hotlinks generated images from a CDN so it
# renders instantly. Before deploying to production you want them
# served from your own repo. Run this on YOUR machine (not the
# build sandbox, whose network egress is restricted).
#
# Usage:   bash scripts/fetch-assets.sh
# Then:    git add assets/img assets/js/data.js
#          git commit -m "Localize image assets"
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

DATA="assets/js/data.js"
IMGDIR="assets/img"
mkdir -p "$IMGDIR"

CDN=$(grep -oE 'const CDN = "[^"]+"' "$DATA" | sed -E 's/const CDN = "([^"]+)"/\1/')
echo "CDN base : $CDN"

# All filenames referenced as:  CDN + "something.png"
FILES=$(grep -oE 'CDN \+ "[^"]+\.png"' "$DATA" | sed -E 's/CDN \+ "([^"]+)"/\1/' | sort -u)

if [ -z "$FILES" ]; then
  echo "No CDN-referenced images found (already localized?)."
  exit 0
fi

for f in $FILES; do
  echo "Downloading $f"
  curl -fsSL "$CDN$f" -o "$IMGDIR/$f"
done

# Repoint data.js:  CDN + "file.png"  ->  "assets/img/file.png"
sed -i.bak -E 's#CDN \+ "([^"]+\.png)"#"assets/img/\1"#g' "$DATA" && rm -f "$DATA.bak"

echo
echo "Done. Images saved to $IMGDIR and $DATA now uses local paths."
echo "Next: git add assets/img assets/js/data.js && git commit -m 'Localize image assets'"
