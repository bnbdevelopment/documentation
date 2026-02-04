---
title: Content Types
---
# Tartalom Típusok

Az alábbi típusok a tartalomhoz kapcsolódó komponensek adatstruktúráit írják le.

## `BlogParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A bejegyzés egyedi azonosítója. |
| `authorId` | `string` | A szerző azonosítója. |
| `title` | `string` | A bejegyzés címe. |
| `content` | `string` | A bejegyzés tartalma. |
| `createdAt` | `string` | Létrehozás időpontja (ISO). |
| `updatedAt` | `string` | Frissítés időpontja (ISO). |
| `visible` | `boolean` | Láthatóság jelző. |

## `Comment`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A hozzászólás egyedi azonosítója. |
| `author` | `Author` | A hozzászóló adatai. |
| `content` | `string` | A hozzászólás szövege. |
| `createdAt` | `string` | Létrehozás időpontja (ISO). |

## `Author`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A szerző azonosítója. |
| `username` | `string` | A szerző felhasználóneve. |

## `CommentParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `comment` | `Comment` | A megjelenítendő hozzászólás adatai. |

## Alkalmazási példa (az alkalmazásban)

- Blog és hozzászólások megjelenítése: `web/components/Blog/Blog.component.tsx`, `web/components/Comment/Comment.component.tsx`.
