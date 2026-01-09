---
title: Grade
---
# Grade Komponens

A `Grade` komponens egy vizuális visszajelzést nyújt a felhasználó teljesítményéről egy osztályzat és pontszám formájában. Az Ant Design `Progress` komponensét használja a grafikus megjelenítéshez.

## Működés

-   Egy 5 lépéses progress bar-t jelenít meg, amely vizuálisan jelzi az osztályzatot (1-től 5-ig).
-   A progress bar színe egy előre definiált színskálát követ (pirostól a sötét türkizig), ami az alacsonyabb osztályzatoktól a magasabbak felé halad.
-   A progress bar alatt megjeleníti az elért pontszámot a maximálisan elérhető pontszámból (pl. "X/Y pont").

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `grade` | `number` | Igen | A felhasználó által elért osztályzat (várhatóan 1 és 5 közötti egész szám). Ez alapján töltődik fel a progress bar. |
| `maxPoint` | `number` | Igen | A feladaton elérhető maximális pontszám. |
| `points` | `number` | Igen | A felhasználó által elért pontszám. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy `Grade` komponenst használni egy feladat eredményének megjelenítésére.

```tsx
import { useState } from 'react';
import Grade from '@/components/Grade/Grade.component';

export default function QuizResultPage() {
    // Feltételezzük, hogy ezek az értékek egy kvíz vagy feladat befejezése után kerülnek kiszámításra
    const [userScore, setUserScore] = useState({
        grade: 4,       // Példa: 4-es osztályzat
        correct: 18,    // Példa: 18 jó válasz
        wrong: 2        // Példa: 2 rossz válasz
    });

    const maxQuestions = userScore.correct + userScore.wrong; // Összes kérdés száma

    return (
        <div>
            <h1>Kvíz eredmények</h1>
            <p>Gratulálunk! Az eredményeid:</p>
            {userScore && (
                <Grade
                    grade={userScore.grade}
                    points={userScore.correct}
                    maxPoint={maxQuestions}
                />
            )}
            <p>Elért pontszám: {userScore.correct} / {maxQuestions}</p>
            <p>Osztályzat: {userScore.grade}</p>
        </div>
    );
}
```
