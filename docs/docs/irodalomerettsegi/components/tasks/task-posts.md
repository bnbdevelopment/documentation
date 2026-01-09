---
title: Post
---
# Post Komponens (Tétel Előnézet)

A `Post` komponens egy előnézeti kártyát jelenít meg egy tételről vagy közösségi bejegyzésről. A célja, hogy rövid, informatív összefoglalót adjon, amely felkelti a felhasználó érdeklődését és a teljes tartalom megtekintésére ösztönöz.

## Működés

-   **Fejléc:** Megjeleníti a bejegyzés címét (`title`), amely egy linkként működik, és a tétel teljes oldalára (`/tetelek/megtekint/[id]`) navigál.
-   **Metaadatok:** A cím alatt megjeleníti a feltöltés dátumát (`uploadDate`) és a szerző felhasználónevét (`author.username`).
-   **Tartalom előnézet:** A bejegyzés tartalmának (`content`) első 10 sorát jeleníti meg a `MarkdownRenderer` komponens segítségével. Ez lehetővé teszi a formázott szöveg (pl. listák, kiemelések) helyes megjelenítését az előnézetben is.
-   **Lábléc:** Egy "Tovább a bejegyzéshez" linket tartalmaz, amely szintén a teljes bejegyzés oldalára mutat.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `post` | `Post` | Igen | Egy `Post` objektum, amely a bejegyzés összes adatát tartalmazza. |

### `Post` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A bejegyzés egyedi azonosítója. |
| `title` | `string` | A bejegyzés címe. |
| `content` | `string` | A bejegyzés teljes, Markdown formátumú tartalma. |
| `authorId` | `string` | A szerző egyedi azonosítója. |
| `visible` | `boolean` | Jelzi, hogy a bejegyzés látható-e a felhasználók számára. |
| `attachments` | `Attachment[]` | A bejegyzéshez csatolt fájlok listája. |
| `uploadDate` | `string` | A feltöltés dátuma (ISO string formátumban). |
| `updatedAt` | `string` | Az utolsó módosítás dátuma (ISO string formátumban). |
| `author` | `Author` | A szerző adatait tartalmazó objektum. |

### `Author` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A szerző egyedi azonosítója. |
| `username` | `string` | A szerző felhasználóneve. |

## Használati példa

Az alábbi példa egy tételeket listázó oldalon történő használatot mutatja be.

```tsx
import { useState, useEffect } from 'react';
import Post from '@/components/task-posts/post.component';
import { Post as PostType } from '@/components/task-posts/types/post'; // A típus importálása

export default function TopicsPage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Szimulált adatbetöltés
        const fetchPosts = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPosts([
                {
                    id: "1",
                    title: "Antigoné - elemzés",
                    content: "Antigoné, Oidipusz király és Iokaszté leánya, a görög mitológia egyik legismertebb hősnője.\nAz ő története a kötelesség és a lelkiismeret konfliktusát mutatja be.\nTovábbi sorok...",
                    author: { id: "user1", username: "IrodalomTudor" },
                    uploadDate: new Date().toISOString(),
                    // ...további Post tulajdonságok
                },
                // ...további bejegyzések
            ]);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <p>Tételek betöltése...</p>;
    }

    return (
        <div>
            <h1>Érettségi Tételek</h1>
            <div>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
```
Ez a komponens a tételek és közösségi bejegyzések listázásának központi eleme.
