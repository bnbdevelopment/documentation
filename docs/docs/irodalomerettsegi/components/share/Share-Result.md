---
title: ShareResult
---
# ShareResult Komponens

A `ShareResult` komponens egy megosztható eredménykártyát generál és egy Ant Design modálban előnézetet ad, majd a Web Share API-val (vagy letöltéssel) megosztja a képet.

## Működés

- A gomb megnyomására megnyit egy modált, ahol a megosztható kártya előnézete látszik.
- A kártyát a `html-to-image` csomaggal képpé konvertálja (`toBlob`).
- Ha a böngésző támogatja a megosztást, a `navigator.share` segítségével küld fájlt; különben letölti a képet.
- A kártya vizuális elemeit a `shareData.type` és a pontszám/eredmény alapján állítja össze.
- A feladat típus esetén témakör nevekhez lekéri a központi témakör listát.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `shareData` | `ShareableData` | Igen | A megosztandó eredmény típusa és adatai. |
| `buttonSize` | `'large' \| 'middle' \| 'small'` | Nem | A megosztás gomb mérete. |
| `customButtonClass` | `string` | Nem | Opcionális CSS osztály a gombra. |

### `ShareableData` típus

```ts
type ShareableData =
  | { type: "flashcard"; data: FlashcardData }
  | { type: "task"; data: TaskData }
  | { type: "streak"; data: StreakData };
```

### `FlashcardData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `correct` | `string[]` | Helyesen megoldott kártyák azonosítói. |
| `incorrect` | `string[]` | Hibásan megoldott kártyák azonosítói. |
| `allCards` | `number` | Az összes kártya száma. |

### `TaskData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `grade` | `number` | Az elért osztályzat. |
| `score` | `number` | Az elért pontszám. |
| `taskName` | `string` | A feladatsor neve. |
| `title?` | `string` | Opcionális témakör azonosító. |

### `StreakData`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `streak` | `number` | Az aktuális sorozat hossza napokban. |
| `lastUpdated` | `string` | Utolsó frissítés dátuma. |

## Használati példa

```tsx
import { ShareResult } from "@/components/Share/Share-Result.component";

export default function QuizResult({ score }: { score: number }) {
  return (
    <ShareResult
      shareData={{
        type: "task",
        data: {
          grade: 5,
          score,
          taskName: "Kvíz",
          title: "irodalom"
        }
      }}
    />
  );
}
```

## Alkalmazási példa (az alkalmazásban)

- A megosztás gomb a feladattípus oldalakon jelenik meg, például `web/app/quiz/page.tsx`, `web/app/tablazat/[id]/page.tsx`, `web/app/vizsga/megold/page.tsx`.
- A profil statisztikák és szókártya eredmények is használják: `web/components/Profile/ProfileStats.tsx`, `web/components/Flashcard/Flashcards.component.tsx`.
