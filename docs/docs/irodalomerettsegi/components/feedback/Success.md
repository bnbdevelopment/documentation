---
title: Success
---
# Success Komponens

A `Success` komponens egy egyszerű, zöld sikerüzenetet jelenít meg az Ant Design `Alert` komponense segítségével.

## Működés

- Ha az `open` prop igaz, megjelenik egy `Alert` elem `success` típusban.
- A bezárás ikon megnyomásakor meghívja a `closeFunction` callbacket.
- A komponens jelenleg csak a `message` értéket jeleníti meg, a `title` prop nincs kirenderelve (a komponens és a `SuccessType` viszont tartalmazza).

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `message` | `string` | Nem | A sikerüzenet szövege. |
| `title` | `string` | Nem | Opcionális cím (jelenleg nem jelenik meg). |
| `open` | `boolean` | Nem | Meghatározza, hogy az üzenet látható legyen-e. |
| `closeFunction` | `Function` | Nem | Callback, amely bezáráskor hívódik meg. |

### `SuccessType` objektum

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | A sikerüzenet címe. |
| `message` | `string` | A sikerüzenet szövege. |

## Használati példa

```tsx
import { useState } from "react";
import Success from "@/components/Success/Success.component";
import SuccessType from "@/components/Success/SuccessType";

export default function ProfileUpdate() {
    const [success, setSuccess] = useState<SuccessType | null>(null);

    const handleSave = async () => {
        // ... mentés logika
        setSuccess({ title: "Mentve", message: "A profil frissítése sikerült." });
    };

    return (
        <div>
            <button onClick={handleSave}>Mentés</button>
            <Success
                open={!!success}
                title={success?.title}
                message={success?.message}
                closeFunction={() => setSuccess(null)}
            />
        </div>
    );
}
```

## Alkalmazási példa (az alkalmazásban)

- A sikeres mentés és műveleti visszajelzések több helyen is megjelennek, például `web/app/tetelek/uj/page.tsx`, `web/app/admin/blog/letrehozas/page.tsx`, `web/app/jelszo-valtoztatas/page.tsx`.
