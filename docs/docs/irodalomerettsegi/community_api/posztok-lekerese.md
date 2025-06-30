---
sidebar_position: 1
sidebar_label: 'Posztok lekérése'
---

# Posztok lekérése

Visszaadja az oldalszám alapján a legkedveltebb posztokat, illetve az oldalak számát. A paraméterek opcionálisak, a `page` paraméter nélkül mindig az első oldal kerül a válaszba.

## Request
`GET /api/v1/community/posts?page=1?search=petofi`

## Response
```json
{
  "pageCount": 10,
  "posts": [
    {
      "uploadDate": "", // közzététel dátuma
      "like": 0, // pozitív vélemények száma
      "dislike": 0, // negatív vélemények száma
      "comments": 10, // kommentek száma
      "authorName": "", // szerző felhasználóneve
      "title": "", // tárgy
    }
  ]
}
``` 