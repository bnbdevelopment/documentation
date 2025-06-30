---
sidebar_position: 5
sidebar_label: 'Átlagos időtöltés'
---

# Az oldalon töltött átlagos idő

Visszaadja percben, hogy a felhasználók átlagosan mennyi időt töltenek az oldalon.

## Request
`GET /stats/time?start={start}&end={end}`

## Response
```json
{
  "avgTimeSpent":30.742095833333334
}
``` 