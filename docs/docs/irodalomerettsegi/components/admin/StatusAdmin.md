---
title: StatusAdmin
---
# StatusAdmin Komponens

A `StatusAdmin` komponens egy egyszerű, vizuális állapotjelző, amely egy adott funkció vagy beállítás engedélyezett vagy letiltott állapotát mutatja az Ant Design `Badge` komponens segítségével. Különösen hasznos adminisztrációs felületeken, ahol gyors áttekintést kell nyújtani a rendszer egyes részeinek állapotáról.

## Működés

-   **Állapot megjelenítése:** A `enabled` prop alapján "Bekapcsolva" vagy "Kikapcsolva" szöveget jelenít meg.
-   **Vizuális visszajelzés:** A `Badge` komponens színe jelzi az állapotot:
    -   Zöld (`"success"`) esetén "Bekapcsolva".
    -   Piros (`"error"`) esetén "Kikapcsolva".

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `enabled?` | `boolean` | Nem | Ha `true`, az állapot "Bekapcsolva" (zöld). Ha `false`, az állapot "Kikapcsolva" (piros). |

## Használati példa

Az alábbi példa a `Stats` komponensből származik, ahol különböző konfigurációs beállítások állapotát jeleníti meg.

```tsx
import StatusAdmin from '@/components/StatusAdmin/Status.component';
import { Fragment } from 'react';

// Feltételezzük, hogy egy 'config' objektumból jönnek az adatok
const currentConfig = {
    config: {
        ads: { enabled: true },
        history: { enabled: false },
        limiter: { enabled: true },
    }
};

export default function ConfigStatusDisplay() {
    return (
        <Fragment>
            <h3>Konfigurációs állapotok</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <strong>Hirdetések:</strong> <StatusAdmin enabled={currentConfig.config.ads?.enabled} />
                </div>
                <div>
                    <strong>Történet mentése:</strong> <StatusAdmin enabled={currentConfig.config.history?.enabled} />
                </div>
                <div>
                    <strong>Limiter:</strong> <StatusAdmin enabled={currentConfig.config.limiter?.enabled} />
                </div>
            </div>
        </Fragment>
    );
}
```
A `StatusAdmin` komponens használatával egyszerűen és egységesen lehet megjeleníteni a bináris (ki/be) állapotokat az adminisztrációs felületeken.
