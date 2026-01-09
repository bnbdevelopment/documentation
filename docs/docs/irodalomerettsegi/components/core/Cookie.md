---
title: Cookie
---
# CookieManagement Komponens

A `CookieManagement` egy kliens oldali komponens, amely felelős a süti hozzájárulási banner megjelenítéséért és a felhasználók süti beállításainak kezeléséért.

## Működés

- Ha a `cookiesAccepted` süti még nincs beállítva, egy süti banner jelenik meg az oldal alján.
- A banner három fő interakciós lehetőséget kínál:
    - **"Elfogad"**: Elfogadja mind az alapvető, mind az analitikai sütiket.
    - **"Beállítások"**: Egy modális ablakot nyit meg, ahol a felhasználó testreszabhatja a süti preferenciáit. Az alapvető sütik mindig engedélyezve vannak, míg az analitikai sütik ki-be kapcsolhatók.
    - **"Elutasít"**: Csak az alapvető sütiket fogadja el, az analitikai sütiket letiltja.
- A süti preferenciákat a `react-cookie` könyvtár segítségével kezeli és tárolja.
- A komponens a `useCookies` hookot használja a süti adatok eléréséhez és módosításához.

## Propok

A `CookieManagement` komponens nem fogad be propokat.

## Használati példa

Mivel a `CookieManagement` komponens a süti hozzájárulást kezeli, általában az alkalmazás gyökérelemében vagy egy magasabb szintű layout komponensben kell elhelyezni, hogy minden oldalon elérhető legyen. Emellett a `react-cookie` `CookiesProvider`-jét is feljebb kell elhelyezni a komponens fában, hogy a `useCookies` hook megfelelően működjön.

```tsx
// Példa a _app.tsx vagy egy RootLayout fájlban való használatra
import { CookiesProvider } from 'react-cookie';
import CookieManagement from '@/components/Cookie/Cookie.component';

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
      <CookieManagement /> {/* A süti banner megjelenítése */}
    </CookiesProvider>
  );
}

// Vagy Next.js 13+ App Router esetén (ha a CookiesProvider támogatja a szerver komponenseket):
// import CookieManagement from '@/components/Cookie/Cookie.component';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="hu">
//       <body>
//         {children}
//         <CookieManagement />
//       </body>
//     </html>
//   );
// }
```
A fenti példa feltételezi, hogy a `CookiesProvider` valahol a komponens fában feljebb van elhelyezve, hogy a `useCookies` hook működhessen. A `CookieManagement` komponens egyszerűen beilleszthető a layoutba.
