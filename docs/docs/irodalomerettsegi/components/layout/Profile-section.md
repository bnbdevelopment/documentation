---
title: Profile-section
---
# ProfileSection Komponens

A `ProfileSection` komponens egy általános célú szekció konténer, amely alkalmas hasonló tartalmak csoportosítására, különösen profil oldalakon vagy egyéb adatmegjelenítő felületeken. Címet és opcionális ikont jelenít meg, és rugalmasan beilleszthető a gyermek komponenseket.

## Működés

-   Egy `section` HTML elemet renderel, amelynek fejlécében egy `title` és egy opcionális `icon` helyezkedik el.
-   A gyermek komponenseket (`children`) egy dedikált konténerben jeleníti meg, így rendezetten lehet strukturálni az egyes szekciók tartalmát.
-   Két fő része van: `section-header` és `profile-section-children`.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `children?` | `React.ReactElement \| React.ReactElement[]` | Nem | A szekcióba beillesztendő tartalom (React elemek vagy azok tömbje). |
| `title?` | `string` | Nem | A szekció címe, amely a fejlécben jelenik meg. |
| `icon?` | `string \| React.ReactElement \| React.ReactElement[]` | Nem | Egy ikon vagy más React elem, amely a cím mellett jelenik meg. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet `ProfileSection` komponenseket használni egy profil oldalon a felhasználói adatok strukturálására.

```tsx
import ProfileSection from '@/components/Profile-section/ProfileSection.component';
import { Fragment } from 'react';

export default function UserProfilePage() {
    return (
        <div>
            <h1>Felhasználói profil</h1>

            <ProfileSection title="Személyes adatok" icon={<i className="fas fa-user"></i>}>
                <Fragment>
                    <p>Felhasználónév: JohnDoe</p>
                    <p>Email: john.doe@example.com</p>
                </Fragment>
            </ProfileSection>

            <ProfileSection title="A szériád" icon={<i className="fas fa-calendar-alt"></i>}>
                <Fragment>
                    <p>Jelenlegi streak: 7 nap</p>
                    <p>Legnagyobb streak: 20 nap</p>
                </Fragment>
            </ProfileSection>

            <ProfileSection title="Szókátyák" icon={<i className="fas fa-lightbulb"></i>}>
                <Fragment>
                    <p>Megoldott szókártya feladatok: 15</p>
                    <p>Ismert kártyák: 120</p>
                </Fragment>
            </ProfileSection>
        </div>
    );
}
```
A `Fragment` használata segít elkerülni a felesleges DOM elemeket, ha több gyermek komponenst adunk át a `ProfileSection`-nek.
