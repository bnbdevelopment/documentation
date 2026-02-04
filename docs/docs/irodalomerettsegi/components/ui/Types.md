---
title: UI Types
---
# UI Típusok

Ezek a típusok a UI komponensek paramétereit és segédstruktúráit írják le.

## `TypeOfCardParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `icon?` | `React.ReactElement` | Opcionális ikon. |
| `title?` | `string` | Kártya cím. |
| `description?` | `string` | Leírás. |
| `loading?` | `boolean` | Betöltési állapot. |
| `link?` | `string` | Cím link URL. |
| `onClick?` | `() => void` | Kattintás callback. |

## `TypeOfSelectParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title?` | `string` | Cím felirat. |
| `value?` | `string` | Azonosító/érték. |
| `defaultChecked?` | `boolean` | Alapértelmezett állapot. |
| `checked?` | `boolean` | Vezérelt állapot. |
| `onChange?` | `Function` | Változás callback. |
| `description?` | `string` | Leírás. |

## `TypeOfProgressParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `progress` | `number` | Haladás százalékban. |
| `loading?` | `boolean` | Betöltési állapot. |

## `TypeOfNextButtonParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `onClickFunction?` | `Function` | Kattintás callback. |
| `link?` | `string` | Navigációs link. |
| `size?` | `'small' \| 'medium' \| 'large'` | Gomb méret. |
| `children?` | `React.ReactElement \| string` | Gomb tartalma. |
| `arrow?` | `boolean` | Nyíl ikon megjelenítése. |
| `disabled?` | `boolean` | Tiltott állapot. |

## `TypeOfShowHintsParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `hints` | `string[]` | A megjeleníthető tippek. |
| `showHints` | `boolean` | Tippek láthatósága. |

## `typeOfSize`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `min` | `number` | Minimum érték. |
| `max` | `number` | Maximum érték. |

## `CategorieType`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | Kategória cím. |
| `link` | `string` | Navigációs útvonal. |
| `description?` | `string` | Opcionális leírás. |

## `typeOfCategorieParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `categories` | `CategorieType[]` | Megjelenítendő kategóriák. |

## `random(start, end)`

Egy egyszerű segédfüggvény, amely egész számot generál a `start` és `end` tartományból.

| Paraméter | Típus | Leírás |
| --- | --- | --- |
| `start` | `number` | A tartomány kezdete. |
| `end` | `number` | A tartomány vége. |

## Alkalmazási példa (az alkalmazásban)

- Alap UI elemek: `web/components/Card/Card.component.tsx`, `web/components/Select/Select.component.tsx`, `web/components/Progress/Progress.component.tsx`.
- Skeleton segédek: `web/components/Skeleton/Skeleton.component.tsx`.
- Kategória kártyák: `web/components/categories-cards/Categorie.component.tsx`.
- Tippek megjelenítése: `web/components/ShowHints/showHinds.component.tsx`.
