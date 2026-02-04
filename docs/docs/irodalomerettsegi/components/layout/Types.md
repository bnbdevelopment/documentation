---
title: Layout Types
---
# Layout Típusok

Az alábbi típusok a layout és modális komponensek propjait írják le.

## `TypeOfPageParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `children?` | `React.ReactElement \| React.ReactElement[]` | Az oldal tartalma. |
| `withoutHeader?` | `boolean` | Fejléc elrejtése (jelenleg nem használt). |
| `withoutFooter?` | `boolean` | Lábléc elrejtése (jelenleg nem használt). |
| `showInformation?` | `boolean` | Információs sáv megjelenítése. |
| `materialInfo?` | `boolean` | Anyag információk megjelenítése. |
| `setAds?` | `Function` | Hirdetés állapot beállítása. |
| `onlyLogedIn?` | `boolean` | Csak bejelentkezett felhasználóknak. |
| `setUserData?` | `Function` | Felhasználói adatok beállítása. |
| `setLoading?` | `Function` | Betöltési állapot kezelése. |
| `onlyAdmin?` | `boolean` | Csak admin hozzáférés. |
| `showSuggestedExcersie?` | `boolean` | Javasolt feladatok megjelenítése. |

## `TypeOfWindowParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `children?` | `React.ReactElement \| React.ReactElement[]` | A modál tartalma. |
| `title?` | `string` | A modál címe. |
| `open` | `boolean` | A modál nyitott állapota. |
| `closeFunction` | `Function` | Bezárás callback. |

## `TypeOfWindowHeaderParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title?` | `string` | A fejléc címe. |
| `closeFunction` | `Function` | Bezárás callback. |

## `TypeOfPoemWindow`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `readMore?` | `poemType \| null` | A megjelenítendő vers adatai. |
| `readMoreWindow` | `boolean` | A vers ablak nyitott állapota. |
| `setReadMoreWindow` | `Function` | Nyitás/zárás kezelése. |
| `highlight?` | `string[]` | Kiemelendő sorok. |

## Alkalmazási példa (az alkalmazásban)

- Oldal layout és modálok: `web/components/Page/Page.component.tsx`, `web/components/Window/Window.component.tsx`.
- Versnézet modál: `web/components/PoemShow/PoemWindow.component.tsx`.
