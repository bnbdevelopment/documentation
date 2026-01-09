---
title: StatCookie
---
# StatCookie Komponens

A `StatCookie` komponens egy kliens oldali, nem vizuális komponens, amely a weboldal látogatottsági adatainak gyűjtéséért és egy statisztikai API-nak való elküldéséért felelős.

## Működés

-   **Session követés:** A `react-cookie` segítségével kezel egy `SessionId` sütit, amely egyedi azonosítót biztosít az egyes felhasználói munkamenetekhez.
-   **Adatküldés:** Minden oldalbetöltéskor, és ezt követően 5 percenként (300000 ms), elküldi az aktuális oldal (`pathname`), a munkamenet azonosítója (`sessionId`) és az oldal domainje (`site`) adatait egy külső statisztikai API-nak (`https://stats.bnbdevelopment.hu/api/v1/put-traffic`).
-   **Süti hozzájárulás:** Csak akkor küld adatokat, ha a felhasználó beleegyezett az analitikai sütik használatába (ellenőrzi a `cookiesAccepted.cookiesAccepted.analytics` állapotot).
-   **Munkamenet frissítése:** Az API válaszában érkező új `SessionId`-t beállítja a sütibe, ha az analitikai sütik engedélyezettek.

## Propok

A `StatCookie` komponens nem fogad be propokat.

## Használati példa

A `StatCookie` komponenst általában egy magas szintű layout komponensben helyezzük el, hogy az az alkalmazás minden oldalán fusson, és nyomon kövesse a felhasználói forgalmat.

```tsx
import StatCookie from '@/components/StatCookie/StatCookie.component';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>
        <StatCookie /> {/* A statisztikai adatgyűjtés komponense */}
        {children}
      </body>
    </html>
  );
}
```
A komponens fontos szerepet játszik a weboldal analitikájában, lehetővé téve a fejlesztők számára, hogy nyomon kövessék a forgalmat és a felhasználói viselkedést, de tiszteletben tartva a felhasználói süti preferenciákat.
