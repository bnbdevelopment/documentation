---
title: AutoText
---
# AutoText (AutoTextSize) Komponens

Az `AutoText` (a kódban `AutoTextSize`) egy minimalista komponens, amely jelenleg csak a szöveget rendereli, és előkészíti a dinamikus méretezéshez szükséges propokat.

## Működés

- A `text` értéket egy egyszerű `<span>` elemben jeleníti meg.
- A `width` és `height` propokat jelenleg nem használja, így inkább előkészítésnek tekinthető egy későbbi automatikus méretezéshez.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `text` | `string` | Igen | A megjelenítendő szöveg. |
| `width` | `number` | Igen | A célzott szélesség (jelenleg nem használt). |
| `height` | `number` | Igen | A célzott magasság (jelenleg nem használt). |

## Használati példa

```tsx
import AutoTextSize from "@/components/Flashcard/AutoText.component";

export default function FlashcardTitle({ title }: { title: string }) {
    return <AutoTextSize text={title} width={240} height={80} />;
}
```

## Alkalmazási példa (az alkalmazásban)

- Jelenleg nincs közvetlen felhasználás a kódbázisban, de a szókártya vagy memoriter felületeken használható lenne hosszabb címek automatikus kezelésekor.
