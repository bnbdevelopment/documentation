---
sidebar_position: 3
sidebar_label: 'Vélemény küldése'
---

# Vélemény / visszajelzés küldése

Ezzel a kéréssel lehetséges véleményt küldeni az oldallal kapcsolatban. Az alább látható séma csak egy minta, a `body` értéken kívül bármelyik elhagyható. Fájlok feltöltésénél csak `.pdf` illetve `.docx` kiterjesztésű fájlok engedélyezettek, a maximum méret 5Mb. A `rate` érték egy 1-től 10-ig terjedő, felfele növekedő skálán elhelyezkedő számot jelent, ahol az oldalt értékelhetik.

## Request
`POST /api/v1/reviews`

A request body formátuma `multipart/form-data` kell, hogy legyen. A kérés a következő mezőket tartalmazza:

- `file`: a feltöltésre való fájl.
- `data`: a vélemény contentje, amelynek a következő sémát kell felvennie:

```json
{
  "username": "test_user",
  "email": "test@mail.com",
  "subject": "very nice subject",
  "body": "omg this site is very nice",
  "rate": 5
}
``` 