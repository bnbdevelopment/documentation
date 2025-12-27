---
sidebar_position: 7
sidebar_label: 'Token frissítés'
---

# Token frissítés (Refresh Token)

Az access tokenek 1 óra után lejárnak. A refresh token segítségével új access tokent lehet kérni újbóli bejelentkezés nélkül.

## Refresh Token Endpoint

### Request
`POST /api/v1/auth/refresh`

### Request body
```json
{
    "refreshToken": string
}
```

### Response
```json
{
    "accessToken": string,
    "refreshToken": string
}
```

Sikeres token frissítés esetén új access token és új refresh token kerül kiállításra. A régi refresh token automatikusan visszavonásra kerül (token rotation).

### Hibák
- **400 Bad Request**: Hiányzó vagy érvénytelen refresh token
- **401 Unauthorized**: Lejárt vagy visszavont refresh token

## Token élettartam

- **Access Token (JWT)**: 1 óra
- **Refresh Token**: 30 nap (2 592 000 másodperc)

## Token Rotation

Biztonsági okokból a rendszer **token rotation**-t alkalmaz. Ez azt jelenti, hogy minden alkalommal, amikor új access tokent kérsz:

1. A régi refresh token visszavonásra kerül
2. Egy új refresh token kerül kiállításra
3. A régi refresh token már nem használható

## Folyamat

### 1. Bejelentkezés / Regisztráció
```json
POST /api/v1/auth/login
Response:
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "a1b2c3d4e5f6..."
}
```

### 2. API hívások access tokennel
```
GET /api/v1/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Access token lejárata után
```json
POST /api/v1/auth/refresh
{
    "refreshToken": "a1b2c3d4e5f6..."
}

Response:
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // új token
    "refreshToken": "9f8e7d6c5b4a..."                           // új token
}
```

### 4. Továbbra is használd az új tokeneket
- Mentsd el az új access tokent
- Mentsd el az új refresh tokent
- Használd az új access tokent a következő API hívásokhoz

## Kijelentkezés

Kijelentkezéskor (`POST /api/v1/auth/logout`) az összes refresh token visszavonásra kerül a felhasználóhoz tartozóan. Ez azt jelenti, hogy az összes eszközről kijelentkezik a felhasználó.

## Tárolás

- **Refresh tokenek**: Redis-ben tárolva (db: 5)
- **Kulcs formátum**: `refreshToken:{token}`
- **Felhasználói tokenek**: `userRefreshTokens:{userId}` - felhasználó összes tokenének listája
- **TTL**: 30 nap

## Biztonsági megfontolások

1. **Refresh tokent soha ne küldd GET paraméterben** - Csak POST body-ban
2. **Tárold biztonságosan** - Frontend oldalon httpOnly cookie vagy biztonságos storage
3. **Token rotation** - Minden refresh automatikusan új tokeneket generál
4. **IP cím tárolás** - Minden token tárol IP címet a kiadáskor (audit célokra)
5. **Automatikus törlés** - Kijelentkezéskor az összes token törlődik

## Példa használat

```javascript
// 1. Bejelentkezés
const loginResponse = await fetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
});
const { accessToken, refreshToken } = await loginResponse.json();

// Tokenek tárolása
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// 2. API hívás access tokennel
const apiResponse = await fetch('/api/v1/user/profile', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
});

// Ha 401 Unauthorized választ kapsz (lejárt token)
if (apiResponse.status === 401) {
    // 3. Token frissítés
    const refreshResponse = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({
            refreshToken: localStorage.getItem('refreshToken')
        })
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken }
        = await refreshResponse.json();

    // Új tokenek tárolása
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    // 4. API hívás újrapróbálása új tokennel
    const retryResponse = await fetch('/api/v1/user/profile', {
        headers: {
            'Authorization': `Bearer ${newAccessToken}`
        }
    });
}
```
