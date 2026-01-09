---
title: PoemLine
---
# PoemLine Komponens

A `PoemLine` komponens egyetlen verssor megjelenítésére és interaktív kiegészítésére szolgál. Kifejezetten olyan feladatokhoz lett tervezve, ahol a felhasználóknak hiányzó szavakat kell beírniuk egy versbe.

## Működés

-   Egy verssort jelenít meg. Ha a sor tartalmazza a `<GAP>` kulcsszót, az `Input` mezővé alakul.
-   A felhasználók beírhatják a hiányzó szavakat az `Input` mezőbe.
-   Vizuális visszajelzést (zöld pipa vagy piros X ikon) ad a felhasználó beírásának helyességéről, ha a `showCorrect` és `correct` propok be vannak állítva.
-   Az `Input` mező letiltható a `disabled` prop segítségével.
-   A `changeFunction` callback segítségével értesítést kapunk az `Input` mező értékének változásáról.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `children` | `string` | Igen | A verssor szövege. A `<GAP>` kulcsszó jelöli a kitöltendő helyet. |
| `index` | `number` | Igen | A verssor indexe, ami a `changeFunction` paramétereként is átadásra kerül. |
| `changeFunction?` | `(index: number, value: string) => void` | Nem | Callback függvény, amely akkor hívódik meg, ha a beviteli mező értéke megváltozik. |
| `correct?` | `boolean` | Nem | Jelzi, hogy a felhasználó bevitele helyes-e. Csak akkor jelenik meg vizuális visszajelzés, ha a `showCorrect` is `true`. |
| `showCorrect?` | `boolean` | Nem | Ha `true`, megjelenik a helyességre vonatkozó vizuális visszajelzés (ikon). |
| `disabled?` | `boolean` | Nem | Ha `true`, az `Input` mezők letiltásra kerülnek. |
| `solution?` | `string` | Nem | Az `Input` mező aktuális értéke (a felhasználó megoldása). |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet `PoemLine` komponenseket használni egy vers kitöltő feladatban.

```tsx
import { useState } from 'react';
import PoemLine from '@/components/PoemLine/PoemLine';

export default function FillInThePoemTask() {
    const poemData = [
        "János vitéz, szegény legény,",
        "Tarisznyájában az ő <> kenyér.",
        "Nyáját őrizte a pusztán,",
        "A falu messze <>."
    ];

    const correctSolutions = ["száraz", "van"];

    const [userSolutions, setUserSolutions] = useState<string[]>(["", ""]);
    const [showResults, setShowResults] = useState(false);

    const handleChange = (index: number, value: string) => {
        const newSolutions = [...userSolutions];
        newSolutions[index] = value;
        setUserSolutions(newSolutions);
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    return (
        <div>
            <h1>Vers kiegészítő feladat</h1>
            <div className="poem-display">
                {poemData.map((line, lineIndex) => (
                    <PoemLine
                        key={lineIndex}
                        index={lineIndex}
                        changeFunction={handleChange}
                        disabled={showResults}
                        showCorrect={showResults}
                        correct={showResults ? (userSolutions[lineIndex-1] === correctSolutions[lineIndex-1]) : undefined} // Az index -1, mert a `<GAP>` a második sorban van.
                        solution={line.includes("<GAP>") ? userSolutions[lineIndex-1] : undefined}
                    >
                        {line}
                    </PoemLine>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={showResults}>Eredmény ellenőrzése</button>
            {showResults && (
                <p>Eredményed: {userSolutions.filter((sol, idx) => sol === correctSolutions[idx]).length} / {correctSolutions.length} helyes.</p>
            )}
        </div>
    );
}
```
A fenti példában a `correct` prop dinamikus beállításánál figyelembe kell venni, hogy melyik `PoemLine` tartalmaz `Input` mezőt (vagyis `<GAP>`-et).
A példa egyszerűsítésként feltételezi, hogy minden `PoemLine` egy `Input` mezővel rendelkezik, de a valóságban csak a `<GAP>`-et tartalmazók.
Ezért a `correct` beállításánál az `userSolutions[lineIndex-1]`-et használja, mivel a példában a második sor (index 1) tartalmazza az első gap-et (index 0 a megoldások tömbjében).
Helyesebb implementáció esetén a `changeFunction` kaphatná meg a gappel ellátott mező sorszámát is, nem csak a verssor indexét.
