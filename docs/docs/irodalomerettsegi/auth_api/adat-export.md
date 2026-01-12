---
sidebar_position: 9
sidebar_label: 'Adatexportálás'
---

# Személyes adatok exportálása

Ez az endpoint lehetővé teszi a bejelentkezett felhasználók számára, hogy letöltsék az összes róluk tárolt személyes adatot géppel olvasható JSON formátumban.

## GDPR megfelelés

Ez a funkció a GDPR 20. cikkében foglalt **adathordozhatósághoz való jog** (Right to Data Portability) megvalósítása. A felhasználók jogosultak arra, hogy strukturált, széles körben használt, géppel olvasható formátumban megkapják a róluk tárolt személyes adatokat.

## Request

`GET /api/v1/auth/export`

### Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

### Példa request

```bash
curl -X GET https://irodalomerettsegi.hu/api/v1/auth/export \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Response

### Sikeres exportálás (200 OK)

A válasz egy JSON objektum, amely tartalmazza az összes felhasználói adatot strukturált formában:

```json
{
    "exportedAt": "2026-01-12T10:30:00.000Z",
    "profile": {
        "id": "clxyz123abc",
        "username": "pelda_felhasznalo",
        "email": "pelda@email.hu",
        "emailVerified": true,
        "exams": ["irodalom"]
    },
    "activity": {
        "score": {
            "flashcard": 150,
            "quiz": 200,
            "task": 180
        },
        "streak": {
            "streak": 7,
            "lastUpdated": "2026-01-11T15:00:00.000Z"
        },
        "history": [
            {
                "type": "task",
                "taskId": "task123",
                "date": "2026-01-10T10:00:00.000Z",
                "score": 85
            },
            {
                "type": "quiz",
                "quizId": "quiz456",
                "date": "2026-01-09T14:30:00.000Z",
                "score": 92
            }
        ]
    },
    "subscriptions": {
        "id": "sub_123abc",
        "startDate": "2026-01-01T00:00:00.000Z",
        "endDate": "2026-02-01T00:00:00.000Z"
    },
    "content": {
        "posts": [
            {
                "id": "post123",
                "title": "Elemzésem Petőfiről",
                "content": "Ez az én elemzésem...",
                "attachments": [],
                "uploadDate": "2026-01-05T12:00:00.000Z",
                "updatedAt": "2026-01-05T12:00:00.000Z"
            }
        ],
        "comments": [
            {
                "id": "comment123",
                "postId": "post456",
                "content": "Érdekes gondolat!",
                "createdAt": "2026-01-06T14:00:00.000Z",
                "updatedAt": "2026-01-06T14:00:00.000Z"
            }
        ],
        "reactions": [
            {
                "id": "reaction123",
                "postId": "post789",
                "type": "like"
            }
        ]
    }
}
```

### Válasz mezők részletesen

#### `exportedAt`
Az exportálás időpontja ISO 8601 formátumban.

#### `profile` objektum
- `id`: Egyedi felhasználói azonosító
- `username`: Felhasználónév
- `email`: Email cím
- `emailVerified`: Email megerősítés státusza
- `exams`: A felhasználó által választott érettségi típusok

#### `activity` objektum
- `score`: Pontszámok kategóriák szerint (flashcard, quiz, task)
- `streak`: Sorozat információk (hány napja folyamatos a tanulás)
- `history`: Teljes aktivitási előzmények (feladatok, kvízek, stb.)

#### `subscriptions` objektum
Előfizetési információk (ha van aktív előfizetés):
- `id`: Előfizetés azonosító
- `startDate`: Előfizetés kezdete
- `endDate`: Előfizetés lejárata

#### `content` objektum
Felhasználó által generált tartalmak:
- `posts`: Közösségi posztok
- `comments`: Hozzászólások más posztokhoz
- `reactions`: Reakciók (like, dislike)

### Hibás kérés (400 Bad Request)

```json
{
    "statusCode": 400,
    "message": "invalid jwt token"
}
```

### Nem engedélyezett (401 Unauthorized)

Ha a token lejárt vagy hiányzik az Authorization header.

## Adatbiztonság

- Az exportált adatok érzékeny információkat tartalmaznak
- Az endpoint JWT authentikációt igényel
- Csak a saját adataidat exportálhatod

:::warning Fontos!
- Ne osszd meg az exportált adatokat **senkivel, sohasem.**
- Az exportált fájl **NEM tartalmazza** a jelszó hash-t és salt-ot biztonsági okokból
:::

## Adatmegőrzés

Az exportált adatok:
- Az adatbázisban maradnak, az export nem törli azokat
- Bármikor újra exportálhatók
- A legfrissebb adatokat tartalmazzák az export időpontjában


## Rate limiting

Az adatexportálás endpoint rate limiting alá esik az API visszaélések megakadályozása érdekében:
- **Nem előfizetett felhasználók:** 5 export / óra
- **Előfizetett felhasználók:** 20 export / óra

Részletek: [Rate limiting](/docs/irodalomerettsegi/auth_api/rate-limiting)

## Gyakori kérdések

**K: Tartalmazza az export a jelszavamat?**
V: Nem. Biztonsági okokból a jelszó hash és salt nem kerül bele az exportba.

**K: Milyen gyakran exportálhatom az adataimat?**
V: Rate limiting vonatkozik rá, de normál használat mellett korlátlanul.

**K: Mi történik az adataimmal az export után?**
V: Semmi. Az export nem módosítja és nem törli az adataidat az adatbázisban.

**K: Exportálhatom CSV formátumban is?**
V: Jelenleg csak JSON formátumot támogatunk, de a JSON könnyen konvertálható CSV-vé.
