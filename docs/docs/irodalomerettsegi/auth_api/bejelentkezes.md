---
sidebar_position: 1
sidebar_label: 'Bejelentkezés'
---

# Authentication

A beléptetés első lépése, hogy a `/api/v1/auth/login` oldalra elküldessz egy requestet, aminek a bodyjában megtalálható a felhasználónév és jelszó.
Ezt követően visszakapsz egy tokent, ez az adott felhasználóhoz tartozó azonosító.
Innentől minden olyan requesthez, amelyhez szükséges beléptetve lenni, a headerben el kell küldened a tokent, az alábbi módon:
`Authorization: Bearer TOKEN`. A *TOKEN*t értelemszerűen cseréld ki a valós tokenre.

A felhasználónév minimum 3, maximum 64; a jelszó minimum 8 maximum 32 karakter hosszúságú lehet. Az email címnek valósnak kell lennie.

## Basic authentication

### Request
`POST /api/v1/auth/login`

```json
{
    "username": string,
    "password": string,
}
```

**FONTOS**, hogy a 'username' a requestben a regisztráláskor felhasznált email címmel kell, hogy megegyezzen. Az akkori felhasználónevet megjelenítésen kívül nem használjuk authentikációhoz.

### Response
If authentication was successful then token, otherwise 401 