---
title: Profile_Icon
---
# ProfileIcon Komponens

A `Profile_Icon` komponens egy felhasználói profilt reprezentáló ikont jelenít meg, amely az Ant Design `Avatar` komponensén alapul. Az ikon a felhasználó nevének kezdőbetűiből generálódik, és egy dinamikus háttérszínt kap. Különböző állapotokat, mint a prémium tagság vagy méret, képes vizuálisan megjeleníteni.

## Működés

-   **Kezdőbetűk:** A felhasználó nevéből (vagy felhasználónevéből) veszi az első két szó kezdőbetűjét, és nagybetűs formában jeleníti meg az avatáron.
-   **Dinamikus háttérszín:** A felhasználó neve alapján egy hash generálódik, amiből egy egyedi, konzisztens háttérszín jön létre az avatár számára. Ez biztosítja, hogy ugyanaz a felhasználó mindig ugyanazzal a színű ikonnal jelenjen meg.
-   **Prémium jelzés:** Ha a `premium` prop `true`, egy arany korona ikon jelenik meg az avatár mellett, jelezve a prémium tagságot.
-   **Méret:** A `large` prop segítségével az avatár nagyobb méretben is megjeleníthető.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `name` | `string` | Igen | A felhasználó teljes neve vagy felhasználóneve, amely alapján a kezdőbetűk és a háttérszín generálódik. |
| `large?` | `boolean` | Nem | Ha `true`, az avatár nagyobb méretben jelenik meg. |
| `premium?` | `boolean` | Nem | Ha `true`, egy korona ikon jelzi a prémium tagságot. |

## Használati példa

Az alábbi példák bemutatják a `Profile_Icon` komponens különböző felhasználási módjait.

```tsx
import Profile_Icon from '@/components/Profile_Icon/profile_Icon.component';

export default function ProfileIconExamples() {
    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <h2>Alap ikon:</h2>
            <Profile_Icon name="Kovács Béla" />

            <h2>Prémium felhasználó:</h2>
            <Profile_Icon name="Nagy Anna" premium={true} />

            <h2>Nagy méretű ikon:</h2>
            <Profile_Icon name="Adminisztrátor" large={true} />

            <h2>Nagy méretű prémium felhasználó:</h2>
            <Profile_Icon name="Szuper Felhasználó" large={true} premium={true} />

            <h2>Komentár fejlécben:</h2>
            {/* Példa a Message komponensből, ahol a comment.author.username-et használja */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '10px' }}>
                <Profile_Icon name="Bence Gyurus" />
                <span style={{ marginLeft: '10px' }}>Bence Gyurus</span>
            </div>
        </div>
    );
}
```
A `Profile_Icon` komponens ideális választás olyan helyeken, ahol kompakt és konzisztens módon kell megjeleníteni a felhasználói profilokat, mint például kommentek mellett, felhasználói listákon vagy navigációs sávokban.
