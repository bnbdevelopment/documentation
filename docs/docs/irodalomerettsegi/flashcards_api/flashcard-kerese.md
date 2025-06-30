---
sidebar_position: 1
sidebar_label: 'Flashcard kérése'
---

# Flashcard kérése

## Request
`GET /api/v1/flashcard?t=biblia&l=1`

## URL parameters
- `t`: témakör id
- `l`: limit (visszaadott flashcardok száma) *(alapértelmezett: 10)*

> A visszaadott flashcardok alapból össze vannak keverve, a limit alapján történő kiválasztás még a keverés előtt történik.

## Response
```json
[
    {
        "term": string,
        "definition": string | string[],
    },
]
``` 