---
sidebar_position: 1
sidebar_label: 'Kifejtős feladat'
---

# Kifejtős feladatok

Kifejtős feladatok lekérését teszi lehetővé.

## Kifejtős feladat lekérése

### Request
`GET /api/v1/essay/?type=osszehasonlito&id=66ed87fc63a2cc057337d968`

### URL parameters
- `type`: a kifejtős feladat típusát adja meg, a következő értékeket veheti fel:
  - `muertelmezo`: műértelmező szövegalkotás
  - `temakifejto`: témakifejtő dolgozat/esszé írása
- `id`: segítségével le lehet kérni specifikusan egy feladatot

Egyik paraméter se kötelező. Amennyiben az `id` paraméter meg van adva, az adott feladat lesz válaszul adva, függetlenül a másik paraméter értékétől. Amennyiben mindkét paraméter üres, azaz nincs definiálva, véletlenszerűen kap vissza egy feladatot.

### Response
```json
{
  "id": "66ed87fc63a2cc057337d968",
  "tipus": "muertelmezo" | "temakifejto",
  "forras": "2024 - október",
  "pdf": "24okt_fl.pdf",
  "megoldas": "24okt_ut.pdf",
}
``` 