---
title: PoemShow
---
# PoemWindow Komponens

A `PoemWindow` komponens egy modális ablakban jeleníti meg egy verset, lehetőséget adva annak részletesebb megtekintésére. Különösen hasznos lehet memoriter feladatoknál, ahol a felhasználó a kártyák tanulása közben szeretné megnézni a teljes verset.

## Működés

-   **Modális megjelenítés:** A `Window` komponenst használja alapként, biztosítva a modális ablak funkcionalitását (nyitás/zárás).
-   **Vers adatok:** Egy `poemType` típusú objektumot vár (`readMore`), amely a vers szerzőjét (`szerzo`), címét (`cim`) és a verssorokat (`vers`) tartalmazza.
-   **Sorok kiemelése:** Lehetőséget biztosít bizonyos verssorok kiemelésére (`highlight` prop) vizuális megkülönböztetés céljából (pl. a jelenleg tanult sorok).
-   **Dinamikus tartalom:** Ha `readMore` prop nem `null`, akkor jeleníti meg a vers tartalmát.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `readMore` | `poemType \| null` | Nem | A megjelenítendő vers adatobjektuma. Ha `null`, a komponens nem jelenít meg verst. |
| `readMoreWindow` | `boolean` | Igen | Meghatározza, hogy a vers ablak látható legyen-e. |
| `setReadMoreWindow` | `Function` | Igen | Callback függvény, amely az ablak bezárásáért vagy láthatóságának váltásáért felel. |
| `highlight` | `Array<string>` | Nem | Stringek tömbje, amelyek a vers azon sorait tartalmazzák, amelyeket ki kell emelni. |

### `poemType` interface (vers adatok)

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `cim` | `string` | A vers címe. |
| `eId` | `number` | Egy egyedi azonosító. |
| `szerzo` | `string` | A vers szerzője. |
| `vers` | `Array<string>` | A vers sorai, string tömbként. |
| `id` | `string` | A vers egyedi azonosítója. |

## Használati példa

Az alábbi példa a `Flashcards` komponensből származik, ahol a felhasználó a szókártyák tanulása közben kérheti a teljes vers megjelenítését.

```tsx
import { useState } from 'react';
import PoemWindow from '@/components/PoemShow/PoemWindow.component';
import { poemType } from '@/components/Flashcard/poemType'; // Feltételezve, hogy exportálva van

export default function FlashcardsExample() {
    const [isPoemWindowOpen, setIsPoemWindowOpen] = useState(false);
    const [currentPoem, setCurrentPoem] = useState<poemType | null>({
        cim: "Anyám tyúkja",
        szerzo: "Petőfi Sándor",
        vers: ["Ejnye tyúkjaim, ejnye kendtek!", "Miért nem tojtak ma is tojást?"],
        id: "am1",
        eId: 1
    });
    const [highlightedLines, setHighlightedLines] = useState<string[]>([]);

    const handleOpenPoem = () => {
        setIsPoemWindowOpen(true);
        // Például kiemelhetjük az első sort
        setHighlightedLines(["Ejnye tyúkjaim, ejnye kendtek!"]);
    };

    const handleClosePoem = () => {
        setIsPoemWindowOpen(false);
        setHighlightedLines([]); // Kiemelések törlése bezáráskor
    };

    return (
        <div>
            <h1>Memoriter Tanulás</h1>
            <button onClick={handleOpenPoem}>Teljes vers megtekintése</button>

            <PoemWindow
                readMore={currentPoem}
                readMoreWindow={isPoemWindowOpen}
                setReadMoreWindow={handleClosePoem}
                highlight={highlightedLines}
            />
        </div>
    );
}
```
