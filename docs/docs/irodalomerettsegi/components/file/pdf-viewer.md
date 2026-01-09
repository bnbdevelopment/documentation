---
title: pdf-viewer
---
# ToggleableIframe Komponens (PDF Megjelenítő)

A `ToggleableIframe` komponens egy PDF fájl beágyazott megjelenítésére szolgál egy `iframe` segítségével, lehetőséget biztosítva a normál és teljes képernyős mód közötti váltásra.

## Működés

-   **PDF beágyazás:** A megadott URL-ről betölti a PDF fájlt egy `iframe`-be.
-   **Teljes képernyő:** Egy gombnyomásra vált a normál nézet és a teljes képernyős nézet között. A teljes képernyős mód esetén a néző elrejti az oldal többi tartalmát, és a böngészőablak teljes területét elfoglalja.
-   **Betöltési állapot:** Ha nincs megadva URL, egy `Spin` komponens jelenik meg, jelezve a betöltést.
-   **Stílus:** A `.pdf-viewer` CSS osztály és az inline stílusok határozzák meg a konténer méretét és pozícióját.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `url` | `string` | Igen | A megjelenítendő PDF fájl URL-je. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy PDF fájlt beágyazni és megjeleníteni az oldalon a `ToggleableIframe` komponens segítségével.

```tsx
import ToggleableIframe from '@/components/pdf-viewer/pdf-viewer.component';

export default function DocumentViewPage() {
    const pdfUrl = "https://www.orimi.com/pdf-test.pdf"; // Egy példa PDF URL

    return (
        <div>
            <h1>Dokumentum megtekintése</h1>
            <p>Ez egy beágyazott PDF dokumentum:</p>
            <ToggleableIframe url={pdfUrl} />
            <p>A dokumentum alatti tartalom.</p>
        </div>
    );
}
```
