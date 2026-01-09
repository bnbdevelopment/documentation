---
title: File
---
# File Komponens

A `File` komponens egy kis méretű vizuális jelzést biztosít egy fájlról, megjelenítve annak ikonját és egy rövidített nevét.

## Működés

- A komponens bemenetként egy `fileName` stringet vár, amely a fájl teljes nevét tartalmazza (pl. "dokumentum.pdf").
- A fájlnév kiterjesztése alapján (`.pdf` vagy egyéb) egy megfelelő ikon jelenik meg (PDF esetén `fa-file-pdf`, egyébként `fa-file-word`).
- A fájlnév a `shortText` segédfüggvény segítségével legfeljebb 10 karakterre rövidül, és ha hosszabb, "..." kerül hozzáadásra a végére.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `fileName` | `string` | Igen | A fájl teljes neve, kiterjesztéssel együtt. |

## Használati példa

Az alábbi példa egy üzenetben található fájl hivatkozását mutatja be.

```tsx
import File from "@/components/File/file.component";

export default function MessageWithFile({ fileName }: { fileName?: string }) {
    return (
        <div style={{ padding: '10px', border: '1px solid #eee' }}>
            <p>Itt van egy üzenet.</p>
            {fileName ? <File fileName={fileName} /> : null}
            <p>Üzenet vége.</p>
        </div>
    );
}

// Példák a használatra:
// <MessageWithFile fileName="jelentes.pdf" />
// <MessageWithFile fileName="specifikacio.docx" />
```
