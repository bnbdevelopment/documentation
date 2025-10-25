---
sidebar_position: 2
sidebar_label: 'Szövegkiegészítős feladat'
---

# Szövegkiegészítős feladat kérése
## Endpoint

`GET /api/v1/task?t=memoriter&tasktype=gaps`

## Description
A felhasználó kap egy adott versszakot egy véletlenszerűen választott memoriterből. A szövegben hiányoznak szavak, ezeket a `<GAP>` karakter jelöli. A felhasználónak ezek helyére kell kiegészíteni a hiányzó szavakat.

:::warning

A szövegkiegészítős feladat csak a `memoriter` témakörben érhető el.

:::

A szövegből csak 4 karakternél hosszabb szavak kerülnek kiválasztásra.

## Response

### 200 OK
```json
{
  "title": "Kányádi Sándor - Valaki jár a fák hegyén",
  "data": [
      "<GAP> jár a fák hegyén",
      "vajon <GAP> zuhanok",
      "meggyújt-e <GAP> még az én",
      "<GAP> egy új csillagot"
  ],
  "solutionId": "etc"
}
```

## Checking
Az ellenőrző request megegyezik a többi feladatéval, a következő képpen zajlik:
```json title="POST /api/v1/solution?id=taskid"
{ 
  "solution": [
    "valaki",
    "amikor",
    "majd",
    "tüzemnél"
  ]
}
```
A válasz pedig tartalmazza a helyes sorrendet és elért eredményt.
```json
{
    "score": {
        "correct": 3,
        "wrong": 1,
        "score": 0.75,
        "grade": 4
    },
    "task": [
        "<GAP> jár a fák hegyén",
        "vajon <GAP> zuhanok",
        "meggyújt-e <GAP> még az én",
        "<GAP> egy új csillagot"
    ],
    "solution": [
        "valaki",
        "amikor",
        "akkor",
        "tüzemnél"
    ],
    "mask": []
}
```