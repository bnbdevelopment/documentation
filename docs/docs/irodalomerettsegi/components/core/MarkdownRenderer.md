---
title: MarkdownRenderer
---
# MarkdownRenderer Komponens

A `MarkdownRenderer` komponens egy egyszerű burkoló a `react-markdown` könyvtár körül, amely lehetővé teszi Markdown formátumú szövegek HTML-lé alakítását és megjelenítését. Támogatja a GitHub Flavored Markdown (GFM) funkciókat.

## Működés

-   Bemenetként egy Markdown formátumú stringet (`content`) vár.
-   A `react-markdown` és a `remark-gfm` pluginek segítségével konvertálja a Markdown tartalmat HTML-lé.
-   A `remark-gfm` biztosítja a GFM kiterjesztések támogatását, mint például a táblázatok, feladatlisták (`task lists`) és áthúzott szövegek (`strikethrough`).

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `content` | `string` | Igen | A megjelenítendő Markdown formátumú szöveg. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy blogbejegyzés vagy tétel tartalmát Markdown formátumban tárolni és megjeleníteni a `MarkdownRenderer` segítségével.

```js
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.component';

export default function BlogPostPage({ postContent }: { postContent: string }) {
    const exampleMarkdown = `
# Ez egy cím

Ez itt egy **kiemelt** szöveg és egy *dőlt* szöveg.

## Lista
- Elem 1
- Elem 2
  - Al-elem

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

| Fejléc 1 | Fejléc 2 |
|----------|----------|
| Adat 1   | Adat 2   |
`;

    return (
        <div>
            <h1>Bejegyzés címe</h1>
            <div className="prose"> {/* Hagyományosan a "prose" osztály formázza a Markdown által generált HTML-t */}
                <MarkdownRenderer content={exampleMarkdown} />
            </div>
            <h2>Másik példa: Külső tartalom</h2>
            <div className="prose">
                <MarkdownRenderer content={postContent} />
            </div>
        </div>
    );
}

// Példa használat (pl. egy oldal komponensen belül):
// <MarkdownRenderer content={postData.post.content} />
```

