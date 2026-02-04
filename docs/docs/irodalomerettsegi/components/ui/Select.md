---
title: Select
---
# Select Komponens

A `Select` komponens egy testreszabható, interaktív választóelemet biztosít, amely vizuálisan emlékeztet egy kártyára vagy listaelemre. Lehetővé teszi a felhasználó számára, hogy egy opciót kiválasszon vagy deszelektáljon, és ehhez vizuális visszajelzést ad.

## Működés

-   Megjelenít egy címet (`title`) és egy opcionális leírást (`description`).
-   Kattintásra vált a kiválasztott és nem kiválasztott állapot között.
-   A kiválasztott állapotot egy körön belüli pont jelzi.
-   A `defaultChecked` prop segítségével inicializálható a kezdeti állapot.
-   Az `onChange` callback függvény meghívódik, ha a kiválasztási állapot változik, és paraméterként átadja az új állapotot (`boolean`).
-   **Megjegyzés:** A `checked` prop az interface-ben szerepel, de a komponens belső logikájában a `selected` állapotot (`useState`) használja a vezérlésre. Ez arra utalhat, hogy a komponens jelenleg inkább nem kontrolláltként viselkedik, és a `checked` prop egy korábbi vagy tervezett kontrollált viselkedés része lehet.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title?` | `string` | Nem | A választóelem fő címe. |
| `value?` | `string` | Nem | A választóelemhez társított érték. (Jelenleg nincs közvetlenül használva a renderelésben, de hasznos lehet a callback függvények számára.) |
| `defaultChecked?` | `boolean` | Nem | A választóelem kezdeti kiválasztott állapota. |
| `checked?` | `boolean` | Nem | **Jelenleg nem használt** a komponens belső logikájában a `selected` állapot vezérlésére. |
| `onChange?` | `Function` | Nem | Callback függvény, amely akkor hívódik meg, ha a választóelem állapota megváltozik. Paraméterként az új állapotot (`boolean`) adja vissza. |
| `description?` | `string` | Nem | Rövid leírás, amely a cím alatt jelenik meg. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet `Select` komponenseket használni egy szókártya oldalon a különböző típusú szókártyák kiválasztására.

```tsx
import { useState } from 'react';
import Select from '@/components/Select/Select.component';

export default function FlashcardTypeSelector() {
    // Feltételezzük, hogy ez az objektum tartalmazza a szókártya típusokat
    const allTypes = {
        memoriter: { name: "Memoriter", description: "Versek és szövegrészletek." },
        biblia: { name: "Biblia", description: "Bibliai történetek és szereplők." },
        stilusiranyzat: { name: "Stílusirányzatok", description: "Irodalmi korok és jellemzőik." },
    };

    const [typeList, setTypeList] = useState<{ [key: string]: boolean }>({
        memoriter: true,
        biblia: false,
        stilusiranyzat: true,
    });

    const handleTypeChange = (typeKey: string, checked: boolean) => {
        setTypeList(prev => ({ ...prev, [typeKey]: checked }));
        console.log(`A(z) "${allTypes[typeKey].name}" típus ${checked ? "kiválasztva" : "deszelektálva"}.`);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto', border: '1px solid #eee', padding: '15px' }}>
            <h2>Szókártya típusok kiválasztása</h2>
            {Object.keys(allTypes).map(typeKey => (
                <Select
                    key={typeKey}
                    title={allTypes[typeKey].name}
                    description={allTypes[typeKey].description}
                    onChange={(checked: boolean) => handleTypeChange(typeKey, checked)}
                    defaultChecked={typeList[typeKey]} // Inicializálás az aktuális state-ből
                />
            ))}
            <p style={{ marginTop: '20px' }}>
                Kiválasztott típusok: {Object.keys(typeList).filter(key => typeList[key]).map(key => allTypes[key].name).join(', ')}
            </p>
        </div>
    );
}
```
A `Select` komponens ideális választás lehet olyan felületeken, ahol több opció közül lehet kiválasztani (pl. szűrők, beállítások), és a felhasználó vizuálisan szeretne visszajelzést kapni a választásairól.
