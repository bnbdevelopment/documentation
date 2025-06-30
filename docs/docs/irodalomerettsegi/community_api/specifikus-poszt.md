---
sidebar_position: 2
sidebar_label: 'Specifikus poszt'
---

# Specifikus poszt lekérése

Visszaad egy specifikus posztot az `id` paraméter által.

## Request
`GET /api/v1/community/posts/:id`

## Response
```json
{
  "uploadDate": "", // közzététel dátuma
  "like": 0, // pozitív vélemények száma
  "dislike": 0, // negatív vélemények száma
  "comments": [
    {
      "authorName": "",
      "content": "",
    }
  ],
  "authorName": "", // szerző felhasználóneve
  "title": "", // tárgy
  "content": "", // poszt tartalma, markdown formátumban
  "attachments": [
    {
      "filename": "myPdf.pdf",
      "url": "s3api.bnbdevelopment.hu/.../..."
    }
  ]
}
``` 