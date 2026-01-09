---
title: Profile_Button
---
# Profile_Button Komponens

A `Profile_Button` komponens egy felhasználói profilt reprezentáló gombot jelenít meg, amely általában az alkalmazás fejlécében vagy navigációs sávjában található. Lehetővé teszi a felhasználó számára, hogy hozzáférjen a profiljához és egyéb kapcsolódó funkciókhoz egy legördülő menü segítségével.

## Működés

-   **Profil ikon és név:** Megjelenít egy `Profile_Icon` komponenst, valamint a felhasználó nevét. A név automatikusan rövidül, ha túlságosan hosszú (max. 6 karakter, vagy az első két szó).
-   **Napi sorozat (Streak):** Egy `Streak` komponenst is tartalmaz, amely a felhasználó aktuális napi aktivitási sorozatát mutatja.
-   **Legördülő menü:** Kattintásra egy Ant Design `Dropdown` menüt nyit meg.
-   **Jogosultság alapú menü:**
    -   **Átlagos felhasználók:** A menüben a "Profil" és "Kijelentkezés" opciók találhatók.
    -   **Admin felhasználók:** A menüben a "Profil", "Admin" (az admin felületre vezető link), és "Kijelentkezés" opciók szerepelnek.
-   **Kijelentkezés:** A "Kijelentkezés" opció eltávolítja a felhasználói tokent a `localStorage`-ból és átirányítja a felhasználót a főoldalra.
-   **Prémium jelzés:** A `premium` prop alapján a `Profile_Icon` prémium státuszt is jelezhet.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `name` | `string` | Igen | A felhasználó teljes neve vagy felhasználóneve. |
| `isAdmin` | `boolean` | Igen | Meghatározza, hogy a felhasználó adminisztrátor-e, és ennek megfelelően módosítja a legördülő menü tartalmát. |
| `streak` | `number` | Nem | A felhasználó aktuális napi aktivitási sorozatának hossza. |
| `premium` | `boolean` | Nem | Ha `true`, jelzi, hogy a felhasználó prémium fiókkal rendelkezik. |

## Használati példa

Az alábbi példa a `Page` komponens fejlécében történő használatát mutatja be, ahol a felhasználó bejelentkezési státuszától és jogosultságaitól függően jelenik meg.

```tsx
import { useState } from 'react';
import Profile_Button from '@/components/Profile_Button/profile_Button.component';

export default function HeaderArea() {
    const [user, setUser] = useState({
        username: "Példa Felhasználó",
        isAdmin: true,
        isPremium: true,
        streak: { streak: 15 } // Példa streak adatok
    });

    return (
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
            {user ? (
                <Profile_Button
                    premium={user.isPremium}
                    streak={user.streak.streak}
                    isAdmin={user.isAdmin}
                    name={user.username}
                />
            ) : (
                <a href="/bejelentkezes">Bejelentkezés</a>
            )}
        </div>
    );
}
```
