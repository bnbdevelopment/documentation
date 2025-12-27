---
sidebar_position: 6
sidebar_label: 'Email megerősítés'
---

# Email megerősítés

A regisztráció után a felhasználók egy megerősítő emailt kapnak egy verification linkkel. A link 24 óráig érvényes.

## Verification endpoint

### Request
`GET /api/v1/auth/verify-email/:salt?token={hash}`

### Path paraméterek
- `salt`: Egyedi azonosító a verification linkből

### Query paraméterek
- `token`: Verification hash/token

### Response
- **Sikeres**: `true` (Boolean) - Email sikeresen megerősítve, az `emailVerified` mező `true`-ra állítva
- **Hiba**: 400 Bad Request
  - `"Invalid or expired verification token"` - Token lejárt (>24 óra) vagy nem létezik
  - `"Invalid verification token"` - Hash nem egyezik

### Példa
```
GET /api/v1/auth/verify-email/a1b2c3d4e5f6...?token=9f8e7d6c5b4a3...
```

## Folyamat

1. Felhasználó regisztrál a `/api/v1/auth/register` endpointon
2. A rendszer küld egy emailt a megadott címre verification linkkel
3. A felhasználó rákattint a linkre (formátum: `https://irodalomerettsegi.hu/email-megerosites/{salt}?token={hash}`)
4. A backend validálja a tokent és frissíti az `emailVerified` státuszt
5. A token elhasználódik (csak egyszer használható)

## Megjegyzések

- A verification linkek 24 óra után lejárnak
- A tokenek Redis-ben vannak tárolva (db: 5)
- Minden token csak egyszer használható fel
- A felhasználók email megerősítés nélkül is be tudnak jelentkezni, de bizonyos funkciók megkövetelhetik a megerősítést
