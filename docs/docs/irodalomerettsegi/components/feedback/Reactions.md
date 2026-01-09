---
title: Reactions
---
# Reactions Komponens

A `Reactions` komponens egy egyszerű felhasználói interakciós felületet biztosít, amely "lájk" és "diszlájk" gombokkal, valamint az azokhoz tartozó számlálókkal jeleníti meg a reakciókat egy adott tartalomra (pl. blogbejegyzés, tétel).

## Működés

-   Két gombot jelenít meg: egy "lájk" gombot (`LikeOutlined` ikonnal) és egy "diszlájk" gombot (`DislikeOutlined` ikonnal).
-   A gombok mellett megjeleníti a hozzájuk tartozó aktuális számláló értékét (`reactions.likes`, `reactions.dislikes`).
-   A gombokra kattintva meghívódnak a `like` és `dislike` propokon keresztül átadott callback függvények, amelyek felelősek a reakciók állapotának frissítéséért (pl. API hívás).

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `reactions` | `Reaction` | Igen | Egy objektum, amely a "lájk" és "diszlájk" reakciók aktuális számlálóit tartalmazza. |
| `like` | `Function` | Igen | Callback függvény, amely akkor hívódik meg, amikor a felhasználó a "lájk" gombra kattint. |
| `dislike` | `Function` | Igen | Callback függvény, amely akkor hívódik meg, amikor a felhasználó a "diszlájk" gombra kattint. |

### `Reaction` objektum struktúrája

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `likes` | `number` | A "lájkok" száma. |
| `dislikes` | `number` | A "diszlájkok" száma. |

## Használati példa

Az alábbi példa egy blogbejegyzés reakcióinak kezelését mutatja be.

```tsx
import { useState } from 'react';
import Reactions from '@/components/Reactions/Reactions.component';
import { Reaction as ReactionType } from '@/components/Reactions/types/reaction'; // Feltételezve, hogy exportálva van

export default function BlogPostReactions({ postId }: { postId: string }) {
    const [currentReactions, setCurrentReactions] = useState<ReactionType>({
        likes: 12,
        dislikes: 3,
    });
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        setLoading(true);
        // Szimulált API hívás a lájk növelésére
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentReactions(prev => ({ ...prev, likes: prev.likes + 1 }));
        setLoading(false);
    };

    const handleDislike = async () => {
        setLoading(true);
        // Szimulált API hívás a diszlájk növelésére
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentReactions(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
        setLoading(false);
    };

    return (
        <div>
            <h3>Tetszett?</h3>
            {loading ? (
                <p>Reakciók betöltése...</p>
            ) : (
                <Reactions
                    reactions={currentReactions}
                    like={handleLike}
                    dislike={handleDislike}
                />
            )}
        </div>
    );
}
```
A `loading` állapotot és hibakezelést a fenti példa kedvéért elhanyagoltam, de éles környezetben ajánlott ezeket is implementálni.
A `web/app/tetelek/megtekint/[id]/reactionButton.component.tsx` fájl egy példa arra, hogyan lehet ezt a komponenst egy külső, állapotkezelő komponensbe beágyazni.
```tsx
import { useState } from 'react';
import Reactions from '../Reactions/Reactions.component'; // Az import elérési útja eltérő lehet
import { Reaction as ReactionType } from '../Reactions/types/reaction'; // Az import elérési útja eltérő lehet
import Loader from '../Loader/Loader.component'; // A Loader komponens
import Error from '../Error/Error.component'; // Az Error komponens
import postData from '@/network/post'; // Egy példa POST metódus

export default function ReactionsButton({ reactions }: { reactions: ReactionType }) {
    const [currentReactions, setCurrentReactions] = useState<ReactionType>(reactions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); // Az ErrorType importálható lenne

    const handleLike = async () => {
        setLoading(true);
        try {
            // postData('/api/reactions/like', { postId: 'currentPostId' }); // Példa API hívás
            setCurrentReactions(prev => ({ ...prev, likes: prev.likes + 1 }));
            setError(null);
        } catch (e) {
            setError({ title: "Hiba", message: "A reakcióhoz be kell jelentkezned" });
        } finally {
            setLoading(false);
        }
    };

    const handleDislike = async () => {
        setLoading(true);
        try {
            // postData('/api/reactions/dislike', { postId: 'currentPostId' }); // Példa API hívás
            setCurrentReactions(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
            setError(null);
        } catch (e) {
            setError({ title: "Hiba", message: "A reakcióhoz be kell jelentkezned" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? <Loader title="Reakciók betöltése" /> : (
                <Reactions like={handleLike} dislike={handleDislike} reactions={currentReactions} />
            )}
            {error && <Error closeFunction={() => setError(null)} open={!!error} message={error?.message} title={error?.title} />}
        </div>
    );
}
```
