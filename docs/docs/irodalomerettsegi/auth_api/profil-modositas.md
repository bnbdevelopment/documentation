---
sidebar_position: 8
sidebar_label: 'Profil módosítás'
---

# Felhasználói profil módosítása

Ez az endpoint lehetővé teszi a bejelentkezett felhasználók számára, hogy frissítsék profiljuk adatait (felhasználónév, email cím).

## GDPR megfelelés

Ez a funkció a GDPR 16. cikkében foglalt **helyesbítéshez való jog** (Right to Rectification) megvalósítása. A felhasználók bármikor módosíthatják személyes adataikat.

## Request

`PUT /api/v1/auth/profile`

### Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
Content-Type: application/json
```

### Body paraméterek

```json
{
    "username": string,  // Opcionális - új felhasználónév (3-64 karakter)
    "email": string      // Opcionális - új email cím (érvényes email formátum)
}
```

**Megjegyzések:**
- Mindkét mező opcionális, de legalább az egyiket meg kell adni
- A felhasználónév minimum 3, maximum 64 karakter hosszú lehet
- Az email címnek érvényes formátumúnak kell lennie
- Ha az email címet módosítod, új email megerősítő linket küldünk az új címre
- Az `emailVerified` mező automatikusan `false`-ra áll email cím változtatásakor

### Példa request

Csak felhasználónév módosítása:
```json
{
    "username": "uj_felhasznalonev"
}
```

Csak email módosítása:
```json
{
    "email": "uj.email@pelda.hu"
}
```

Mindkettő módosítása:
```json
{
    "username": "uj_felhasznalonev",
    "email": "uj.email@pelda.hu"
}
```

## Response

### Sikeres módosítás (200 OK)

```json
{
    "id": "clxyz123abc",
    "username": "uj_felhasznalonev",
    "email": "uj.email@pelda.hu",
    "emailVerified": false,  // Ha email módosult
    "isAdmin": false,
    "exams": ["irodalom"],
    "score": { "flashcard": 150 },
    "streak": { "streak": 5, "lastUpdated": "2026-01-12T10:00:00.000Z" },
    "history": [...],
    "subscriptions": {...}
}
```

**Megjegyzés:** A válasz nem tartalmazza az érzékeny mezőket (`hash`, `salt`).

### Hibás kérés (400 Bad Request)

**Email már foglalt:**
```json
{
    "statusCode": 400,
    "message": "email already in use"
}
```

**Érvénytelen token:**
```json
{
    "statusCode": 400,
    "message": "invalid jwt token"
}
```

**Érvénytelen formátum:**
```json
{
    "statusCode": 400,
    "message": [
        "username must be longer than or equal to 3 characters",
        "email must be an email"
    ]
}
```

### Nem engedélyezett (401 Unauthorized)

Ha a token lejárt vagy hiányzik az Authorization header.

## Email megerősítés

Ha módosítottad az email címedet:

1. Az új email címre azonnal kiküldünk egy megerősítő emailt
2. Az email tartalmaz egy megerősítő linket
3. Amíg nem erősíted meg az új email címet, az `emailVerified` mező `false` marad
4. A megerősítő link 24 órán keresztül érvényes
5. A bejelentkezéshez nem szükséges az email megerősítése, de egyes funkciók korlátozottak lehetnek

Email megerősítési folyamat: [Email megerősítés](/docs/irodalomerettsegi/auth_api/email-megerosites)

## Biztonsági megfontolások

- Az endpoint JWT authentikációt igényel
- Csak a saját profilod módosíthatod (a token alapján azonosítunk)
- Email cím módosításakor újra meg kell erősítened a címed
- Az email egyediségét ellenőrizzük az adatbázisban

