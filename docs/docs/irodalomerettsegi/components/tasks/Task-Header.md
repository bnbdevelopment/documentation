---
title: Task-Header
---
# Task-Header Komponens
...

A `TaskHeader` komponens egy feladat vagy feladatsorozat fejlécének megjelenítésére szolgál. Célja, hogy egységes és informatív bevezetőt biztosítson a felhasználóknak az adott feladathoz.

## Működés

-   Megjelenít egy címet (`title`) és egy többsoros leírást (`description`).
-   A leírásban minden tömbelem külön bekezdésként (`<p>`) jelenik meg.
-   Egy `children` prop segítségével lehetőség van további komponensek (pl. gombok, szűrők) elhelyezésére a fejléc jobb oldalán.
-   **Megjegyzés:** A `TaskHeaderParams` interface definiálja az `examType` és `tags` propokat is, de ezeket a komponens renderelési logikája jelenleg nem használja.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title?` | `String` | Nem | A feladat címe. |
| `description?` | `String[]` | Nem | Egy stringekből álló tömb, ahol minden elem a leírás egy-egy bekezdése. |
| `children?` | `React.JSX.Element \| React.JSX.Element[]` | Nem | Egyéb React komponensek, amelyek a fejléc jobb oldalán jelennek meg. |
| `examType?` | `boolean` | Nem | **Jelenleg nem használt.** |
| `tags?` | `Array<String>` | Nem | **Jelenleg nem használt.** |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet `TaskHeader` komponenst használni egy párosítós feladatokat bemutató oldalon.

```tsx
import TaskHeader from '@/components/Task-Header/TaskHeader.component';
import { Button } from 'antd'; // Példa children komponenshez
import { Fragment } from 'react';

export default function MatchingTaskPage() {
    const title = "Párosítási feladatok";
    const description = [
        "Válassz egy témakört a párosítós feladatok gyakorlásához az alábbiak közül:",
        "Húzd a megfelelő elemeket egymáshoz!"
    ];

    return (
        <div>
            <TaskHeader title={title} description={description}>
                <Fragment>
                    {/* A 'children' prop segítségével gombokat vagy más elemeket helyezhetünk el itt */}
                    <Button type="primary">Új feladat</Button>
                    <Button style={{ marginLeft: '10px' }}>Szabályok</Button>
                </Fragment>
            </TaskHeader>

            {/* Itt következne maga a feladat tartalma */}
            <div style={{ padding: '20px', border: '1px solid #eee', marginTop: '20px' }}>
                <p>Feladat tartalma...</p>
            </div>
        </div>
    );
}
```
A `TaskHeader` segít a feladatok egységes és rendezett bemutatásában, miközben rugalmasságot biztosít további interaktív elemek elhelyezésére a `children` prop révén.
