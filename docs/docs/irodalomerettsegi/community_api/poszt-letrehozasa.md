---
sidebar_position: 3
sidebar_label: 'Poszt létrehozása'
---

# Poszt létrehozása

Poszt létrehozása, a felhasználónak be kell jelentkezve lennie.

## Request
`POST /api/v1/community/posts/`

A request body formátuma `multipart/form-data` kell, hogy legyen. A kérés a következő mezőket tartalmazza:

- `file`: a feltöltésre való fájl/fájlok.
- `data`: a vélemény contentje, amelynek a következő sémát kell felvennie:

```json
{
  "title": "", // tárgy
  "content": "", // poszt tartalma, markdown formátumban
}
``` 