---
sidebar_position: 3
sidebar_label: 'Látogatók intervallumok'
---

# Látogatók száma intervallumokra bontva

Visszaad egy tömböt intervallumokra bontva, hogy az adott intervallumban hány különböző látogató és hány összes lekérdezés volt.

## Request
`GET /stats/traffic-chart?start={start}&end={end}`

## Response
```json
[
    {
        "interval": 6,
        "uniqueSessions": 0,
        "totalRequests": 0
    },
    {
        "interval": 7,
        "uniqueSessions": 1,
        "totalRequests": 1
    },
    {
        "interval": 8,
        "uniqueSessions": 2,
        "totalRequests": 24
    },
    {
        "interval": 9,
        "uniqueSessions": 2,
        "totalRequests": 15
    }
]
``` 