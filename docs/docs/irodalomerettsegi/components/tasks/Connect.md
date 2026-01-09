---
title: Connect
---
# ConnectTask Komponens (Párosító feladat)

A `ConnectTask` komponens egy interaktív "párosító" feladatot valósít meg, ahol a felhasználóknak a két oszlopban lévő elemeket kell helyesen összekötniük.

## Működés

-   **Két oszlopos elrendezés:** A `data` propban megadott `r1` (bal oldali) és `r2` (jobb oldali) tömbök elemeit jeleníti meg két oszlopban.
-   **Interaktív párosítás:** A felhasználó először kiválaszt egy elemet a bal oldali oszlopból, majd egy elemet a jobb oldali oszlopból, ezzel létrehozva egy összeköttetést.
-   **Vizuális visszajelzés:** A párosított elemeket egy színes szegély és egy sorszámozott jelvény (`badge`) köti össze vizuálisan. A színek ciklikusan ismétlődnek a rendelkezésre álló színpalettából.
-   **Állapotkezelés:** A komponens kontrollált módon működik. A `solution` prop határozza meg a jelenlegi összeköttetéseket, és az `onChange` callback függvény minden változáskor frissíti ezt az állapotot a szülő komponensben.
-   **Megoldás ellenőrzése:** Lehetőséget biztosít a felhasználó által adott megoldások helyességének vizuális megjelenítésére ("right-answer" vagy "wrong-answer" CSS osztályok), ha a `correctSolution` prop meg van adva.
-   **Megoldás megjelenítése:** A `showAnswers` prop `true`-ra állításával a komponens átvált "megoldás" módba, ahol a helyes összeköttetéseket mutatja, és letiltja a további interakciót.

## Propok (a `Connect.component.tsx`-ben definiáltak alapján)

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `data` | `{ r1: string[], r2: string[] }` | Igen | Egy objektum, amely a két oszlopban megjelenítendő string tömböket tartalmazza. |
| `solution` | `number[]` | Igen | Egy tömb, amely a felhasználó aktuális megoldását reprezentálja. A tömb indexe a bal oldali elem indexe, az értéke pedig a hozzá párosított jobb oldali elem indexe (-1, ha nincs párosítva). |
| `onChange` | `(solution: number[]) => void` | Igen | Callback függvény, amely minden alkalommal meghívódik, amikor a felhasználó módosít egy párosítást. Paraméterként megkapja az új `solution` tömböt. |
| `correctSolution?` | `any[]` | Nem | A helyes megoldást tartalmazó tömb, amely alapján a vizuális visszajelzés történik. |
| `showAnswers?` | `boolean` | Nem | Ha `true`, a komponens a helyes megoldásokat mutatja, és letiltja az interakciót. Alapértelmezetten `false`. |
| `disabled?` | `boolean` | Nem | Ha `true`, letiltja a felhasználói interakciót. Alapértelmezetten `false`. |

### Megjegyzés a `ConnectParams.tsx`-ről

A `web/components/Tasks/Connect/ConnectParams.tsx` fájlban található prop definíciók elavultak és nem egyeznek a komponens által ténylegesen használt propokkal. A fenti táblázat a komponens forráskódjában (`type Props`) található, aktuális definíciókat tükrözi.

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `ConnectTask` komponenst egy feladatoldalon használni.

```tsx
import { useState } from 'react';
import ConnectTask from '@/components/Tasks/Connect/Connect.component';

export default function MatchingExercisePage() {
    const taskData = {
        r1: ["Ady Endre", "József Attila", "Petőfi Sándor"],
        r2: ["Tiszta szívvel", "Góg és Magóg fia vagyok én", "Szeptember végén"]
    };

    const correctSolutionData = [1, 2, 0]; // Példa a helyes megoldásra

    const [userSolution, setUserSolution] = useState<number[]>([-1, -1, -1]);
    const [showCorrect, setShowCorrect] = useState(false);

    const handleSolutionChange = (newSolution: number[]) => {
        setUserSolution(newSolution);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Párosító feladat: Szerzők és műveik</h1>
            <p>Kösd össze a szerzőket a megfelelő művel!</p>

            <ConnectTask
                data={taskData}
                solution={userSolution}
                onChange={handleSolutionChange}
                correctSolution={correctSolutionData}
                showAnswers={showCorrect}
                disabled={showCorrect}
            />

            <button onClick={() => setShowCorrect(true)} style={{ marginTop: '20px' }}>
                Megoldás mutatása
            </button>
        </div>
    );
}
```
