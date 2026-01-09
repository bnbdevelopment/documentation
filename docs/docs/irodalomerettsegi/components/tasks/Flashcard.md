---
title: Flashcard
---
# Flashcard Komponens

A `Flashcard` komponens egyetlen szókártyát jelenít meg, amely interaktívan váltogat a "kifejezés" és "definíció" oldalai között.

## Működés

- Egy kártyát jelenít meg, amely alapértelmezés szerint a kifejezést vagy a definíciót mutatja.
- Kattintásra a kártya átfordul, és megmutatja a másik oldalt.
- Támogatja a betöltési állapotot, ekkor egy spinner jelenik meg a tartalom helyén.
- Integrálva van egy csúsztatási (swipe) funkcióval (`SwipeElement`), amely lehetővé teszi a felhasználó számára, hogy jobbra vagy balra csúsztassa a kártyát, és ehhez callback függvényeket biztosít.
- Az `onChangeFunction` prop segítségével értesítést kaphatunk, amikor a kártya átfordul.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `definition` | `string` | Igen | A szókártya "válasz" vagy "definíció" oldala. |
| `term` | `string` | Igen | A szókártya "kérdés" vagy "kifejezés" oldala. |
| `onChangeFunction` | `Function` | Nem | Callback függvény, amely akkor hívódik meg, amikor a kártya átfordul. |
| `defaultSet` | `boolean` | Nem | Ha `true`, a kártya kezdetben a kifejezést mutatja. |
| `loading` | `boolean` | Nem | Ha `true`, betöltési animációt (`Spin`) jelenít meg. |
| `id` | `string` | Nem | A szókártya egyedi azonosítója. |
| `last` | `boolean` | Nem | Jelzi, ha ez az utolsó kártya a sorozatban (a komponens kódjából nem egyértelmű a használata). |
| `animationClass` | `string` | Nem | CSS osztály az animációs effektekhez. |
| `swipeLeft` | `Function` | Igen | Callback függvény a balra csúsztatás eseményére. |
| `swipeRight` | `Function` | Igen | Callback függvény a jobbra csúsztatás eseményére. |
| `blockSwipe` | `boolean` | Nem | Ha `true`, letiltja a csúsztatási gesztusokat. |

### `TypeOfFlashcard` interface (a szókártya adatstruktúrája)

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `term` | `string` | A szókártya kifejezése. |
| `definition` | `string` | A szókártya definíciója. |
| `id` | `string` | A szókártya egyedi azonosítója. |
| `known` | `boolean` | Opcionális, jelzi, hogy a felhasználó ismeri-e a kártyát. |

## Használati példa

Az alábbi példa egy szókártya készletben található egyes szókártya komponensek használatát mutatja be.

```tsx
import { useState } from 'react';
import Flashcard from '@/components/Flashcard/Flashcard.component';
import { TypeOfFlashcard } from '@/components/Flashcard/Flashcard'; // A típus importálása

export default function FlashcardsDisplay() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const flashcards: TypeOfFlashcard[] = [
        { id: "1", term: "Kifejezés 1", definition: "Definíció 1" },
        { id: "2", term: "Kifejezés 2", definition: "Definíció 2" },
    ];

    const currentCard = flashcards[currentCardIndex];

    const handleSwipeLeft = () => {
        console.log("Balra csúsztatva!");
        // Navigálás az előző kártyára vagy valami más akció
    };

    const handleSwipeRight = () => {
        console.log("Jobbra csúsztatva!");
        // Navigálás a következő kártyára vagy valami más akció
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            {currentCard ? (
                <Flashcard
                    key={currentCard.id}
                    term={currentCard.term}
                    definition={currentCard.definition}
                    swipeLeft={handleSwipeLeft}
                    swipeRight={handleSwipeRight}
                    defaultSet={true} // Kezdetben a kifejezést mutatja
                />
            ) : (
                <p>Nincsenek kártyák</p>
            )}
        </div>
    );
}
```
