---
title: Loader
---
# Loader Komponens

A `Loader` komponens egy egyszerű, pörgő animációt jelenít meg, amely vizuálisan jelzi a felhasználónak, hogy egy folyamat (pl. adatbetöltés) zajlik.

## Működés

-   Egy alapvető kör alakú betöltő animációt jelenít meg.
-   Az animáció alatt egy szöveges címet (`title`) is megjeleníthet, amely tájékoztatja a felhasználót arról, hogy mi történik.
-   A komponens ideális a tartalmak aszinkron betöltése során, hogy javítsa a felhasználói élményt és elkerülje a program lefagyásának érzetét.

## Propok

| Név | Típus | Kötelező | Alapértelmezett | Leírás |
| --- | --- | --- | --- | --- |
| `title` | `string` | Nem | `"Loading"` | A betöltő animáció alatt megjelenő szöveg. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `Loader` komponenst használni egy oldalon, miközben az adatok betöltése zajlik.

```tsx
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader.component';

export default function DataFetchingPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Adatbetöltés szimulálása
            setData(["item1", "item2", "item3"]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Adatok</h1>
            {loading ? (
                <Loader title="Adatok betöltése..." />
            ) : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```
