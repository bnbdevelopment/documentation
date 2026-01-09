---
title: AdminMenu
---
# AdminMenu komponent

Az `AdminMenu` egy kliens oldali komponens, amely egy adminisztrációs felülethez biztosít egy oldalsó, összecsukható menüt és egy fő tartalmi területet.

## Propok

| Név | Típus | Leírás |
| --- | --- | --- |
| `children` | `React.ReactElement`  `React.ReactElement[]` | A fő tartalmi területen megjelenítendő React elemek. |
| `loading` | `boolean` (opcionális) | Ha `true`, a menü helyén egy "skeleton" (váz) betöltő animáció jelenik meg. |

## Használati példa

Az alábbi példa bemutatja, hogyan használható az `AdminMenu` komponens egy adminisztrációs oldal felépítéséhez.

```tsx
import AdminMenu from "@/components/Admin-menu/admin-menu.component";

export default function Page() {
    return (
        <AdminMenu>
            <div>
                <h1>Adminisztrációs felület</h1>
                <p>Ez a fő tartalmi terület.</p>
            </div>
        </AdminMenu>
    )
}
```
