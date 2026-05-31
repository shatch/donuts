🍩 The Holy Order of the Donut
==============================

> "I love donuts" — the original README, and still the entire philosophy.

A humorous, viral-minded shrine to donut obsession. A fake quasi-religion that
worships fried, frosted, hole-bearing perfection with completely unearned
reverence. Built as a zero-dependency static site.

## What's inside

| Page | What it is |
|------|------------|
| `index.html` | The Shrine — hero, Drool-o-Meter, and the four rabbit holes |
| `quiz.html` | ★ **"Which Donut Are You?"** — the marquee personality quiz |
| `codex.html` | The Donut Codex — a mock field guide to donut "species" |
| `scripture.html` | The Manifesto + Ten Commandments, per Brother Glazed |
| `hall-of-glaze.html` | Legendary donuts + your live drool rank |
| `404.html` | "D'oh! This donut has been eaten." |

## Running gags

- **Drool-o-Meter** — a collective drool counter in the header that climbs as you
  click and persists in `localStorage`.
- **Sprinkle confetti** — every CTA click bursts colorful sprinkles.
- **The Quiz viral loop** — results deep-link via `quiz.html?iam=<archetype>`, so a
  shared link opens straight to that result. "Copy My Result" / "Copy Share Link"
  put a punchy blurb or URL on the clipboard.
- **Donut Fact of the Moment** — rotates through absurd facts on each load.

## Run it locally

It's plain HTML/CSS/JS — no build step.

```bash
# from this folder:
python3 -m http.server 8000
# then open http://localhost:8000/
```

A local server is recommended so `localStorage`, relative paths, and the quiz's
`?iam=` deep links behave exactly like production. (Double-clicking `index.html`
also works for a quick peek.)

## Deploy

Drag the whole folder onto Netlify, or push to a GitHub repo and enable GitHub
Pages. No configuration required. The `404.html` is picked up automatically by
both hosts.

## Tech

- Hand-rolled vanilla JS (`js/main.js`, `js/quiz.js`) — no frameworks, no bundler.
- One stylesheet (`css/style.css`) with a CSS-custom-property design system.
- Inline SVG donut art — no binary image assets.
- Fonts: Lilita One + Nunito via Google Fonts (the only external dependency).
- Respects `prefers-reduced-motion`; mobile-first responsive.

## Disclaimer

A work of loving parody. Contains zero actual donuts, which is its only real flaw.
No deities, dieticians, or donuts were harmed in the making of this shrine.
