---
sidebar_position: 4
sidebar_label: 'Poszt interakció'
---

# Poszt kedvelése / kommentelés

Ehhez a művelethez a felhasználónak be kell jelentkezve lennie.

## Kedvelés
### Request
`POST /api/v1/community/posts/:id/like`

## Dislike
### Request
`POST /api/v1/community/posts/:id/dislike`

## Kommentelés
### Request
`POST /api/v1/community/posts/:id/comment`

Amennyiben kommentelés történik, a következő bodyt kell küldeni:

```json
{
  "message": ""
}
``` 