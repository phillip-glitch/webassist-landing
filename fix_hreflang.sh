#!/bin/bash
BASE="/Users/bjerg/WebAssistant"

declare -A MAP=(
  [for-accountants]=for-revisorer
  [for-architects]=for-arkitekter
  [for-bakeries]=for-bagerier
  [for-builders]=for-murer
  [for-cafes]=for-cafer
  [for-cleaning-companies]=for-rengoeringsfirmaer
  [for-clinics]=for-klinikker
  [for-coaches]=for-coaches
  [for-consultants]=for-konsulenter
  [for-dentists]=for-tandlaeger
  [for-driving-schools]=for-korekole
  [for-electricians]=for-elektrikere
  [for-event-planners]=for-eventplanlaeggere
  [for-hair-salons]=for-frisorer
  [for-hairdressers]=for-frisorer
  [for-hotels]=for-hotels
  [for-landscapers]=for-gartneri
  [for-law-firms]=for-advokater
  [for-local-businesses]=for-lokale-virksomheder
  [for-music-schools]=for-musikskoler
  [for-musicians]=for-musikere
  [for-painters]=for-maler
  [for-personal-trainers]=for-personlige-traenere
  [for-photographers]=for-fotografer
  [for-physiotherapists]=for-fysioterapeuter
  [for-plumbers]=for-VVS
  [for-real-estate]=for-ejendomsmaglere
  [for-restaurants]=for-restauranter
  [for-sports-clubs]=for-sportsklubber
  [for-tattoo-studios]=for-tatoverer
  [for-veterinarians]=for-dyreklinikker
  [for-yoga-studios]=for-yogastudie
)

for EN_SLUG in "${!MAP[@]}"; do
  DA_SLUG="${MAP[$EN_SLUG]}"
  EN_FILE="$BASE/en/$EN_SLUG/index.html"
  DA_FILE="$BASE/da/$DA_SLUG/index.html"

  # Fix EN page
  if [ -f "$EN_FILE" ]; then
    sed -i '' '/rel="alternate" hreflang=/d' "$EN_FILE"
    sed -i '' "/rel=\"canonical\"/a\\
  <link rel=\"alternate\" hreflang=\"en\" href=\"https://dynamicmedia.dk/en/${EN_SLUG}/\" />\\
  <link rel=\"alternate\" hreflang=\"da\" href=\"https://dynamicmedia.dk/da/${DA_SLUG}/\" />\\
  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://dynamicmedia.dk/en/${EN_SLUG}/\" />
" "$EN_FILE"
    echo "Fixed EN: $EN_SLUG -> $DA_SLUG"
  else
    echo "MISSING EN: $EN_FILE"
  fi

  # Fix DA page
  if [ -f "$DA_FILE" ]; then
    sed -i '' '/rel="alternate" hreflang=/d' "$DA_FILE"
    sed -i '' "/rel=\"canonical\"/a\\
  <link rel=\"alternate\" hreflang=\"da\" href=\"https://dynamicmedia.dk/da/${DA_SLUG}/\" />\\
  <link rel=\"alternate\" hreflang=\"en\" href=\"https://dynamicmedia.dk/en/${EN_SLUG}/\" />\\
  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://dynamicmedia.dk/en/${EN_SLUG}/\" />
" "$DA_FILE"
    echo "Fixed DA: $DA_SLUG -> $EN_SLUG"
  else
    echo "MISSING DA: $DA_FILE"
  fi
done

echo ""
echo "=== HREFLANG FIX COMPLETE ==="
