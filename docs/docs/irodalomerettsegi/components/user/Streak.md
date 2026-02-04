---
title: Streak
---
# Streak Komponens
A `Streak` komponens egy felhasználó aktuális napi aktivitási sorozatának (`streak`) számát jeleníti meg egy stilizált tűz ikonnal. Célja a felhasználók motiválása és a rendszeres használat ösztönzése.

## Működés

-   Megjelenít egy tűz ikont (`fas fa-fire`) és a `streak` propban megadott számot.
-   Két méretben renderelhető: alapértelmezett és kisebb (`small` prop).
-   A `.streak-container`, `.streak-icon`, `.streak-text` CSS osztályokkal stilizálható.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `streak` | `number` | Igen | A felhasználó aktuális aktivitási sorozatának hossza (napokban). |
| `small?` | `boolean` | Nem | Ha `true`, a komponens kisebb méretben jelenik meg. |

## Használati példa

Az alábbi példák bemutatják a `Streak` komponens használatát profil oldalon és fejlécben.

```tsx
import { useState } from 'react';
import Streak from '@/components/Streak/Streak.component';

export default function StreakExamples() {
    const [userStreak, setUserStreak] = useState(7);
    const [isSmallDisplay, setIsSmallDisplay] = useState(false);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1>Streak példák</h1>

            <h2>Normál méretű streak:</h2>
            <Streak streak={userStreak} />

            <h2>Kisebb méretű streak (pl. fejlécben):</h2>
            <Streak streak={userStreak} small={true} />

            <h2>Profil oldalon:</h2>
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h3>Napi aktivitás</h3>
                {userStreak > 0 ? (
                    <Streak streak={userStreak} />
                ) : (
                    <span>Még nincs streakje. Kezdje el még ma!</span>
                )}
            </div>

            <h2>Profile_Button komponensen belül:</h2>
            {/* Ahogy a Profile_Button.component.tsx-ben is használva van */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', padding: '5px' }}>
                {/* ... Profile_Icon ... */}
                <span style={{ marginLeft: '10px' }}>Felhasználó neve</span>
                <div style={{ marginLeft: '10px' }}>
                    <Streak small streak={userStreak} />
                </div>
            </div>
        </div>
    );
}
```
A `Streak` komponens hatékonyan használható a felhasználói elkötelezettség növelésére, vizuális visszajelzést adva a rendszeres aktivitásról.
