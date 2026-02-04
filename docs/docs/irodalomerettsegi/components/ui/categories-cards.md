---
title: categories-cards
---
# Categories Komponens

**Megjegyzés:** A komponens neve el van írva, a helyes angol szó a `Category` lenne.

A `Categorie` komponens egy kártyákból álló rácsot jelenít meg, amely kategóriák vagy főmenüpontok bemutatására szolgál.

## Működés

- A komponens egy `categories` tömböt vár, amely objektumokat tartalmaz.
- Minden objektumból egy külön kártyát generál, amelyen megjelenik a kategória címe, leírása és egy "Tovább" gomb.
- A "Tovább" gomb a megadott `link` URL-re navigál.
- A kártyákat egy `grid` CSS osztályba rendezi, ami a rácsos elrendezésért felel.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `categories` | `Array<CategorieType>` | Igen | A megjelenítendő kategóriák listája. |

### `CategorieType` objektum struktúrája

| Kulcs | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title` | `string` | Igen | A kategória címe, ami a kártyán megjelenik. |
| `link` | `string` | Igen | Az URL, amire a "Tovább" gomb mutat. |
| `description` | `string` | Nem | A kategória rövid leírása. |

## Használati példa

Az alábbi példa a weboldal főoldalán található kategória kártyák megjelenítését mutatja be.

```tsx
import Categorie from "@/components/categories-cards/Categorie.component";

const categories = [
    {
        title: "Szókártyák",
        link: "/szokartyak",
        description: "Szókártyáink segítségével gyakorolhatod többek között a memoritereket..."
    },
    {
        title: "Táblázatok",
        link: "/tablazat",
        description: "Felkészülhetsz a feladatlap egyik típusfeladatára, a táblázatokra."
    },
    {
        title: "Az összes anyag",
        link: "/anyagok",
        description: "Itt megtalálod egyben az összes anyagot ha úgy tanulnád."
    },
    {
        title: "Kvíz",
        link: "/quiz",
        description: "Gyakorolhatod az aláhúzós feladatokat a kvízekkel"
    }
];

export default function HomePage() {
    return (
        <div>
            {/* ... egyéb tartalom ... */}
            <Categorie categories={categories} />
            {/* ... egyéb tartalom ... */}
        </div>
    );
}
```
