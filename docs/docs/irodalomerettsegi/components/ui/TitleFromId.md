---
title: TitleFromId
---
# TitleFromId Komponens
...



A `TitleFromId` komponens egy specifikus feladatot lát el: egy `id` alapján lekérdez egy központi témakör listát, és kiírja a megfelelő témakör nevét. Ideális olyan oldalakon, ahol a cím dinamikusan, az URL-ben kapott azonosító alapján dől el.

## Működés

-   **Adatlekérdezés:** A komponens mountolásakor lekérdezi a témaköröket (`topics`) a `https://api.irodalomerettsegi.hu/api/v1/material/topics` végpontról.
-   **Cím megjelenítése:** Miután az adatlekérés sikeres volt, a `topics` objektumból kikeresi az `id` propban megadott kulcshoz tartozó nevet (`name`), és egy `h1` elemben megjeleníti azt.
-   **Betöltési állapot:** Amíg a `topics` adatok nem állnak rendelkezésre, egy `Skeleton` komponenst jelenít meg helyőrzőként, jelezve a felhasználónak, hogy a tartalom töltődik.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `id` | `string` | Igen | Annak a témakörnek az azonosítója, amelynek a nevét meg kell jeleníteni. |
| `className?` | `string` | Nem | Opcionális CSS osztály, amelyet a `h1` elemre alkalmaz a komponens. |

## Használati példa

Az alábbi példa egy dinamikus oldal (`[id]`) címének megjelenítését mutatja be, ahol az `id`-t az URL paraméterből nyerjük ki.

```tsx
import { useState, useEffect } from 'react';
import TitleFromId from '@/components/TitleFromId/titleFromId.component';

// Egy Next.js dinamikus oldal komponensében (pl. app/anyagok/[id]/page.tsx)
export default function DynamicTopicPage({ params }: { params: { id: string } }) {
    const { id } = params; // Az id kinyerése az URL-ből

    return (
        <div style={{ padding: '20px' }}>
            {/* A komponens használata a dinamikus ID-val */}
            <TitleFromId id={id} className="page-main-title" />

            {/* Az oldal többi tartalma */}
            <div style={{ marginTop: '20px' }}>
                <p>Itt jelenik meg a(z) '{id}' azonosítójú témakör tartalma.</p>
            </div>
        </div>
    );
}
```
A `TitleFromId` komponens leegyszerűsíti a dinamikus címek kezelését, mivel a cím lekérdezésének és megjelenítésének logikáját egyetlen újrafelhasználható komponensbe zárja.
