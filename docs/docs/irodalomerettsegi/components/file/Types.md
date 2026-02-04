---
title: File Types
---
# Fájlkezelés Típusok

Ezek a típusok a fájl feltöltés és megjelenítés komponenseihez kapcsolódnak.

## `FileUploadParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `setSuccess` | `Function` | Siker állapot beállítása. |
| `setError` | `Function` | Hiba állapot beállítása. |
| `setFile` | `Function` | A kiválasztott fájl beállítása. |
| `disabled` | `boolean` | Tiltott állapot. |
| `maxCount?` | `number` | Maximálisan feltölthető fájlok száma. |
| `accept?` | `string` | Elfogadott MIME típusok vagy kiterjesztések. |
| `title?` | `string` | Opcionális cím. |
| `description?` | `string` | Opcionális leírás. |

## `DisplayFileParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `file` | `Attachment` | A megjelenítendő fájl adatai. |

## `Attachment`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `filename` | `string` | A fájl neve. |
| `url` | `string` | A fájl elérési URL-je. |

## Alkalmazási példa (az alkalmazásban)

- Feltöltés és megjelenítés: `web/components/FileUpload/FileUpload.component.tsx`, `web/components/DisplayFile/displayFile.component.tsx`.
