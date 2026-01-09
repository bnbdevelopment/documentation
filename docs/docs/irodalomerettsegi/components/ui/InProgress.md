---
title: InProgress
---
# InProgress Komponens

Az `InProgress` komponens egy statikus üzenetet jelenít meg, amely jelzi, hogy az adott oldal vagy funkció még fejlesztés alatt áll, és csak béta verzióban érhető el.

## Működés

-   Egy "Fejlesztés alatt" címet és egy kiegészítő szöveges leírást jelenít meg.
-   Tartalmaz egy illusztrációt (`/programming.png` kép).
-   Egy linket is tartalmaz, amely további információkért irányíthatja a felhasználót (a komponens kódjában az `<a>` tag `href` attribútuma hiányzik).
-   A komponens nem fogad propokat, tartalma fix.

## Propok

Az `InProgress` komponens nem fogad be propokat.

## Használati példa

Az `InProgress` komponenst általában olyan oldalakon vagy szekciókban használjuk, amelyek még nem készültek el teljesen, és tájékoztatni szeretnénk erről a felhasználókat.

```tsx
import InProgress from '@/components/InProgress/InProgress.component';

export default function UnderConstructionPage() {
    return (
        <div>
            <h1>Üdvözöljük!</h1>
            <p>Ez egy oldal, ami hamarosan elkészül.</p>
            
            <InProgress /> {/* A "Fejlesztés alatt" üzenet megjelenítése */}

            <p>Kérjük, térjen vissza később!</p>
        </div>
    );
}
```
