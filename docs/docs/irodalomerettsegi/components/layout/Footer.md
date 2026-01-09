---
title: Footer
---
# Footer Komponens

A `Footer` komponens a weboldal alsó részén elhelyezkedő láblécet jeleníti meg, tartalmazva alapvető információkat és navigációs linkeket.

## Működés

-   Egy szerzői jogi nyilatkozatot tartalmaz (`©2025 irodalomerettsegi.hu All rights reserved.`). **Megjegyzés:** A 2025-ös év hardcode-olva van, ideális esetben ezt dinamikusan kellene generálni.
-   Navigációs menüt biztosít fontos oldalakhoz, mint például: "Rólunk", "Vélemény", "Süti kezelési tájékoztató", "Adatvédelem" és "ÁSZF".
-   A linkek belső navigációra szolgálnak az alkalmazáson belül.

## Propok

A `Footer` komponens nem fogad be propokat.

## Használati példa

A `Footer` komponens általában az alkalmazás fő layout fájljában vagy egy olyan magas szintű komponensben kerül elhelyezésre, amely minden oldalon megjeleníti a láblécet.

```tsx
import Footer from '@/components/Footer/Footer.component';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <Footer /> {/* A lábléc beillesztése */}
        </div>
    );
}
```
