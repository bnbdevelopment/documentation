---
title: Share Types
---
# Megosztás Típusok

Ezek a típusok a megosztási kártya adatstruktúráit írják le.

## `FlashcardData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `correct` | `string[]` | Helyes kártyák azonosítói. |
| `incorrect` | `string[]` | Hibás kártyák azonosítói. |
| `allCards` | `number` | Összes kártya száma. |

## `TaskData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `grade` | `number` | Érdemjegy. |
| `score` | `number` | Elért pontszám. |
| `taskName` | `string` | Feladat neve. |
| `title?` | `string` | Opcionális témakör azonosító. |

## `StreakData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `streak` | `number` | Streak hossza napokban. |
| `lastUpdated` | `string` | Utolsó frissítés időpontja. |

## Alkalmazási példa (az alkalmazásban)

- Megosztási kártyák: `web/components/Share/Share-Result.component.tsx`.
