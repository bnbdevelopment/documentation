---
sidebar_position: 1
sidebar_label: 'Vélemények lekérése'
---

# Vélemények / visszajelzések lekérése

A kéréshez szükséges az adminisztrátori jogkör. Lehetőség van az összes / egy specifikus visszajelzés lekérésére. Amennyiben az `id` paraméter nincs definiálva, az összes visszajelzést visszaküldi a rendszer, dátum szerint rendezve, legfrissebbel kezdve.

## Request
`GET /api/v1/reviews?id=677d9fadacc328ba5f9912f7`

## Params
- `id`: a vélemény id (opcionális)

## Response
```json
[
      {
        "id": "677d9f9b78ccfec09a3130e0",
        "username": "username",
        "email": "test@mail.com",
        "subject": "subject",
        "body": "text",
        "rate": 5,
        "new": false,
        "created": "2025-01-12T20:00:55.714Z"
    }
]
```

A válaszban szereplő `new` mező létrehozástól kezdve egészen addig aktív, ameddig az adott dokumentum specifikusan nincs lekérve (`id` alapján). 