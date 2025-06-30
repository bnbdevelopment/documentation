---
sidebar_position: 4
sidebar_label: 'Látogatott lapok'
---

# Látogatott lapok eloszlása

Visszaadja, hogy egy adott lapot hány különböző ember látogatta.

## Request
`GET /stats/sites?start={start}&end={end}`

## Response
```json
[
    {
        "id": "/admin/velemenyek",
        "count": 1
    },
    {
        "id": "/admin/config",
        "count": 1
    },
    {
        "id": "/admin/felhasznalok",
        "count": 1
    },
    {
        "id": "/admin/felhasznalok/szerkesztes",
        "count": 1
    },
    {
        "id": "/quiz",
        "count": 1
    }
]
``` 