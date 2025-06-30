---
sidebar_position: 1
sidebar_label: 'Látogató hozzáadása'
---

# Látogató hozzáadása

Hozzáadja a látogatót az adatbázishoz az id-ja alapján. Ha nincs id-ja akkor nem lesz eltárolva, de küld neki egy server oldalon generál id-t.

## Request
`GET /stats/put-traffic?sessionId={id}`

## Response
```json
{
  "sessionId":"d655762c-6762-4d61-88a1-2bc3cd1a31f0"
}
``` 