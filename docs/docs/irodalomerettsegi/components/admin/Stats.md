---
title: Stats
---
# Stats Komponens

A `Stats` komponens egy átfogó, adminisztrációs célú irányítópultot jelenít meg, amely különböző statisztikai adatokat és rendszerkonfigurációs állapotokat foglal össze.

## Működés

-   **Adatbetöltés:** A komponens mountolásakor automatikusan lekéri az összes szükséges statisztikai adatot a `https://api.irodalomerettsegi.hu/api/v2/admin/stats` végpontról.
-   **Felhasználói metrikák:** Megjeleníti a regisztrált felhasználók, adminisztrátorok, generált feladatok és vélemények számát az Ant Design `Statistic` és `Card` komponensek segítségével.
-   **Anyagok eloszlása:** Egy tortadiagramot (`PieChart` az `@mui/x-charts/PieChart`-ból) használva vizualizálja a különböző típusú tananyagok (Biblia, Fogalmak, Memoriterek, stb.) eloszlását.
-   **Rendszerkonfiguráció állapota:** Megjeleníti bizonyos rendszerfunkciók (pl. hirdetések, előzmények, limiter) aktuális engedélyezési státuszát a `StatusAdmin` komponens segítségével.
-   **Betöltési és hibakezelés:** Kezeli a betöltési állapotot (`loading`) és alapvető hibaüzenetet jelenít meg, ha az adatok lekérése sikertelen.

## Propok

A `Stats` komponens nem fogad be propokat, minden adatát és állapotát belsőleg kezeli.

## Használati példa

A `Stats` komponenst jellemzően az adminisztrációs felületen, egy dedikált oldalon helyezzük el, ahol a rendszer teljesítményével és adataival kapcsolatos átfogó képet szeretnénk nyújtani.

```tsx
import { useState } from 'react';
import Page from '@/components/Page/Page.component'; // A layout komponens
import Stats from '@/components/Stats/stats.component';

export default function AdminDashboardPage() {
    // A Page komponens propjai kezelhetik a felhasználói jogosultságokat
    return (
        <Page onlyAdmin={true}> {/* Csak adminok láthatják ezt az oldalt */}
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Admin Irányítópult</h1>
                <Stats />
            </div>
        </Page>
    );
}
```
A komponens önállóan felelős az adatainak lekéréséért és megjelenítéséért, ami egyszerűsíti a használatát a szülő komponensekben.
