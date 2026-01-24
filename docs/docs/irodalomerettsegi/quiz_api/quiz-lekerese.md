---
sidebar_position: 1
sidebar_label: 'Kvíz lekérése'
---

# Kvíz lekérése

## Felhasználók számára

### Request
`GET /api/v1/quiz`

### Query paraméterek
- `topic` (opcionális): A kívánt témakör

### Response
A válasz tartalmazza a kérdéseket a `questions` tömmben, illetve az ellenőrzéshez szükséges kulcsot a `solutionId` mezőben.

```json
{
  "questions": [],
  "solutionId": "solutionId"
}
```

## Kvíz feladattípus struktúra
A kvíz feladattípus a következő elemkből áll össze. Minden kérdéshez tartozik egy `topic` mező, amely a kérdés témakörét adja meg. Ez a létrehozáskor lehet egyedi, vagy választható a korábbi kérdések témakörei közül. A `question` mezőbe a kérdés található, amelyhez opcionálisan megadható `body`. Az `options` tömbben a lehetséges válaszok találhatók. Van, hogy több válasz is helyes. Az `answer` tömbben a helyes válaszok **indexei** találhatók.

```json
{
  "topic": string,
  "question": string,
  "body": string?,
  "options": string[],
  "answer": number[]
}
``` 