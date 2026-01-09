---
title: DisplayFile
---
# DisplayFile Komponens

A `DisplayFile` egy kliens oldali komponens, amely fájlok megjelenítésére vagy letöltési linkként való felkínálására szolgál, a fájltípus alapján.

## Működés

- A komponens bemenetként egy `file` objektumot vár, amely tartalmazza a fájl nevét (`filename`) és az elérési útját (`url`).
- Ellenőrzi a fájl kiterjesztését (`.pdf`).
- Ha a fájl PDF, akkor a `ToggleableIframe` komponenst használja a PDF megjelenítésére. (Feltételezhetően ez egy beágyazott PDF nézőt biztosít.)
- Minden más fájltípus esetén egy egyszerű HTML `<a>` tag-et renderel, amely a fájl nevével ellátott letöltési linkként funkcionál. A link új lapon nyílik meg.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `file` | `Attachment` | Igen | Egy objektum, amely a fájl adatait tartalmazza. |

### `Attachment` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `filename` | `string` | A fájl neve, beleértve a kiterjesztést is (pl. "dokumentum.pdf"). |
| `url` | `string` | A fájl elérési útjának URL-je. |

## Használati példa

Az alábbi példa bemutatja, hogyan használható a `DisplayFile` komponens PDF fájl és egy általános fájl megjelenítésére.

```tsx
import DisplayFile from "@/components/DisplayFile/displayFile.component";
import { Attachment } from "@/components/DisplayFile/types/attachment"; // Tegyük fel, hogy a típus exportálva van

export default function FileDisplayPage() {
    const pdfFile: Attachment = {
        filename: "pelda_dokumentum.pdf",
        url: "https://example.com/files/pelda_dokumentum.pdf"
    };

    const docFile: Attachment = {
        filename: "jegyzetek.docx",
        url: "https://example.com/files/jegyzetek.docx"
    };

    return (
        <div>
            <h1>Fájlok megjelenítése</h1>

            <h2>PDF fájl:</h2>
            <DisplayFile file={pdfFile} />

            <h2>Egyéb fájl:</h2>
            <DisplayFile file={docFile} />
        </div>
    );
}
```
