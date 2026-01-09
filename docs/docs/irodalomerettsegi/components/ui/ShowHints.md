---
title: ShowHints
---
# ShowHints Komponens

A `ShowHints` komponens feladata, hogy egy adott tartalomhoz tartozó tippeket (`hints`) jelenítsen meg az Ant Design `Tag` komponensek formájában.

## Működés

-   A komponens egy tömbben kapja meg a tippeket (`hints`).
-   A tippek csak akkor jelennek meg, ha a `showHints` prop értéke `true`.
-   Minden tipp külön `Tag` komponensként jelenik meg, testreszabott stílussal (szegély, háttérszín, betűszín).

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `hints` | `string[]` | Igen | Stringek tömbje, ahol minden string egy tippet reprezentál. |
| `showHints` | `boolean` | Igen | Ha `true`, a tippek megjelennek. Ha `false`, a komponens nem renderel semmit. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `ShowHints` komponenst használni egy feladatban, ahol a felhasználó kérhet segítséget, és ekkor megjelennek a tippek.

```tsx
import { useState } from 'react';
import ShowHints from '@/components/ShowHints/showHinds.component'; // Helyes fájlnévvel

export default function TaskWithHints() {
    const [showTips, setShowTips] = useState(false);
    const availableHints = [
        "Gondolj a reneszánsz korra!",
        "Ez egy Shakespeare-idézet.",
        "A szerző angol volt."
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Kvíz Kérdés</h1>
            <p>Ki mondta: "Lenni vagy nem lenni, az itt a kérdés"?</p>
            
            <button onClick={() => setShowTips(true)} disabled={showTips}>
                Tippek mutatása
            </button>

            {/* A tippek megjelenítése */}
            <ShowHints hints={availableHints} showHints={showTips} />

            {/* ... további feladat UI ... */}
        </div>
    );
}
```
A komponens fájlnevében (**showHinds.component.tsx**) elgépelés található, helyesen `showHints` lenne. Ezt a dokumentációban és a kódban is érdemes figyelembe venni.
