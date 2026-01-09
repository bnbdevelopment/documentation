---
title: Information
---
# Information Komponens

Az `Information` komponens egy testreszabható információs üzenetet jelenít meg címmel és opcionális akciógombbal. Célja a felhasználók tájékoztatása vagy cselekvésre ösztönzése.

## Működés

-   Megjelenít egy információs dobozt, amely egy címet (`title`), egy üzenetet (`message`) és egy "Bezár" gombot tartalmaz.
-   Opcionálisan egy elsődleges akciógombot (`actionTitle`, `action`) is tartalmazhat, amelyre kattintva egy megadott függvény fut le.
-   A komponens `react-cookie` segítségével kezeli a "block-information" nevű sütit. Ha ez a süti be van állítva (miután a felhasználó bezárta az üzenetet és elfogadta a sütiket), az üzenet nem jelenik meg újra.
-   Az üzenet láthatóságát a `show` belső állapot vezérli, amely figyelembe veszi a "block-information" süti értékét.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `message` | `string \| React.ReactElement \| React.ReactElement[]` | Igen | Az információs üzenet tartalma. Lehet egyszerű szöveg, React elem, vagy React elemek tömbje. |
| `title` | `string` | Igen | Az információs doboz címe. |
| `action?` | `Function` | Nem | Callback függvény, amely az elsődleges akciógombra kattintáskor hívódik meg. |
| `actionTitle` | `string` | Igen | Az elsődleges akciógomb szövege. |

## Használati példa

Az alábbi példák a főoldalon történő felhasználói tájékoztatást mutatják be, attól függően, hogy a felhasználó be van-e jelentkezve.

```tsx
import { useState } from 'react';
import Information from '@/components/Information/information.component';

export default function HomePageExample() {
    const [user, setUser] = useState<{ id: string; username: string } | null>(null); // Példa felhasználói állapot

    const handleLogin = () => {
        // Navigálás bejelentkezés oldalra
        window.location.pathname = "/bejelentkezes";
    };

    const handleFeedback = () => {
        // Navigálás véleményküldő oldalra
        window.location.pathname = "/velemeny";
    };

    const handleCheckTasks = () => {
        // Navigálás feladatok oldalra
        window.location.pathname = "/szokartyak";
    };

    return (
        <div>
            {/* ... Főoldali tartalom ... */}

            {/* Ha a felhasználó nincs bejelentkezve */}
            {!user && (
                <Information
                    title="Jelentkezz be!"
                    actionTitle="Belépek"
                    action={handleLogin}
                    message="Regisztrálj vagy jelentkezz be a teljes hozzáféréshez és tanulási folyamatod nyomon követéséhez."
                />
            )}

            {/* Ha a felhasználó be van jelentkezve (például felajánljuk, hogy írjon véleményt) */}
            {user && (
                <Information
                    title="Írd le a véleményed!"
                    actionTitle="Véleményt írok"
                    action={handleFeedback}
                    message="Mondd el, mit gondolsz az oldalról!"
                />
            )}

            {/* További információs üzenet */}
            <Information
                title="Nézd meg a feladatainkat is!"
                actionTitle="Megnézem"
                action={handleCheckTasks}
                message="Gyakorold az érettségi táblázatos feladatait több száz különböző táblázattal vagy az érettségi memoritereket szókártyákkal!"
            />
        </div>
    );
}
```
