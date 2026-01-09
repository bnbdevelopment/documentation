---
title: CustomSkeleton
---
# CustomSkeleton Komponens (Skeleton betöltő)

A `CustomSkeleton` komponens egy testreszabható, animált "váz" betöltőket generál, amelyek a tartalom betöltése közben vizuális visszajelzést nyújtanak a felhasználóknak. A `@mui/material` `Skeleton` komponensét használja, és a `random` segédfüggvénnyel változatos méreteket állít elő.

## Működés

-   **Formátum alapú generálás:** A `format` propban megadott "title" vagy "description" típusok alapján generál `SizeSkeleton` elemeket.
    -   `"title"` esetén egy szélesebb, de alacsonyabb, címre emlékeztető vázat hoz létre.
    -   `"description"` esetén egy keskenyebb, de hosszabb, szövegblokkra emlékeztető vázat hoz létre.
-   **Véletlenszerű méretezés:** A `SizeSkeleton` alkomponens a `random` segédfüggvénnyel generál véletlenszerű szélességet és magasságot a megadott tartományon belül (`min`, `max`), így a vázak természetesebbnek és kevésbé monotonnak tűnnek.
-   **Animáció:** A `@mui/material` `Skeleton` komponens animációját használja a vizuális betöltési effektushoz.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `format` | `Array<"title" \| "description">` | Igen | Stringek tömbje, amely meghatározza, hogy milyen típusú (cím vagy leírás) váz elemeket generáljon a komponens. |

### `SizeSkeleton` alkomponens

Ez egy belsőleg használt komponens, amely egyedi `Skeleton` elemeket hoz létre.

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `width` | `typeOfSize` | Igen | Objektum (`{min: number, max: number}`), amely a szélesség minimális és maximális értékét adja meg. |
| `height` | `typeOfSize` | Igen | Objektum (`{min: number, max: number}`), amely a magasság minimális és maximális értékét adja meg. |
| `key` | `string` | Igen | A React lista rendereléséhez szükséges egyedi kulcs. |

### `typeOfSize` interface

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `min` | `number` | Minimális érték. |
| `max` | `number` | Maximális érték. |

## Használati példa

Az alábbi példa egy profil oldal felhasználói adatainak betöltését szimulálja, és addig a `CustomSkeleton` komponenssel jelenít meg helyőrzőket.

```tsx
import { useState, useEffect } from 'react';
import CustomSkeleton from '@/components/Skeleton/Skeleton.component';

export default function UserProfileWithLoading() {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Adatbetöltés szimulálása
            setUser({ username: "Példa Felhasználó", email: "pelda.user@example.com" });
            setLoading(false);
        };
        fetchUserData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <div>
                    <CustomSkeleton format={["title"]} /> {/* Váz a felhasználónévnek */}
                    <CustomSkeleton format={["description"]} /> {/* Váz az email címnek */}
                    <CustomSkeleton format={["description", "description", "title"]} /> {/* Váz további szekcióknak */}
                </div>
            ) : (
                <div>
                    <h1 className="user-page-title">{user?.username}</h1>
                    <span className="user-email">{user?.email}</span>
                    <p>Ez itt egy valós adatblokk.</p>
                    <p>És még egy.</p>
                </div>
            )}
        </div>
    );
}
```
A `CustomSkeleton` segít abban, hogy a felhasználók számára jobb élményt nyújtsunk az adatok betöltése közben, mivel vizuális visszajelzést adnak arról, hogy a tartalom hamarosan megérkezik, és csökkentik a "villódzás" érzését.
