---
sidebar_position: 2
sidebar_label: 'Kvíz ellenőrzése'
---

# Kvíz ellenőrzése

## Request
`POST /api/v1/quiz/validate?id=678a3ef8a01e2feb97accc27`

Az `id` kötelező paraméter, a kvíz lekérésekor található a válaszban. A bodyban hasonlóan kell megadni a válaszokat, mint egyéb feladatok ellenőrzésekor. A `solution` tömbben található elemek számának és sorrendjének meg kell egyezni a kérdésekkel. A válaszban a `score` mezőben megtalálható az elért eredmény százalékban, a `solution` mezőben pedig minden kérdés, a helyes válasszal, az adott válasszal, illetve annak helyességével. A válasz csak akkor helyes, amennyiben a leadott megoldás teljesen megegyezik az eltárolt megoldással. Több helyes válasz esetén csak akkor jár pont, ha mindegyik helyes választ bejelölte, illetve nem jelölt helytelen választ.

## Request Body
Példa a kérés bodyra:
```json
{
    "solution": [
        [0, 1],
        [0],
        [1, 2],
        [2],
        [2],
        [2],
        [2, 3],
        [3],
        [3],
        [3]
    ]
}
```

## Response
```json
{
    "score": 0.6,
    "solution": [
        {
            "question": "Mi a címe Weöres Sándor híres gyermekversének, amely egy táncról szól?",
            "answer": [
                0,
                1
            ],
            "solution": [
                0,
                1
            ],
            "correct": true
        }
    ]
}
``` 