---
title: Flashcards
---
# Flashcards Komponens

A `Flashcards` egy átfogó kliens oldali komponens, amely egy szókártya-tanulási rendszert implementál. Lehetővé teszi a felhasználóknak, hogy kártyákat tekintsenek át, jelöljék meg őket ismertnek vagy ismeretlennek, nyomon kövessék a haladásukat, és visszajelzést kapjanak a teljesítményükről.

## Működés

-   **Kártyák megjelenítése és interakció:** Egyidejűleg egy `Flashcard` komponenst jelenít meg. A felhasználók a "Tudom" vagy "Nem tudom" gombokkal (vagy csúsztatással) jelölhetik a kártyákat.
-   **Haladáskövetés:** Nyomon követi az áttanult kártyák számát, valamint az ismert és ismeretlen kártyákat. Ezt a `ProgressBar` és a `FlashcardCounter` komponensek segítségével vizualizálja.
-   **Adatmentés:** A haladást a böngésző lokális tárhelyén (`localStorage`) tárolja (`knowingData`). Ha bejelentkezett felhasználó (`user` prop) van, akkor a szerverre is elküldi az adatokat, hogy a haladás megmaradjon a különböző eszközökön.
-   **Vers megjelenítés (memoriter esetén):** Ha egy szókártya memoritert takar, dinamikusan lekérdez további adatokat (`poemType`) az API-ból, és egy `PoemWindow` segítségével megtekinthető az egész vers.
-   **Visszajelzés:** A tanulási session végén egy `FeedbackWindow` jelenik meg, amely összegzi a felhasználó teljesítményét (százalékos arányban) és lehetőséget ad a kártyák újbóli áttekintésére (csak az ismeretlenekre) vagy az egész session újrakezdésére.
-   **Navigáció:** Gombok segítségével lehet lépni a kártyák között ("Előző", "Tudom", "Nem tudom").

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `flashcards` | `Array<TypeOfFlashcard>` | Nem | A tanulási sessionhöz használt szókártya objektumok tömbje. |
| `loading` | `boolean` | Nem | Ha `true`, jelzi, hogy a szókártyák betöltése még folyamatban van. |
| `user` | `any` (`UserDataType`) | Igen | A bejelentkezett felhasználó adatai. Tartalmazhatja az előzőleg mentett pontszámokat. |

### `TypeOfFlashcard` interface (a szókártya adatstruktúrája)

Ugyanaz, mint a `Flashcard` komponensnél:

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `term` | `string` | A szókártya kifejezése. |
| `definition` | `string` | A szókártya definíciója. |
| `id` | `string` | A szókártya egyedi azonosítója. |
| `known` | `boolean` | Opcionális, jelzi, hogy a felhasználó ismeri-e a kártyát. |

### `poemType` interface (memoriter adatok)

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `cim` | `string` | A vers címe. |
| `eId` | `number` | Egy azonosító. |
| `szerzo` | `string` | A vers szerzője. |
| `vers` | `Array<string>` | A vers sorai, string tömbként. |
| `id` | `string` | A vers egyedi azonosítója. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `Flashcards` komponenst használni egy szókártya oldal fő komponenseként.

```tsx
import { useState, useEffect } from 'react';
import Flashcards from '@/components/Flashcard/Flashcards.component';
import { TypeOfFlashcard } from '@/components/Flashcard/Flashcard';
import { UserDataType } from '@/app/admin/felhasznalok/userType'; // Feltételezve, hogy exportálva van

export default function SzokartyakPage() {
    const [flashcards, setFlashcards] = useState<TypeOfFlashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserDataType | null>(null); // Feltételezett user objektum

    useEffect(() => {
        // Példa adatbetöltésre
        const fetchFlashcards = async () => {
            // Itt történne az API hívás a szókártyák lekérésére
            await new Promise(resolve => setTimeout(resolve, 1000)); // Szimulált késleltetés
            setFlashcards([
                { id: "1", term: "Alma", definition: "Gyümölcs" },
                { id: "2", term: "Körte", definition: "Gyümölcs" },
                { id: "3", term: "Asztal", definition: "Bútor" },
            ]);
            setLoading(false);
            // Feltételezve, hogy a felhasználói adatokat is lekérjük
            setUser({ id: "user123", username: "TestUser", email: "test@example.com", score: { flashcard: { correct: [], incorrect: [] } } });
        };
        fetchFlashcards();
    }, []);

    return (
        <div>
            <h1>Szókártyák</h1>
            <Flashcards user={user} loading={loading} flashcards={flashcards} />
        </div>
    );
}
```
