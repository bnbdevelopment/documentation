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
Token if registration is successful, otherwise null

## Email megerősítés

A sikeres regisztráció után a felhasználó automatikusan kap egy megerősítő emailt a megadott email címre. Az email egy verification linket tartalmaz, amely 24 óráig érvényes.

A felhasználó a JWT token segítségével be tud jelentkezni email megerősítés nélkül is, de ajánlott az email cím megerősítése a teljes funkcionalitás eléréséhez.

További részletek: [Email megerősítés](/irodalomerettsegi/auth_api/email-megerosites)