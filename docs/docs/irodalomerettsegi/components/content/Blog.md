---
title: Blog
---
# BlogPost Komponens

> [!WARNING]  
> Ezt a komponenst már nem használja az oldal, így nem is frissül az oldalnak megfelelően, a blog teljesen kivezetésre került az oldalról

A `BlogPost` egy egyszerű komponens, amely egyetlen blogbejegyzést jelenít meg egy kártya (`Card`) formátumban.

## Működés

- A komponens megjeleníti a bejegyzés címét, tartalmát, valamint a létrehozás és utolsó módosítás relatív időpontját (pl. "2 days ago").
- Tartalmaz egy "Tovább a bejegyzéshez" gombot, amely a bejegyzés saját, dedikált oldalára navigál (`/blog/[id]`).
- Ha a `post` objektum hiányzik, vagy a `visible` tulajdonsága `false`, a komponens egy "Nincs ilyen poszt" üzenetet jelenít meg.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `post` | `BlogParams` | Igen | Egy objektum, amely a blogbejegyzés adatait tartalmazza. |

### `BlogParams` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A bejegyzés egyedi azonosítója. |
| `authorId` | `string` | A szerző azonosítója. |
| `content` | `string` | A bejegyzés szöveges tartalma. |
| `createdAt`| `string` | A létrehozás időpontja (ISO 8601 formátumban). |
| `title` | `string` | A bejegyzés címe. |
| `updatedAt`| `string` | Az utolsó módosítás időpontja (ISO 8601 formátumban). |
| `visible` | `boolean` | Meghatározza, hogy a bejegyzés látható-e. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy blogbejegyzés listát megjeleníteni a `BlogPost` komponens segítségével.

```tsx
import BlogPost from "@/components/Blog/Blog.component";
import { BlogParams } from "@/components/Blog/BlogParams"; // Tegyük fel, hogy a típus exportálva van

// ...

const blogPosts: BlogParams[] = [
    // ... API-ból vagy máshonnan kapott bejegyzések
];

export default function BlogListPage() {
    return (
        <div>
            <h1>Blog</h1>
            {blogPosts.map((post, index) => (
                <BlogPost key={index} post={post} />
            ))}
        </div>
    );
}
```
