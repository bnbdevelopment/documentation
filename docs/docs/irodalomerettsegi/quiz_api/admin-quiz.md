---
sidebar_position: 3
sidebar_label: 'Admin kvíz kezelés'
---

# Adminisztrátorok számára

## Összes kvíz lekérése
### Request
`GET /api/v1/quiz/all`

### Response
Válaszban megkapja az összes kvíz kérdés dokumentumát tömb formájában.

## Specifikus kvíz lekérése
### Request
`GET /api/v1/quiz/all?id=678aca53fbaf3a6748425923`

### Response
Válaszban megkapja az egész kérdés dokumentumát.

## Kvíz létrehozása
Kvíz kérdések létrehozása.

### Request
`POST /api/v1/quiz`

### Body
```json
{
    "topic": "Szabó Magda",
    "question": "Melyik mű címe az ajtó? Nagyon nehéz kérdés ez",
    "body": "Ez a regény egy fiatal lány történetét meséli el egy háború sújtotta világban.",
    "options": [
        "Abigél",
        "Az ajtó",
        "Freskó",
        "Für Elise"
    ],
    "answer": [
        1
    ]
}
```

## Kvíz szerkesztése
### Request
`PUT /api/v1/quiz?id=678aca53fbaf3a6748425923`

A kérés body része megegyezik a létrehozáshoz szükséges résszel. A kérésnek az adott feladat összes mezőjét tartalmaznia kell, nem csak a frissítetteket.

## Kvíz törlése
### Request
`DELETE /api/v1/quiz?id=678aca53fbaf3a6748425923`

Amennyiben sikeres a művelet, nem érkezik válasz. 