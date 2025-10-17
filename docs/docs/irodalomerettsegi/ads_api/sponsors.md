---
sidebar_position: 2
sidebar_label: 'Szponzorok lekérése'
---

# Szponzorok API

Dinamikusan frissülő információi a szponzorainkról, illetve ahhoz kapcsolódó információkról.
## Request
`GET /api/v1/sponsors`

## Response
```json
{
  "sponsors": [
    {
      "name": "Example Company",
      "logo": "https://example.logo.com",
      "url": "https://example.com"
    }
  ]
}
```