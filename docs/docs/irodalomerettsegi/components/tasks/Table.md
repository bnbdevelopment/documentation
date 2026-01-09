--- 
title: Table
---
# TableTask Komponens (Táblázatkitöltő feladat)

A `TableTask` egy összetett, interaktív komponens, amely lehetővé teszi táblázatos feladatok létrehozását, ahol a felhasználóknak hiányzó cellákat kell kitölteniük. Az Ant Design `Table` komponensére épül.

## Működés

-   **Dinamikus táblázat:** A `tableStructure` prop alapján renderel egy táblázatot, meghatározva az oszlopokat (`cols`) és a sorok tartalmát (`data`).
-   **Kitölthető cellák:** Ha egy cella értéke a `data` tömbben `null`, akkor a komponens egy beviteli mezőt (`Input`) jelenít meg a felhasználó számára.
-   **Kontrollált állapot:** A komponens kontrollált módon kezeli a felhasználói beviteleket. A `userSolutions` propból kapja az aktuális válaszokat, és az `onSolutionChange` callback függvényen keresztül jelenti a változásokat a szülő komponensnek.
-   **Ellenőrzés és visszajelzés:**
    -   Ha a `checkMask` prop meg van adva (egy 2D-s boolean tömb), a komponens vizuális visszajelzést ad minden kitöltött cella helyességéről (zöld pipa vagy piros X).
    -   Ellenőrzés után a felhasználó előző válaszát egy tooltipben is meg lehet jeleníteni a `previousAnswers` prop segítségével.
-   **Megoldás megjelenítése:** A `showCorrectSolutions` prop `true`-ra állításával a komponens a helyes megoldásokat tölti be a beviteli mezőkbe, és letiltja azokat.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `tableStructure` | `{ cols: string[], data: any[][] }` | Igen | Meghatározza a táblázat szerkezetét. `cols` az oszlopfejlécek tömbje, `data` egy 2D-s tömb a sorok adataival. Ahol a `data` `null`-t tartalmaz, ott beviteli mező jelenik meg. |
| `userSolutions` | `string[][]` | Igen | Egy 2D-s string tömb, amely a felhasználó által beírt válaszokat tárolja. |
| `onSolutionChange`| `(updatedSolutions: string[][]) => void` | Igen | Callback, amely akkor hívódik meg, ha a felhasználó módosít egy beviteli mezőt. A frissített `userSolutions` tömböt adja át. |
| `checkMask?` | `boolean[][]` | Nem | Egy 2D-s boolean tömb, amely jelzi, hogy a felhasználó válaszai helyesek-e (`true`) vagy helytelenek (`false`). |
| `correctSolutions?`| `string[][]` | Nem | Egy 2D-s string tömb, amely a helyes megoldásokat tartalmazza. A `showCorrectSolutions` módhoz szükséges. |
| `previousAnswers?`| `string[][]` | Nem | Egy 2D-s string tömb, amely a felhasználó ellenőrzés előtti válaszait tartalmazza. Tooltipben jelenik meg. |
| `disabled?` | `boolean` | Nem | Ha `true`, minden beviteli mező le van tiltva. Alapértelmezetten `false`. |
| `showCorrectSolutions?`| `boolean` | Nem | Ha `true`, a komponens a helyes megoldásokat jeleníti meg a beviteli mezőkben. Alapértelmezetten `false`. |

## Használati példa

Az alábbi példa egy irodalmi táblázat kitöltését mutatja be, ahol a felhasználónak a hiányzó műfajokat és éveket kell pótolnia.

```tsx
import { useState } from 'react';
import TableTask from '@/components/Tasks/Table/Table.component';

export default function TableExercise() {
    const tableStructure = {
        cols: ["Szerző", "Mű", "Műfaj", "Év"],
        data: [
            ["Molière", "Tartuffe", null, 1664], // Műfaj hiányzik
            ["Shakespeare", "Hamlet", "Tragédia", null], // Év hiányzik
            ["Katona József", "Bánk Bán", "Tragédia", 1815]
        ]
    };

    const correctSolutionsData = [
        ["Komédia"],
        [1603]
    ];

    // Inicializáljuk a userSolutions tömböt a táblázat méretének megfelelően
    const [userSolutions, setUserSolutions] = useState<string[][]>([[], []]);
    const [checkMask, setCheckMask] = useState<boolean[][] | undefined>(undefined);
    const [disabled, setDisabled] = useState(false);

    const handleSolutionChange = (updatedSolutions: string[][]) => {
        setUserSolutions(updatedSolutions);
    };

    const handleCheck = () => {
        // Ellenőrzési logika szimulálása
        const newCheckMask: boolean[][] = [[false], [false]];
        if (userSolutions[0]?.[0]?.toLowerCase() === "komédia") newCheckMask[0][0] = true;
        if (userSolutions[1]?.[0] === "1603") newCheckMask[1][0] = true;
        setCheckMask(newCheckMask);
        setDisabled(true); // Letiltjuk a további szerkesztést
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Táblázat kitöltő feladat</h1>
            <p>Töltsd ki a táblázat hiányzó celláit!</p>

            <TableTask
                tableStructure={tableStructure}
                userSolutions={userSolutions}
                onSolutionChange={handleSolutionChange}
                checkMask={checkMask}
                correctSolutions={correctSolutionsData}
                disabled={disabled}
            />

            <button onClick={handleCheck} style={{ marginTop: '20px' }} disabled={disabled}>
                Ellenőrzés
            </button>
        </div>
    );
}
```
Ez a komponens rendkívül hasznos komplex, strukturált adatok bekérésére és ellenőrzésére vizuális formában.
