---
title: Popup
---
# Popup Komponens

A `Popup` komponens egy alapvető, modális felugró ablakot jelenít meg, amely egy címet és egy üzenetet tartalmaz. A komponens önmaga kezeli a megjelenítését egy belső állapot és egy aktiváló gomb segítségével.

## Működés

-   **Modális megjelenés:** Egy félátlátszó háttér előtt középen jelenik meg a felugró ablak.
-   **Tartalom:** Egy címet (`title`) és egy üzenetet (`message`) jelenít meg.
-   **Bezárás:** A felugró ablak fejlécében található "X" ikonra kattintva bezárható.
-   **Aktiválás:** A komponens tartalmaz egy belső "Show popup" gombot, amelyre kattintva a felugró ablak megjelenik. Ez a gomb a komponens funkcionalitásának bemutatására szolgál.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title` | `string` | Igen | A felugró ablak fejlécében megjelenő cím. |
| `message` | `string` | Igen | A felugró ablak testében megjelenő szöveges üzenet. |

## Használati példa

Mivel a `Popup` komponens önmagában tartalmazza a megjelenítését vezérlő logikát és gombot, közvetlenül beilleszthető bármelyik komponensbe, ahol egy egyszerű felugró ablakra van szükség, felhasználói interakció hatására.

```tsx
import Popup from '@/components/Popup/popup.component';

export default function MyPageWithPopup() {
    return (
        <div>
            <h1>Üdvözlet az oldalon!</h1>
            <p>Itt van néhány tartalom.</p>
            
            {/* A Popup komponens beillesztése. Ez önmaga kezeli a megjelenítését. */}
            <Popup title="Értesítés!" message="Ez egy fontos értesítés a felhasználó számára." />

            <p>További tartalom az oldalon.</p>
        </div>
    );
}
```
Mivel a komponens beépítve tartalmazza a felugró ablakot megjelenítő gombot, valószínűleg tesztelési vagy gyors demonstrációs célokat szolgál, és ritkábban használatos olyan éles környezetben, ahol a szülő komponensnek kellene vezérelnie a felugró ablak láthatóságát (ezt inkább a `Window` komponens teszi meg).
