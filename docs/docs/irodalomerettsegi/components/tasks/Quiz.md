---
title: Quiz
---
# Quiz Komponensek (`Questions` és `Question`)

A `Quiz` funkcionalitást két fő komponens valósítja meg: a `Questions`, amely a kvíz egészét magába foglaló konténer, és a `Question`, amely egyetlen kérdést jelenít meg. Együtt egy teljes kvíz feladatot alkotnak.

## `Questions` Komponens (Konténer)

A `Questions` komponens felelős a kvízben szereplő összes kérdés megjelenítéséért.

### Működés

-   Végigiterál egy `questions` tömbön, és minden egyes kérdés objektumhoz renderel egy `Question` komponenst.
-   Továbbadja a szükséges propokat minden egyes `Question` komponensnek, beleértve a felhasználó válaszait, a helyes megoldásokat és a kiválasztást kezelő függvényt.

### Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `questions` | `TypeOfQuestions[]` | Igen | A kvízben megjelenítendő kérdések tömbje. |
| `selectFunction` | `Function` | Igen | Callback függvény, amely egy válaszlehetőség kiválasztásakor hívódik meg. A szülő komponensben kezeli a válaszok állapotát. |
| `selected` | `Array<Array<number>>` | Igen | Egy 2D-s tömb, amely a felhasználó által kiválasztott válaszokat tárolja. A külső tömb indexe a kérdés indexe, a belső tömb pedig a kiválasztott válaszok indexeit tartalmazza. |
| `solution?` | `Array<SolutionType>` | Nem | A helyes megoldásokat és a kiértékelés eredményét tartalmazó tömb. Ha meg van adva, a kvíz "eredmény" módban jelenik meg. |

---

## `Question` Komponens (Egyetlen kérdés)

A `Question` komponens egyetlen kvíz kérdést jelenít meg, beleértve a témát, a kérdést, a szövegtörzset és a válaszlehetőségeket.

### Működés

-   **Tartalom:** Megjeleníti a kérdéshez tartozó témát, kérdést és szövegtörzset.
-   **Válaszlehetőségek:** Rendereli a válaszlehetőségeket, amelyekre a felhasználó kattinthat.
-   **Interakció:** Egy válaszlehetőségre kattintva meghívja a szülőtől kapott `selectOption(questionIndex, optionIndex)` függvényt a válasz rögzítéséhez.
-   **Visszajelzés:** A `solution` prop megléte esetén (azaz a kvíz kiértékelése után) vizuális visszajelzést ad:
    -   `correct-answered` (zöld): A felhasználó ezt választotta, és a válasz helyes.
    -   `wrong-answer` (piros): A felhasználó ezt választotta, de a válasz helytelen.
    -   `correct-answer` (kék szegély): Ezt a választ nem jelölte be a felhasználó, de ez lett volna a helyes.
-   Ha nincs `solution`, akkor a `selected-answer` osztállyal egyszerűen csak a felhasználó által kiválasztott válaszokat emeli ki.

### Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `question` | `TypeOfQuestions` | Igen | Az adott kérdés adatait tartalmazó objektum. |
| `selectOption` | `Function` | Igen | A szülő komponensből kapott callback, amely a válasz kiválasztását kezeli. |
| `index` | `number` | Igen | A kérdés indexe a kvízen belül. |
| `selected` | `Array<Array<number>>` | Igen | A felhasználó által kiválasztott válaszokat tartalmazó tömb. |
| `solution?` | `SolutionType` | Nem | Az adott kérdésre vonatkozó helyes megoldás és kiértékelés. |

### Típusok (`TypeOfQuestions` és `SolutionType`)

-   **`TypeOfQuestions`**: `{ topic: string, question: string, body: string, options: string[] }`
-   **`SolutionType`**: `{ question: string, answer: Array<Array<number>>, correct: boolean, solution: Array<Array<number>> }`

## Használati példa

Az alábbi példa egy egyszerű kvíz oldal megvalósítását mutatja be.

```tsx
import { useState, useEffect } from 'react';
import Questions from '@/components/Tasks/Quiz/Questions.component';
import { TypeOfQuestions } from '@/components/Tasks/Quiz/Questions';
import { SolutionType } from '@/components/Tasks/Quiz/SolutionType';

export default function QuizPage() {
    const [questions, setQuestions] = useState<TypeOfQuestions[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<number[][]>([[]]); // Minden kérdéshez egy tömb a válaszoknak
    const [solution, setSolution] = useState<SolutionType[] | undefined>(undefined);

    // Adatbetöltés szimulálása
    useEffect(() => {
        const sampleQuestions: TypeOfQuestions[] = [
            {
                topic: "Irodalom",
                question: "Ki írta a 'Bánk bán'-t?",
                body: "Válaszd ki a helyes szerzőt!",
                options: ["Arany János", "Katona József", "Vörösmarty Mihály"]
            }
        ];
        setQuestions(sampleQuestions);
        setSelected(new Array(sampleQuestions.length).fill([])); // Inicializálja a `selected` tömböt
        setLoading(false);
    }, []);

    const handleSelect = (questionIndex: number, optionIndex: number) => {
        if (solution) return; // Ne lehessen változtatni kiértékelés után

        const newSelected = [...selected];
        const currentSelection = newSelected[questionIndex];
        
        // Ha az opció már ki van választva, deszelektálja, egyébként hozzáadja
        if (currentSelection.includes(optionIndex)) {
            newSelected[questionIndex] = currentSelection.filter(i => i !== optionIndex);
        } else {
            newSelected[questionIndex] = [...currentSelection, optionIndex];
        }
        
        setSelected(newSelected);
    };

    const handleSubmit = () => {
        // Itt történne az API hívás a megoldások ellenőrzéséhez
        // Most szimuláljuk a választ
        const evaluation: SolutionType[] = [
            {
                question: "Ki írta a 'Bánk bán'-t?",
                answer: selected, // a felhasználó válasza
                correct: selected[0].includes(1), // Helyes-e a válasz
                solution: [[1]] // A helyes megoldás
            }
        ];
        setSolution(evaluation);
    };

    if (loading) return <p>Kvíz betöltése...</p>;

    return (
        <div>
            <h1>Kvíz</h1>
            <Questions
                questions={questions}
                selectFunction={handleSelect}
                selected={selected}
                solution={solution}
            />
            {!solution && <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Kvíz elküldése</button>}
        </div>
    );
}
```
