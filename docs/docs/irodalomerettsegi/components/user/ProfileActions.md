# `ProfileActions.tsx`

Ez a komponens a felhasználói profilhoz kapcsolódó műveleteket tartalmazza, mint például a profil módosítása, adatok exportálása és a profil törlése.

## Props-ok

| Prop       | Típus    | Leírás                                      |
|------------|----------|---------------------------------------------|
| `onExport` | `() => void` | Függvény, ami lefut az adatok exportálásakor. |

## Példa

```tsx
import ProfileActions from './ProfileActions';

const handleExport = () => {
    console.log("Adatok exportálása...");
};

<ProfileActions onExport={handleExport} />
```
