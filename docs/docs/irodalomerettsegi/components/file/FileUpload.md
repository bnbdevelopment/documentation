---
title: FileUpload
---
# FileUpload Komponens

A `FileUpload` egy felhasználóbarát komponens, amely lehetővé teszi fájlok feltöltését drag-and-drop funkcióval, az Ant Design `Dragger` komponensét használva.

## Működés

- A felhasználók egy kijelölt területre húzhatják a feltölteni kívánt fájlokat, vagy kiválaszthatják azokat a fájlkezelőből.
- Támogatja az egyetlen fájl feltöltését alapértelmezetten, de konfigurálható több fájl feltöltésére is (`maxCount` prop).
- Visszajelzést ad a feltöltési folyamatról (sikeres vagy sikertelen), a `setSuccess` és `setError` callback függvények segítségével.
- Megadható, hogy milyen fájltípusokat fogad el (`accept` prop, pl. ".pdf,.docx").
- A feltöltési terület letiltható (`disabled` prop).
- Testreszabható cím (`title`) és leírás (`description`) szövegeket jelenít meg a feltöltési területről.
- A feltöltött fájlt a `setFile` callback függvényen keresztül adja vissza.

## Propok

| Név | Típus | Kötelező | Alapértelmezett | Leírás |
| --- | --- | --- | --- | --- |
| `setSuccess` | `Function` | Igen | - | Callback függvény, amely sikeres feltöltés esetén hívódik meg. Egy objektumot vár (pl. `{title: string, message: string}`). |
| `setError` | `Function` | Igen | - | Callback függvény, amely sikertelen feltöltés esetén hívódik meg. Egy objektumot vár (pl. `{title: string, message: string}`). |
| `setFile` | `Function` | Igen | - | Callback függvény, amely a feltöltött fájl objektumát adja vissza. |
| `disabled` | `boolean` | Igen | `false` | Ha `true`, a feltöltési terület letiltásra kerül. |
| `maxCount` | `number` | Nem | `1` | A maximálisan feltölthető fájlok száma. |
| `accept` | `string` | Nem | `".pdf,.docx"` | A vesszővel elválasztott fájltípusok listája, amelyeket a feltöltő elfogad (pl. ".pdf,.docx,.png"). |
| `title` | `string` | Nem | `"Húzd ide vagy válaszd ki a feltöltendő fájlodat"` | A feltöltési terület fő címe. |
| `description` | `string` | Nem | Egy alapértelmezett szöveg, amely összefoglalja az `accept` és `maxCount` beállításokat. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy `FileUpload` komponenst használni egy véleményküldő űrlapon, ahol a felhasználó mellékletet csatolhat.

```tsx
import { useState } from 'react';
import FileUpload from '@/components/FileUpload/FileUpload.component';
import { ErrorType } from '@/components/Error/ErrorType'; // Feltételezve, hogy exportálva van

export default function ReviewPage() {
    const [error, setError] = useState<ErrorType | null>(null);
    const [success, setSuccess] = useState<ErrorType | null>(null);
    const [file, setFile] = useState<any>(null); // Az antd upload file objektuma

    const handleSetError = (err: { title: string, message: string }) => {
        setError(err);
        // Opcionálisan ide jöhet egy setTimeout, ami eltünteti az üzenetet
    };

    const handleSetSuccess = (succ: { title: string, message: string }) => {
        setSuccess(succ);
        // Opcionálisan ide jöhet egy setTimeout, ami eltünteti az üzenetet
    };

    const handleSetFile = (uploadedFile: any) => {
        setFile(uploadedFile);
        console.log("Feltöltött fájl:", uploadedFile);
    };

    // Például letilthatjuk a feltöltést, ha már van kiválasztott fájl
    const isDisabled = !!file;

    return (
        <div>
            <h1>Vélemény küldése</h1>
            {/* ... egyéb űrlap elemek ... */}

            <FileUpload
                disabled={isDisabled}
                setError={handleSetError}
                setSuccess={handleSetSuccess}
                setFile={handleSetFile}
                maxCount={1}
                accept=".pdf,.docx"
                title="Melléklet feltöltése (opcionális)"
                description="Csak PDF és DOCX fájlok tölthetők fel, maximum 1 darab."
            />

            {error && <p style={{ color: 'red' }}>Hiba: {error.message}</p>}
            {success && <p style={{ color: 'green' }}>Siker: {success.message}</p>}
            {file && <p>Kiválasztott fájl: {file.name}</p>}

            {/* ... űrlap elküldése gomb ... */}
        </div>
    );
}
```
