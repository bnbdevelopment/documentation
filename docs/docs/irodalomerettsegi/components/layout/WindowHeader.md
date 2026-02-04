---
title: WindowHeader
---
# WindowHeader Komponens

A `WindowHeader` a `Window` komponens fejléce, amely egy egyszerű, Mac-szerű bezáró gombot és címet jelenít meg.

## Működés

- Megjelenít egy címsort (`title`).
- A bezáró gomb kattintásakor meghívja a `closeFunction` callbacket.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `title` | `string` | Nem | A fejlécben megjelenő cím. |
| `closeFunction` | `Function` | Igen | Bezáráskor futó callback. |

## Használati példa

```tsx
import WindowHeader from "@/components/Window/WindowHeader.component";

export default function ExampleHeader() {
    return <WindowHeader title="Beállítások" closeFunction={() => alert("Bezárás")} />;
}
```

## Alkalmazási példa (az alkalmazásban)

- A `WindowHeader` a modál ablakokban jelenik meg a `Window` komponens részeként, például a szókártya beállítások ablakában `web/app/szokartyak/page.tsx`.
