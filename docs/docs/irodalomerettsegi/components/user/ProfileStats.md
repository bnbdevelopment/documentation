# `ProfileStats.tsx`

Ez a komponens a felhasználó statisztikáit jeleníti meg, mint például a szériáját és a szókártya eredményeit.

## Props-ok

| Prop                  | Típus    | Leírás                                                                  |
|-----------------------|----------|-------------------------------------------------------------------------|
| `user`                | `any`    | A felhasználói objektum, ami tartalmazza a statisztikákat.             |
| `numberOfAllFlashcards`| `number` | Az összes elérhető szókártya száma.                                   |

## Példa

```tsx
import ProfileStats from './ProfileStats';

const user = {
    streak: { streak: 5 },
    score: {
        correct: [1, 2, 3],
        incorrect: [4, 5]
    }
};

<ProfileStats user={user} numberOfAllFlashcards={100} />
```
