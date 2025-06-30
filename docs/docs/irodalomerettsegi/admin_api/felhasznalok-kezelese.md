---
sidebar_position: 2
sidebar_label: 'Felhasználók kezelése'
---

# Felhasználók kezelése

Base request url: `/api/v2/admin/user?id=66ed87fc63a2cc057337d968`

## Request params
- `id`: a kezelni kívánt felhasználó idje

Az alábbi kérések csak típusokban és bodyban különböznek. Az összesnek szükséges az `id` paraméterben megadott felhasználó id, illetve az admin token elküldése a requestben, ahogy az Auth APIban le van írva.

## Felhasználók listázása
### Request
`GET /api/v2/admin/user`

## Felhasználó adatai lekérése
### Request
`GET /api/v2/admin/user?id=66ed87fc63a2cc057337d968`

## Felhasználó módosítása
### Request
`PUT /api/v2/admin/user?id=66ed87fc63a2cc057337d968`

A bodyban a módosítani kívánt paramétereket illetve új értéküket kell eltárolni. Minden paraméter módosítható, a következőkön kívül: `email`, `salt`, `hash`, `isAdmin`. Jelszó változtatás esetén a bodyban kell küldeni egy `newPassword` mezőt, ami az új jelszót tartalmazza.

### Example body
```json
{
  "username": "testuser"
}
```

A teljes felhasznéló sémát megtalálod az Appendix / Felhasználó séma pontban.

## Felhasználó törlése
### Request
`DELETE /api/v2/admin/user?id=66ed87fc63a2cc057337d968` 