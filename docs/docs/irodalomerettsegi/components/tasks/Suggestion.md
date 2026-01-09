---
title: Suggestion
---
# Suggestion Komponens

A `Suggestion` komponens egy szekciót jelenít meg, amelyben a felhasználónak további releváns feladatokat javasol. Ez a komponens ideális arra, hogy a felhasználói élményt javítsa, és a felhasználót az oldalon tartsa, új, érdekes tartalmakat kínálva számára.

## Működés

-   **Konténer:** Egy "További feladatok" címmel ellátott szekciót hoz létre, amely a `suggestions-container` és `suggestions-wrapper` CSS osztályokkal van stilizálva.
-   **Feladatok listázása:** A `tasks` propban kapott tömböt bejárja, és minden egyes feladat objektumhoz renderel egy `TaskItem` (belsőleg `SuggestionItem.component.tsx` néven) komponenst.
-   **Feladat megjelenítése (`TaskItem`):**
    -   Minden feladatot külön kártyaként jelenít meg (`task-item` osztály).
    -   Tartalmazza a feladat címét (`title`), leírását (`description`) és egy "Megnézem →" gombot, amely a feladat `link`-jére navigál.
    -   A `TaskItem` elemeket animációs késleltetéssel (`animationDelay`) jeleníti meg, hogy a megjelenésük lépcsőzetes legyen.

## Propok (`Suggestion`)

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `tasks` | `Task[]` | Igen | A javasolt feladatokat tartalmazó objektumok tömbje. |

### Propok (`TaskItem`)

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `task` | `Task` | Igen | Az adott feladat objektuma. |
| `index` | `number` | Igen | A feladat indexe a listában, az animációs késleltetéshez használatos. |

### `Task` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `number` | A feladat egyedi azonosítója. |
| `title` | `string` | A feladat címe. |
| `description` | `string` | A feladat rövid leírása. |
| `link` | `string` | URL, amely a feladat oldalára mutat. |

## Használati példa

Az alábbi példa a `Page` komponensből származik, ahol a javaslatok a jelenlegi oldal tartalmától függően dinamikusan szűrve jelennek meg.

```tsx
import { useState, useEffect } from 'react';
import Suggestion from '@/components/Suggestion/Suggestion.component';
import { Task } from '@/components/Suggestion/Task'; // Feltételezve, hogy exportálva van

export default function ContentPage() {
    // Feltételezzük, hogy ezek a rendelkezésre álló feladatok
    const allExercises: Task[] = [
        { id: 1, title: "Szókártyák", description: "Gyakorolj a szavakkal!", link: "/szokartyak" },
        { id: 2, title: "Táblázatok", description: "Tölts ki táblázatokat!", link: "/tablazat" },
        { id: 3, title: "Kvíz", description: "Teszteld a tudásod!", link: "/quiz" },
    ];
    
    // A jelenlegi oldal (pl. /szokartyak), ezt a routerből nyernénk ki
    const currentPath = "/szokartyak"; 
    
    // Szűrés, hogy ne javasoljuk ugyanazt az oldalt, ahol a felhasználó már van
    const suggestedTasks = allExercises.filter(item => !currentPath.includes(item.link));

    return (
        <div>
            <h1>Szókártyák oldal</h1>
            {/* Itt lenne a szókártyák oldal tartalma */}
            <p>...</p>

            {/* Javaslatok szekció */}
            <Suggestion tasks={suggestedTasks} />
        </div>
    );
}
```
Ez a komponens segít a felhasználóknak felfedezni az oldal más részeit is, és növeli az oldalon eltöltött időt.
