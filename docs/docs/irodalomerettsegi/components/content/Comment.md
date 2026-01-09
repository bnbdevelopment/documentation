---
title: Comment
---
# Comment Komponens

A `Comment` komponens egyetlen hozzászólás megjelenítésére szolgál.

## Működés

- A komponens egy `comment` objektumot vár, amely a hozzászólás adatait tartalmazza.
- Megjeleníti a hozzászóló profilképét (a `Profile_Icon` komponens segítségével) és felhasználónevét.
- A felhasználónév mellett feltünteti a hozzászólás létrehozásának dátumát (`YYYY.MM.DD` formátumban).
- A fejrész alatt megjeleníti a hozzászólás szöveges tartalmát.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `comment` | `Comment` | Igen | Egy objektum, amely a hozzászólás adatait tartalmazza. |

### `Comment` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A hozzászólás egyedi azonosítója. |
| `author` | `Author` | A hozzászóló adatait tartalmazó objektum. |
| `content` | `string` | A hozzászólás szöveges tartalma. |
| `createdAt`| `string` | A létrehozás időpontja (ISO 8601 formátumban). |

### `Author` objektum (feltételezett) struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `username`| `string` | A felhasználó neve. |
| ... | ... | ... |


## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy hozzászólás-listát megjeleníteni a `Comment` komponens segítségével.

```tsx
import Comment from '@/components/Comment/Comment.component';
import { Comment as CommentType } from '@/components/Comment/types/comment'; // Tegyük fel, hogy a típus így van exportálva

// ...

const comments: CommentType[] = [
    // ... API-ból vagy máshonnan kapott hozzászólások
];

export default function CommentsSection() {
    return (
        <div>
            <h2>Hozzászólások</h2>
            {comments.map((c) => (
                <Comment key={c.id} comment={c} />
            ))}
        </div>
    );
}
```
