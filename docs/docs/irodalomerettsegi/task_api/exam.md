---
sidebar_position: 3
sidebar_label: 'Vizsgafeladat'
---

# Vizsgafeladat kérése
## Endpoint

`POST /api/v1/exam`

## Description
A felhasználó összerakhat az általa megadott paraméterek alapján egy több feladatból álló, valós érettségi feladatlapot szimuláló feladatlapot.

:::warning

A többi feladat kérésnél használt `t` paramétert a szerver elfogadja, de nem befolyásolja a generált feladatokat.

:::

## Request Body
A kérés `taskRequests` tömbjében vannak meghatározva a felhasználó által igénylet feladat mennyiségek. Figyelembe kell venni, hogy egy vizsgafeladaton maximum 15 feladat szerepelhet.
```json
{
  "taskRequests": [
    {
      "type": "table",
      "amount": 2,
    },
    {
      "type": "connect_1",
      "amount": 1,
    },
    {
      "type": "quiz",
      "amount": 5,
    },
    {
      "type": "gaps",
      "amount": 5,
    },
  ]
}
```

## Response
A válaszban kapott feladatok sorrendje véletlenszerű és nem egyezik meg a kérésben szereplő sorrenddel. A feladatokban található `task` pont alatt a külön feladatkérésekkel megegyező adatstruktúrában találhatóak meg a szükséges adatok. A vizsgafeladatoknál segítségeket nem küld a szerver.
### 200 OK
```json
{
  "tasks": [
    {
      "type": "table",
      "task": {
        "table": {
          "rows_len": 10,
          "cols_len": 3,
          ...
        },
        "data": [
          ...
        ],
      },
    },
    {
      "type": "connect_1",
      "task": {
        "data": {
          "returnArray": {
            ...
          },
        },
      },
    },
    {
      "type": "quiz",
      "task": {}
    },
    {
      "type": "gaps",
      "task": {}
    },
  ]
}
```

## Checking
Az ellenőrző request megegyezik a többi feladatéval, a következő képpen zajlik. A `solution` mezőben lévő megoldások sorrendjének meg kell egyeznie az eredeti, feladatkérésben szereplő sorrenddel. Az adatstruktúra szintén megegyezik a külön feladatellenőrzésekkel.
```json title="POST /api/v1/exam/validate?id=taskid"
{ 
  "solution": [
    {
       "type": "table",
       "solution": {
          "solution": [
            [...],
            [...],
          ],
       },
    },
    {
       "type": "connect_1",
       "solution": {
          "solution": [
            "...",
          ],
       },
    },
    ...
  ]
}
```
A válasz pedig tartalmazza a helyes megoldásokat és elért eredményt.
```json
{
  "score": {
      "correct": 3,
      "wrong": 1,
      "score": 0.75,
      "grade": 4
  },
  "solution": [
    {
      "type": "table",
      "solution": {
        "..."
      },
    },
    {
      "type": "connect_1",
      "solution": {
        "..."
      },
    },
    ...
  ],
}
```