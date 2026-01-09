---
title: NextButton
---
# NextButton Komponens

A `NextButton` egy sokoldalú komponens, amely navigációs linkként vagy műveletindító gombként funkcionálhat. Célja, hogy egyértelmű és interaktív elemet biztosítson a felhasználóknak a továbbhaladáshoz vagy egy akció végrehajtásához.

## Működés

-   **Navigáció és műveletek:** Lehetővé teszi egy URL-re való navigálást (`link` prop) vagy egy callback függvény meghívását (`onClickFunction`) kattintásra. Ha mindkettő meg van adva, az `onClickFunction` élvez elsőbbséget.
-   **Tartalom:** Szabadon meghatározható tartalom (`children`) jeleníthető meg benne, legyen az szöveg, ikon vagy más React elem.
-   **Vizuális jelzések:** Opcionálisan egy jobbra mutató nyíl ikon (`arrow` prop) is elhelyezhető a tartalom mellett.
-   **Letiltás:** A `disabled` prop segítségével letiltható a gomb, ilyenkor vizuálisan is eltérő lesz, és nem reagál a kattintásokra.
-   **Méret (tervezett):** Bár a `size` prop az interface-ben szerepel, a komponens kódja jelenleg nem használja vizuálisan a méretek megkülönböztetésére.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `onClickFunction` | `Function` | Nem | Callback függvény, amely akkor hívódik meg, ha a gomb (vagy link) aktiválva van. |
| `link` | `string` | Nem | Az URL, amelyre a gomb navigál. |
| `size` | `"small" \| "medium" \| "large"` | Nem | **Jelenleg nincs vizuális hatása.** Eredetileg a gomb méretét szabályozná. |
| `children` | `React.ReactElement \| string` | Nem | A gomb belsejében megjelenő tartalom (szöveg, ikon, stb.). |
| `arrow` | `boolean` | Nem | Ha `true`, egy jobbra mutató nyíl ikon jelenik meg a tartalom mellett. |
| `disabled` | `boolean` | Nem | Ha `true`, a gomb inaktívvá válik, és vizuálisan is jelzi ezt. |

## Használati példa

Az alábbi példa bemutatja a `NextButton` komponens kétféle felhasználási módját: navigációs linkként és egy eseményindító gombként.

```tsx
import NextButton from '@/components/NextButton/NextButton.component';
import { useState } from 'react';

export default function ExamplePage() {
    const [count, setCount] = useState(0);

    const handleButtonClick = () => {
        setCount(count + 1);
        alert(`Gombnyomás történt! Számláló: ${count + 1}`);
    };

    return (
        <div>
            <h1>NextButton példák</h1>

            <h2>Navigációs gomb</h2>
            <NextButton link="/kovetkezo-oldal" arrow={true}>
                Tovább a következő oldalra
            </NextButton>

            <h2>Műveletindító gomb</h2>
            <NextButton onClickFunction={handleButtonClick}>
                Kattints ide ({count})
            </NextButton>

            <h2>Letiltott gomb</h2>
            <NextButton disabled={true}>
                Ez a gomb le van tiltva
            </NextButton>

            <h2>Ikon és szöveg</h2>
            <NextButton onClickFunction={() => console.log("Lementve!")}>
                <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Mentés
            </NextButton>
        </div>
    );
}
```
