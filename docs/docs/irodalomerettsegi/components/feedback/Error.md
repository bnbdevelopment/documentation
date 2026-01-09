---
title: Error
---
# Error Komponens

Az `Error` komponens egy testreszabható hibaüzenet megjelenítésére szolgál, az Ant Design `Alert` komponensét felhasználva.

## Működés

- A komponens egy felugró hibaüzenetet jelenít meg az oldal tetején, amennyiben az `open` prop értéke `true`.
- Tartalmaz egy záró ikont, amire kattintva az üzenet eltűnik, és meghívódik a `closeFunction` propban megadott callback.
- A hibaüzenet tartalmaz egy címet (`title`) és egy részletes üzenetet (`message`).
- Ha az `open` prop `false`, a komponens nem renderel semmit.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title` | `string` | Nem | A hibaüzenet címe. |
| `message` | `string` | Nem | A hiba részletes leírása. |
| `open` | `boolean` | Nem | Meghatározza, hogy a hibaüzenet látható legyen-e (`true`) vagy rejtett (`false`). |
| `closeFunction` | `Function` | Nem | Egy függvény, amely meghívódik, amikor a felhasználó bezárja a hibaüzenetet. |

### `ErrorType` objektum struktúrája (gyakran a state-ben használatos)

A komponens belsőleg vagy a state kezeléséhez használhatja az `ErrorType` interface-t, amely a `title` és `message` stringeket definiálja.

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | A hiba címe. |
| `message` | `string` | A hiba üzenete. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet az `Error` komponenst használni egy oldalon, ahol egy API hívás során keletkező hibát szeretnénk megjeleníteni.

```tsx
import { useState } from 'react';
import Error from '@/components/Error/Error.component';
import { ErrorType } from '@/components/Error/ErrorType'; // Feltételezve, hogy exportálva van

export default function SomePage() {
    const [error, setError] = useState<ErrorType | null>(null);

    const fetchData = async () => {
        try {
            // ... API hívás ...
            throw new Error('Valami hiba történt az adatok betöltésekor!');
        } catch (err: any) {
            setError({
                title: 'Adatbetöltési hiba',
                message: err.message || 'Ismeretlen hiba.'
            });
        }
    };

    return (
        <div>
            <h1>Adatok</h1>
            <button onClick={fetchData}>Adatok betöltése</button>

            {/* A hibaüzenet megjelenítése */}
            <Error
                title={error?.title}
                message={error?.message}
                open={!!error} // Akkor nyílik meg, ha van `error` objektum
                closeFunction={() => setError(null)} // Bezáráskor nullázza az `error` state-et
            />

            {/* ... az oldal többi tartalma ... */}
        </div>
    );
}
```
