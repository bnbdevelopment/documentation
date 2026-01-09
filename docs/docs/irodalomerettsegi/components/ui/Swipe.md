---
title: SwipeElement
---
# SwipeElement Komponens

A `SwipeElement` egy burkoló komponens, amely lehetővé teszi a horizontális csúsztatási (swipe) gesztusok érzékelését érintőképernyős eszközökön a gyermek komponensein.

## Működés

-   **Gesztusérzékelés:** Figyeli a `onTouchStart` és `onTouchEnd` eseményeket a gyermek komponenseken.
-   **Irányfelismerés:** Kiszámítja a csúsztatás vízszintes elmozdulását (`diffX`). Ha az elmozdulás meghalad egy belsőleg definiált érzékenységi küszöböt (`sensitvity = 80`), akkor a csúsztatás irányától függően meghívja a megfelelő callback függvényt.
-   **Callback függvények:** Jobbra csúsztatás esetén a `swipeRight`, balra csúsztatás esetén a `swipeLeft` függvény hívódik meg.
-   **Letiltás:** A `blockSwipe` prop `true` értékre állításával a gesztusérzékelés letiltható.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `children` | `ReactElement \| ReactElement[]` | Igen | Az a React elem (vagy elemek), amelyre a csúsztatási funkciót alkalmazni szeretnénk. |
| `swipeLeft` | `Function` | Igen | Callback függvény, amely egy sikeres balra csúsztatás esetén hívódik meg. |
| `swipeRight` | `Function` | Igen | Callback függvény, amely egy sikeres jobbra csúsztatás esetén hívódik meg. |
| `blockSwipe?` | `boolean` | Nem | Ha `true`, a csúsztatási események nem váltják ki a callback függvényeket. |

## Használati példa

Az alábbi példa a `Flashcard` komponensből származik, ahol a felhasználók a szókártyákat jobbra és balra csúsztatva jelölhetik meg ismertnek vagy ismeretlennek.

```tsx
import React, { ReactElement } from 'react';
import SwipeElement from '@/components/Swipe/swipe.component'; // A megfelelő import elérési úttal

export default function SwipeableCard() {
    const handleSwipeLeft = () => {
        alert("Balra csúsztatás történt (pl. 'Nem tudom')");
    };

    const handleSwipeRight = () => {
        alert("Jobbra csúsztatás történt (pl. 'Tudom')");
    };

    const cardStyle: React.CSSProperties = {
        width: '250px',
        height: '350px',
        backgroundColor: '#6C63FF',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '15px',
        fontSize: '24px',
        userSelect: 'none', // A szöveg kijelölésének megakadályozása csúsztatás közben
    };

    return (
        <div>
            <h1>Csúsztatható kártya</h1>
            <p>Húzd a kártyát jobbra vagy balra!</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SwipeElement
                    swipeLeft={handleSwipeLeft}
                    swipeRight={handleSwipeRight}
                    blockSwipe={false}
                >
                    <div style={cardStyle}>
                        Kártya
                    </div>
                </SwipeElement>
            </div>
        </div>
    );
}
```
A `SwipeElement` komponens egy egyszerű, de hatékony módja annak, hogy mobilbarát, gesztus alapú vezérlést adjunk az alkalmazásunkhoz, különösen olyan esetekben, mint a képnézegetők vagy a kártyapaklik.
