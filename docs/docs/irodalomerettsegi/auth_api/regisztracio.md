---
sidebar_position: 3
sidebar_label: 'Regisztráció'
---

# Registration

## Request
`POST /api/v1/auth/register`

### Request body
```json
{
    "username": string, 
    "password": string, 
    "email": string
}
```

### Response
Sikeres regisztráció esetén:
```json
{
    "accessToken": string,    // JWT token, 1 óráig érvényes
    "refreshToken": string    // Refresh token, 30 napig érvényes
}
```

Sikertelen regisztráció esetén: **400 Bad Request** (pl. email cím már foglalt)

## Email megerősítés

A sikeres regisztráció után a felhasználó automatikusan kap egy megerősítő emailt a megadott email címre. Az email egy verification linket tartalmaz, amely 24 óráig érvényes.

A felhasználó a JWT token segítségével be tud jelentkezni email megerősítés nélkül is, de ajánlott az email cím megerősítése a teljes funkcionalitás eléréséhez.

További részletek: [Email megerősítés](/docs/irodalomerettsegi/auth_api/email-megerosites)