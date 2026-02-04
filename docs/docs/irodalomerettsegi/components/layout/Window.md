---
title: Window
---
# ModalWindow (Window) Komponens

A `Window.component.tsx` fájlban `ModalWindow` néven definiált, de jellemzően `Window`-ként importált komponens egy általános célú modális ablakot hoz létre. Animációval jelenik meg (`framer-motion`), és egy fejlécet, címet, bezárás gombot, valamint egy tetszőleges tartalmat képes megjeleníteni.

## Működés

-   **Modális megjelenítés:** Ha az `open` prop értéke `true`, a komponens egy animált modális ablakként jelenik meg a képernyő közepén. Az animációkat a `framer-motion` könyvtár biztosítja (`opacity`, `scale`).
-   **Fejléc:** Tartalmaz egy fejléc sávot, ahol a `title` propban megadott cím és egy bezárás gomb (`X` ikon a `lucide-react`-ból) található.
-   **Tartalom:** A `children` propként átadott React elemeket jeleníti meg az ablak testében (`window-body`).
-   **Vezérelt komponens:** A láthatóságát a szülő komponensnek kell kezelnie az `open` prop és a `closeFunction` callback segítségével.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `children?` | `React.ReactElement \| React.ReactElement[]` | Nem | Az ablak testében megjelenítendő tartalom. |
| `title?` | `string` | Nem | Az ablak fejlécében megjelenő cím. |
| `open` | `boolean` | Igen | Meghatározza, hogy az ablak látható-e (`true`) vagy rejtett (`false`). |
| `closeFunction` | `Function` | Igen | Callback függvény, amely akkor hívódik meg, amikor a felhasználó a bezárás gombra kattint. |

## `WindowHeader` (belső komponens)

A `WindowHeader.component.tsx` a `Window` komponens fejlécéért felel. Mac-szerű fejlécet jelenít meg egy bezáró gombbal és a címmel.

### Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title?` | `string` | Nem | A fejlécben megjelenő cím. |
| `closeFunction` | `Function` | Igen | A bezárás gomb eseménykezelője. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy `Window` komponenst használni egy egyszerű beállítási ablak létrehozására.

```tsx
import { useState } from 'react';
import Window from '@/components/Window/Window.component'; // A komponens importálása

export default function SettingsPage() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleOpen = () => {
        setIsSettingsOpen(true);
    };

    const handleClose = () => {
        setIsSettingsOpen(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Beállítások</h1>
            <button onClick={handleOpen}>Beállítások ablak megnyitása</button>

            <Window
                title="Alkalmazás beállításai"
                open={isSettingsOpen}
                closeFunction={handleClose}
            >
                {/* A children prop tartalma */}
                <div style={{ padding: '15px' }}>
                    <p>Itt lehetnének a beállítási lehetőségek.</p>
                    <label>
                        <input type="checkbox" /> Értesítések engedélyezése
                    </label>
                </div>
            </Window>
        </div>
    );
}
```
A `Window` komponens egy újrahasználható alap, amelyre más, specifikusabb modális ablakok épülhetnek, mint például a `FeedbackWindow` vagy a `PoemWindow`.

## Alkalmazási példa (az alkalmazásban)

- A tanulási visszajelzés és a versnézet modáljai a `Window` komponenst használják: `web/components/FeedbackWindow/FeedbackWindow.component.tsx`, `web/components/PoemShow/PoemWindow.component.tsx`.
- A szókártya szűrő beállításai modalban jelennek meg a `web/app/szokartyak/page.tsx` oldalon.
