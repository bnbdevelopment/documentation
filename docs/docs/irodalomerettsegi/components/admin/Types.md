---
title: Admin Types
---
# Admin Típusok

Az alábbi típusok az admin felület komponenseinek propjait és adatstruktúráit írják le.

## `TypeOfAdminMenuParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `children` | `React.ReactElement \| React.ReactElement[]` | Az admin menü által burkolt tartalom. |
| `loading?` | `boolean` | Betöltési állapot jelzése. |

## `StatusParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `enabled?` | `boolean` | Az admin státusz jelzése (aktív/inaktív). |

## `typeOfStatsParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `users?` | `boolean` | A felhasználói statisztikák megjelenítése. |
| `admins?` | `boolean` | Az admin statisztikák megjelenítése. |
| `tasks?` | `boolean` | A feladat statisztikák megjelenítése. |
| `reviews?` | `boolean` | A visszajelzések statisztikáinak megjelenítése. |
| `materials?` | `boolean` | A tananyag statisztikák megjelenítése. |

## `typeOfMessageParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A vélemény egyedi azonosítója. |
| `subject` | `string` | A vélemény tárgya. |
| `body` | `string` | A vélemény szövege. |
| `email` | `string` | A beküldő email címe. |
| `username` | `string` | A beküldő felhasználóneve. |
| `created` | `string` | A beküldés időpontja (ISO). |
| `fileName` | `string` | Opcionálisan csatolt fájl neve. |
| `isNew` | `boolean` | Jelzi, hogy a vélemény új-e. |
| `rate` | `number` | Értékelés (1-10). |
| `deleteReview` | `Function` | Törlési callback. |

## Alkalmazási példa (az alkalmazásban)

- Admin menü és állapotok: `web/components/Admin-menu/admin-menu.component.tsx`, `web/components/StatusAdmin/Status.component.tsx`.
- Statisztikák és vélemények: `web/components/Stats/stats.component.tsx`, `web/components/Message/Message.component.tsx`.
