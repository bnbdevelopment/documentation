---
title: FlashcardCounter
---
# FlashcardCounter Komponens
...

A `Counter` komponens a szókártya tanulási folyamat aktuális állapotát jeleníti meg, összefoglalva az áttekintett, ismert és ismeretlen kártyák számát.

## Működés

-   Egy vizuális számlálót biztosít, amely három fő értéket jelenít meg:
    -   A nem ismert kártyák száma (bal oldalon, piros színnel).
    -   Az aktuális kártya sorszáma a teljes kártyakészleten belül (középen, pl. "X/Y").
    -   Az ismert kártyák száma (jobb oldalon, zöld színnel).
-   Támogatja a betöltési állapotot (`loading` prop), ekkor animált "skeleton" elemek helyettesítik a számokat.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `numberOfFlashcards` | `number` | Igen | A teljes szókártya készletben lévő kártyák száma. |
| `studiedFlashcards` | `number` | Igen | Az eddig áttekintett szókártyák száma. |
| `known` | `number` | Igen | Az ismertnek jelölt szókártyák száma. |
| `dontKnown` | `number` | Igen | Az ismeretlennek jelölt szókártyák száma. |
| `loading` | `boolean` | Nem | Ha `true`, betöltési állapotot mutat a komponens. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `Counter` komponenst használni egy szókártya alkalmazásban, hogy a felhasználó folyamatosan lássa a haladását.

```tsx
import { useState } from 'react';
import Counter from '@/components/FlashcardCounter/Counter.component';

export default function FlashcardSession() {
    const totalCards = 10;
    const [currentCardIndex, setCurrentCardIndex] = useState(3);
    const [knownCards, setKnownCards] = useState(2);
    const [unknownCards, setUnknownCards] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Szókártya tanulás</h1>
            <Counter
                numberOfFlashcards={totalCards}
                studiedFlashcards={currentCardIndex}
                known={knownCards}
                dontKnown={unknownCards}
                loading={isLoading}
            />
            <p>Aktuális kártya: {currentCardIndex + 1}</p>
            {/* ... további UI elemek a kártyákhoz és interakciókhoz ... */}
            <button onClick={() => {
                // Példa: egy kártya ismertnek jelölése
                if (currentCardIndex < totalCards) {
                    setKnownCards(knownCards + 1);
                    setCurrentCardIndex(currentCardIndex + 1);
                }
            }}>Tudom</button>
            <button onClick={() => {
                // Példa: egy kártya ismeretlennek jelölése
                if (currentCardIndex < totalCards) {
                    setUnknownCards(unknownCards + 1);
                    setCurrentCardIndex(currentCardIndex + 1);
                }
            }}>Nem tudom</button>
        </div>
    );
}
```
