---
sidebar_position: 3
sidebar_label: 'Posztok kezelése'
---

# Posztok kezelése

Az admin felület lehetőséget biztosít a közösségi posztok moderálására. Minden új poszt alapértelmezetten ellenőrizetlen státusszal kerül feltöltésre, és csak adminisztratív jóváhagyást követően jelenik meg a nyilvános listázásokban.

## Ellenőrizetlen posztok listázása

Lapozható lista formátumban kéri le az ellenőrizetlen posztokat, időrendi sorrendben a legrégebbitől kezdve.

### Request
`GET /api/v2/admin/posts/unverified?page=1`

### Request params
- `page`: Opcionális. A kért oldal száma. Alapértelmezett érték: 1. Oldalanként 10 poszt kerül visszaadásra.

### Response
```json
{
  "posts": [
    {
      "id": "cm5abc123",
      "title": "Poszt címe",
      "content": "Poszt tartalma",
      "authorId": "user123",
      "verified": false,
      "visible": true,
      "attachments": [],
      "uploadDate": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z",
      "author": {
        "id": "user123",
        "username": "felhasznalonev"
      }
    }
  ],
  "pageCount": 3
}
```

## Poszt megtekintése ellenőrzéshez

Egy adott poszt részletes adatainak lekérése ellenőrzési céllal. Az endpoint ellenőrizetlen posztokat is visszaad, szemben a publikus API-val.

### Request
`GET /api/v2/admin/posts/:id`

### URL params
- `id`: A megtekinteni kívánt poszt azonosítója.

### Response
```json
{
  "post": {
    "id": "cm5abc123",
    "title": "Poszt címe",
    "content": "Poszt tartalma",
    "authorId": "user123",
    "verified": false,
    "visible": true,
    "attachments": [
      {
        "filename": "irodalom-posts/document.pdf",
        "url": "https://cdn.example.com/irodalom-posts/document.pdf"
      }
    ],
    "uploadDate": "2026-01-15T10:30:00.000Z",
    "updatedAt": "2026-01-15T10:30:00.000Z",
    "author": {
      "id": "user123",
      "username": "felhasznalonev"
    }
  },
  "reactions": {
    "likes": 0,
    "dislikes": 0
  },
  "comments": []
}
```

## Poszt jóváhagyása

Egy poszt ellenőrzött státuszra állítása, amely után a poszt megjelenik a publikus listázásokban.

### Request
`PUT /api/v2/admin/posts/:id/verify`

### URL params
- `id`: A jóváhagyni kívánt poszt azonosítója.

### Response
A művelet sikeres végrehajtása esetén üres válasz érkezik 200 státuszkóddal.

### Hibakezelés
- `404 Not Found`: A megadott azonosítóval nem található poszt.

## Poszt elutasítása

Egy poszt teljes törlése az adatbázisból, beleértve a hozzá tartozó fájlokat, kommenteket és reakciókat. A művelet visszafordíthatatlan.

### Request
`DELETE /api/v2/admin/posts/:id`

### URL params
- `id`: Az elutasítani és törölni kívánt poszt azonosítója.

### Törlési folyamat
A művelet során a következő elemek kerülnek törlésre:
- A poszt csatolt fájljai az S3 tárolóból
- A poszthoz tartozó összes komment
- A poszthoz tartozó összes reakció
- Maga a poszt rekord

### Response
A művelet sikeres végrehajtása esetén üres válasz érkezik 200 státuszkóddal.

### Hibakezelés
- `404 Not Found`: A megadott azonosítóval nem található poszt.

## Autentikáció

Minden endpoint adminisztrátori jogosultságot igényel. A kéréseket JWT Bearer tokennel kell hitelesíteni, és a token tulajdonosának admin státusszal kell rendelkeznie. Autentikáció nélküli vagy nem admin felhasználóktól érkező kérések esetén 401 Unauthorized státuszkód kerül visszaadásra.

## Megjegyzések

A publikus poszt API (`/api/v1/posts`) alapértelmezetten csak ellenőrzött posztokat ad vissza. Az ellenőrizetlen posztok kizárólag az admin API-n keresztül érhetőek el a moderációs munkafolyamat során.
