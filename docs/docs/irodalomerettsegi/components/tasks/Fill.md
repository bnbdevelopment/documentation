---
title: Fill
---
# PoemGapFiller Komponens (Szövegkiegészítő feladat)

A `PoemGapFiller` komponens egy interaktív feladatot valósít meg, amelyben a felhasználóknak egy szöveg (jellemzően vers) hiányzó részeit kell pótolniuk. A komponens a `PoemLine` alkomponenst használja az egyes sorok megjelenítésére.

## Működés

-   **Struktúra:** A `data` propból kapott `title` és `data` (sorok) alapján felépíti a feladatot. A sorok tömbjének minden elemét egy `PoemLine` komponensként jeleníti meg.
-   **Interaktivitás:** Azokban a sorokban, ahol a `PoemLine` `<GAP>` kulcsszót talál, beviteli mezőt jelenít meg a felhasználó számára.
-   **Kontrollált állapot:** A komponens kontrolláltan működik. A felhasználó által beírt megoldásokat a `userSolutions` propból kapja meg, és minden változáskor meghívja az `onSolutionChange` callback függvényt a teljes, frissített megoldás-tömbbel.
-   **Eredmény megjelenítése:** Ha a `result` prop meg van adva (általában egy API hívás után, az értékeléskor), a komponens képes megjeleníteni, hogy a felhasználó mely válaszai voltak helyesek vagy helytelenek, és a `showCorrectAnswers` prop `true`-ra állításával a helyes megoldásokat is be tudja tölteni.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `data` | `{ title: string; data: string[] }` | Igen | Egy objektum, amely a feladat címét (`title`) és a szöveg sorait (`data`) tartalmazza. A sorokban `<GAP>` jelzi a kitöltendő helyet. |
| `userSolutions` | `string[]` | Igen | A felhasználó által beírt megoldásokat tartalmazó string tömb. A tömb indexei a feladatban lévő `Input` mezők sorrendjének felelnek meg. |
| `onSolutionChange` | `(updatedSolutions: string[]) => void` | Igen | Callback függvény, amely akkor hívódik meg, ha a felhasználó módosít egy beviteli mezőt. A teljes, frissített megoldás-tömböt adja át. |
| `result?` | `any` | Nem | Egy objektum, amely a kiértékelés eredményét tartalmazza, beleértve a helyes megoldásokat (`solution` kulcs alatt). |
| `showCorrectAnswers` | `boolean` | Igen | Ha `true`, a komponens a `result` objektum alapján megjeleníti a helyes válaszokat a beviteli mezőkben. |

## Használati példa

Az alábbi példa egy vizsgaoldalon történő használatot mutat be, ahol a felhasználó kitölti a feladatot, majd egy gombnyomásra ellenőrizheti azt.

```tsx
import { useState } from 'react';
import PoemGapFiller from '@/components/Tasks/Fill/Fill.component';

export default function FillInTheBlanksExercise() {
    const taskData = {
        title: "Petőfi Sándor: Szeptember végén (részlet)",
        data: [
            "Még nyílnak a völgyben a kerti virágok,",
            "Még zöldel a nyárfa az <GAP> előtt;",
            "De látod amottan a téli világot?",
            "Már hó takará el a <GAP> tetőt."
        ]
    };

    const correctAnswers = ["ablak", "bérci"];

    // A felhasználó megoldásainak tárolása
    const [userSolutions, setUserSolutions] = useState<string[]>(['', '']);
    
    // Az értékelés utáni eredmények tárolása
    const [result, setResult] = useState<any | null>(null);
    
    // A "helyes megoldás mutatása" mód állapota
    const [showAnswers, setShowAnswers] = useState(false);

    const handleSolutionChange = (updatedSolutions: string[]) => {
        setUserSolutions(updatedSolutions);
    };

    const checkAnswers = () => {
        // Itt történne az API hívás az ellenőrzéshez
        // Most szimuláljuk az eredményt
        const evaluationResult = {
            solution: correctAnswers, // A helyes megoldások
            // ... egyéb eredmény adatok
        };
        setResult(evaluationResult);
    };

    return (
        <div style={{ padding: '20px' }}>
            <PoemGapFiller
                data={taskData}
                userSolutions={userSolutions}
                onSolutionChange={handleSolutionChange}
                result={result}
                showCorrectAnswers={showAnswers}
            />
            <div style={{ marginTop: '20px' }}>
                <button onClick={checkAnswers} disabled={!!result}>Ellenőrzés</button>
                <button onClick={() => setShowAnswers(true)} style={{ marginLeft: '10px' }} disabled={showAnswers}>Helyes megoldás mutatása</button>
            </div>
        </div>
    );
}
```
Ez a komponens egy rugalmas és újrafelhasználható módot kínál a szövegkiegészítő feladatok létrehozására.
