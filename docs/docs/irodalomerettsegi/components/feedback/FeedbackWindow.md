---
title: FeedbackWindow
---
# FeedbackWindow Komponens

A `FeedbackWindow` egy kliens oldali komponens, amely egy visszajelző ablakot jelenít meg, jellemzően valamilyen feladat, például egy tanulási szakasz vagy kvíz befejezése után.

## Működés

- Egy modális ablakot jelenít meg, amelyben egy kör alakú progress bar mutatja az elért teljesítményt százalékos formában.
- A progress bar színe dinamikusan állítható.
- Két gombot tartalmaz:
    - **"Újrakezdés"**: Meghívja a `replay` propban megadott függvényt, amely általában a feladat újraindításáért felel.
    - **"Folytatás"**: Meghívja a `closeFeedbackWindow` propban megadott függvényt, bezárva az ablakot.
- A komponens a belső `Window` komponenst használja a modális ablak alapjául.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `closeFeedbackWindow` | `Function` | Igen | Függvény, amely bezárja a visszajelző ablakot. |
| `open` | `boolean` | Igen | Meghatározza, hogy az ablak látható legyen-e. |
| `percent` | `number` | Igen | A progress barban megjelenítendő százalékos érték (0-100 között). |
| `color` | `string` | Igen | A progress bar vonalának színe (CSS színkód, pl. "red", "#ff0000"). |
| `replay` | `Function` | Igen | Függvény, amely az "Újrakezdés" gomb megnyomásakor hívódik meg. |

## Használati példa

Az alábbi példa egy flashcard (szókártya) alkalmazásból származik, ahol a felhasználó a kártyák megtekintése után kap visszajelzést a teljesítményéről.

```tsx
import { useState } from 'react';
import FeedbackWindow from '@/components/FeedbackWindow/FeedbackWindow.component';

export default function FlashcardsComponent() {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [score, setScore] = useState(75); // Példa: 75% elért pontszám

    const handleCloseFeedback = () => {
        setIsFeedbackOpen(false);
    };

    const handleReplay = () => {
        // Logika az alkalmazás újraindításához
        console.log("Feladat újraindítása...");
        setIsFeedbackOpen(false);
    };

    // Dinamikus szín meghatározása a pontszám alapján
    const progressColor = score > 40 ? "var(--primary-color)" : "var(--incorrect-color)";

    return (
        <div>
            {/* ... Flashcard UI ... */}

            <button onClick={() => setIsFeedbackOpen(true)}>Visszajelzés megtekintése</button>

            <FeedbackWindow
                open={isFeedbackOpen}
                closeFeedbackWindow={handleCloseFeedback}
                percent={score}
                color={progressColor}
                replay={handleReplay}
            />
        </div>
    );
}
```
