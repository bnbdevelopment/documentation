---
title: Message
---
# Message Komponens

A `Message` komponens egyetlen felhasználói visszajelzés vagy üzenet megjelenítésére szolgál, tipikusan egy adminisztrációs felületen. Célja az üzenetek rendezett és informatív megjelenítése, valamint alapvető interakciók biztosítása (pl. törlés).

## Működés

-   Megjeleníti az üzenet tárgyát (`subject`), amely egy linkként működik a részletes üzenetoldalra.
-   Egy csillagos értékelést (`rate`), az üzenet küldésének dátumát (`created`), a feladó e-mail címét (`email`) és felhasználónevét (`username`) jeleníti meg.
-   Az üzenet törzsét (`body`) egy rövidített formában (`shortText` segédfüggvénnyel) mutatja be, és ha van, akkor egy csatolt fájlt (`fileName`) is jelez a `File` komponens segítségével.
-   A `subject` és `body` mezők `isNew` prop alapján eltérő stílusban jelenhetnek meg, jelezve, ha az üzenet olvasatlan.
-   Tartalmaz egy törlés ikont (`fa-trash-alt`), amelyre kattintva a `deleteReview` függvény hívódik meg az üzenet `id`-jával.
-   Segédfüggvényeket használ a dátum formázására (`createDate`) és a szöveg rövidítésére (`shortText`).

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `body` | `string` | Igen | Az üzenet fő tartalma. |
| `created` | `string` | Igen | Az üzenet létrehozásának időpontja (ISO string formátumban). |
| `email` | `string` | Igen | A feladó e-mail címe. |
| `fileName` | `string` | Igen | A csatolt fájl neve (ha van). |
| `isNew` | `boolean` | Igen | `true`, ha az üzenet olvasatlan, `false` egyébként. |
| `rate` | `number` | Igen | Az üzenethez tartozó értékelés (0-10 skálán, 5 csillagos megjelenítéshez osztva 2-vel). |
| `subject` | `string` | Igen | Az üzenet tárgya. |
| `username` | `string` | Igen | A feladó felhasználóneve. |
| `id` | `string` | Igen | Az üzenet egyedi azonosítója. |
| `deleteReview` | `Function` | Igen | Callback függvény az üzenet törléséhez, paraméterként megkapja az `id`-t. |

## Használati példa

Az alábbi példa egy admin felületen található vélemények listázását mutatja be.

```tsx
import { useState, useEffect } from 'react';
import Message from '@/components/Message/Message.component';
import { ErrorType } from '@/components/Error/ErrorType'; // Feltételezve, hogy exportálva van
import { SuccessType } from '@/components/Success/SuccessType'; // Feltételezve, hogy exportálva van
import deleteData from '@/network/delete'; // Példa API hívásra

// A messageParams.tsx-ből származó interfész
interface ReviewMessage {
    id: string;
    body: string;
    created: string;
    email: string;
    fileName: string;
    isNew: boolean;
    rate: number;
    subject: string;
    username: string;
}


export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<ReviewMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [success, setSuccess] = useState<SuccessType | null>(null);

    // Szimulált adatbetöltés
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setReviews([
                { id: "1", body: "Nagyon jó az oldal!", created: new Date().toISOString(), email: "user1@example.com", fileName: "", isNew: true, rate: 10, subject: "Pozitív visszajelzés", username: "User1" },
                { id: "2", body: "Találtam egy hibát...", created: new Date(Date.now() - 86400000).toISOString(), email: "user2@example.com", fileName: "hiba_screenshot.png", isNew: false, rate: 6, subject: "Hiba jelentés", username: "User2" },
            ]);
            setLoading(false);
        };
        fetchReviews();
    }, []);

    const handleDeleteReview = async (id: string) => {
        try {
            // Szimulált törlési API hívás
            // const response = await deleteData(`/api/reviews/${id}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            setReviews(reviews.filter(review => review.id !== id));
            setSuccess({ title: "Siker", message: "Vélemény sikeresen törölve." });
        } catch (err: any) {
            setError({ title: "Hiba", message: "A törlés sikertelen." });
        }
    };

    if (loading) return <p>Vélemények betöltése...</p>;
    if (error) return <p style={{ color: 'red' }}>Hiba: {error.message}</p>;

    return (
        <div>
            <h1>Admin Vélemények</h1>
            {success && <p style={{ color: 'green' }}>{success.message}</p>}
            {reviews.length === 0 ? (
                <p>Nincsenek megjeleníthető vélemények.</p>
            ) : (
                reviews.map(review => (
                    <Message
                        key={review.id}
                        {...review} // Az összes prop átadása
                        deleteReview={handleDeleteReview}
                    />
                ))
            )}
        </div>
    );
}
```
