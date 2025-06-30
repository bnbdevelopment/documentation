---
sidebar_position: 2
sidebar_label: 'Látogatók száma'
---

# Látogatok száma

Megadja, hogy hány különböző látogatót tárolt el az adatbázisban. Ha nincs süti engedélyezve akkor nem tárolhatja el. A Headerben benne kell lennie a tokennek.

## Request
`GET /stats/traffic?start={start}&end={end}`

## Response
```json
{
  "traffic" : 3
}
``` 