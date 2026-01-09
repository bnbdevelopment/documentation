---
title: Page
---
# Page Komponens (Layout Wrapper)

A `Page` komponens az alkalmazás fő layout burkolója, amely egységes szerkezetet és funkcionalitást biztosít a különböző oldalak számára. Felelős a fejléc, lábléc, süti kezelés, információs üzenetek és felhasználói állapot kezeléséért.

## Működés

-   **Fejléc:** Ant Design `Layout.Header` komponensét használja egy stickies fejléc megjelenítésére. Ez tartalmazza a logót, a navigációs menüt (dinamikusan generált elemekkel, amelyek a `headerItems` tömbből származnak), valamint a felhasználó bejelentkezési státuszát (profil gomb vagy bejelentkezés link).
-   **Felhasználói adatok:** Betöltéskor lekéri a felhasználói adatokat az API-ból, és ez alapján módosítja a fejléc tartalmát (pl. profilkép/felhasználónév vagy bejelentkezés gomb). Kezeli az `onlyLogedIn` és `onlyAdmin` korlátozásokat, adott esetben jogosultsági hibaüzenetet (`Result 403`) vagy átirányítást végez.
-   **Süti kezelés:** Beágyazza az `AcceptCookies` (korábban `CookieManagement`) és `StatCookie` komponenseket a süti hozzájárulás és statisztikai célú sütik kezelésére.
-   **Információs üzenetek:** Feltételesen megjelenít `Information` komponenseket a felhasználó számára (`showInformation`, `materialInfo` propok alapján), például bejelentkezési felhívást vagy feladat javaslatokat.
-   **Tartalom:** A `children` propon keresztül fogadja az aktuális oldal tartalmát.
-   **Javasolt feladatok:** Opcionálisan megjeleníthet egy `Suggestion` komponenst, amely a jelenlegi oldaltól eltérő, javasolt feladatokat mutatja (`showSuggestedExcersie` prop).
-   **Lábléc:** Tartalmazza a `Footer` komponenst.
-   **Design:** Az Ant Design `ConfigProvider` segítségével biztosítja a téma beállításait, például az elsődleges színt.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `children` | `React.ReactElement \| React.ReactElement[]` | Nem | Az oldal fő tartalma, amelyet a layout komponens magába foglal. |
| `withoutHeader` | `boolean` | Nem | **Figyelem:** A komponens kódja jelenleg *mindig* renderel egy fejlécet, függetlenül ettől a proptól. Lehet, hogy ez egy elhagyott funkció vagy későbbi fejlesztésre szánt placeholder. |
| `withoutFooter` | `boolean` | Nem | **Figyelem:** A komponens kódja jelenleg *mindig* renderel egy láblécet, függetlenül ettől a proptól. Lehet, hogy ez egy elhagyott funkció vagy későbbi fejlesztésre szánt placeholder. |
| `showInformation` | `boolean` | Nem | Ha `true`, egy általános `Information` komponens jelenik meg (pl. bejelentkezési felhívás). |
| `materialInfo` | `boolean` | Nem | Ha `true`, egy anyagainkkal kapcsolatos `Information` komponens jelenik meg (pl. feladatjavaslatok). |
| `setAds` | `Function` | Nem | **Jelenleg nem használt** a komponens kódjában. |
| `onlyLogedIn` | `boolean` | Nem | Ha `true`, az oldal tartalmát csak bejelentkezett felhasználók láthatják. Ellenkező esetben egy "403 Forbidden" hibaüzenet jelenik meg. |
| `setUserData` | `Function` | Nem | Callback függvény, amelyen keresztül a felhasználói adatok beállíthatók egy magasabb szintű komponensben. |
| `setLoading` | `Function` | Nem | Callback függvény, amelyen keresztül a betöltési állapot beállítható egy magasabb szintű komponensben. |
| `onlyAdmin` | `boolean` | Nem | Ha `true`, az oldal tartalmát csak adminisztrátorok láthatják. Nem admin felhasználók a főoldalra kerülnek átirányításra. |
| `showSuggestedExcersie` | `boolean` | Nem | Ha `true`, a lap alján megjelenik egy `Suggestion` komponens, amely javasolt feladatokat mutat. |

## Használati példa

Az alábbi példa egy szókártya oldal struktúráját mutatja be a `Page` komponens használatával.

```tsx
import { useState, useEffect } from 'react';
import Page from '@/components/Page/Page.component';
import { TypeOfFlashcard } from '@/components/Flashcard/Flashcard'; // Importáljuk a szókártya típust
import { UserDataType } from '@/app/admin/felhasznalok/userType'; // Feltételezzük, hogy létezik és exportálva van

export default function SzokartyakPage() {
    const [flashcards, setFlashcards] = useState<TypeOfFlashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserDataType | null>(null);

    useEffect(() => {
        // Itt történne az API hívás a szókártyák lekérésére
        const fetchFlashcards = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Szimulált késleltetés
            setFlashcards([
                { id: "1", term: "Alma", definition: "Gyümölcs" },
                { id: "2", term: "Körte", definition: "Gyümölcs" },
            ]);
            setLoading(false);
            setUser({ id: "user123", username: "TesztElek", email: "test@example.com", isAdmin: false, isPremium: false, streak: { streak: 5 } });
        };
        fetchFlashcards();
    }, []);

    return (
        <Page
            showSuggestedExcersie  // Javasolt feladatok megjelenítése
            setLoading={setLoading} // Betöltési állapot kezelése
            setUserData={setUser}    // Felhasználói adatok beállítása
            showInformation         // Általános információs üzenetek megjelenítése
            // onlyLogedIn={true}     // Ha csak bejelentkezett felhasználóknak szólna az oldal
        >
            <div>
                <h1>Szókártyák</h1>
                {loading ? (
                    <p>Szókártyák betöltése...</p>
                ) : (
                    <p>Itt jelennek meg a szókártyák, ha betöltődtek.</p>
                    // Ide illesztenénk be a Flashcards komponenst a flashcards adatokkal
                )}
            </div>
        </Page>
    );
}
```
