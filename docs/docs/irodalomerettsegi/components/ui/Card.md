---
title: Card
---
# Card Komponens

A `Card` egy újrahasználható komponens, amely egy kártya-szerű felületi elemet jelenít meg, címmel, leírással és egy ikonnal.

## Működés

- A komponens egy reszponzív kártyát hoz létre, amelynek bal oldalán a szöveges tartalom (cím és leírás), jobb oldalán pedig egy ikon helyezkedik el.
- A teljes kártya kattinthatóvá tehető egy `onClick` eseménykezelővel.
- A cím egyben linkként is funkcionálhat, ha meg van adva a `link` prop.
- Támogatja a "loading" állapotot, amely során a tartalom helyén "skeleton" (váz) elemek jelennek meg, jelezve a betöltést.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `icon` | `React.ReactElement` | Nem | Az ikon, ami a kártya jobb oldalán jelenik meg. |
| `title` | `string` | Nem | A kártya címe. |
| `description` | `string` | Nem | A kártya leírása, a cím alatt. |
| `loading` | `boolean` | Nem | Ha `true`, a komponens betöltési állapotot mutat. |
| `link` | `string` | Nem | URL, amire a kártya címe mutat. Ha meg van adva, a cím `<a>` tag-be lesz csomagolva. |
| `onClick` | `() => void` | Nem | Függvény, ami a kártyára való kattintáskor hívódik meg. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet a `Card` komponenst használni egy lista elemeinek megjelenítésére, ahol minden kártya egy adott aloldalra navigál.

```tsx
import Card from '@/components/Card/Card.component';

// ... tegyük fel, hogy a `materialTypes` egy objektum, ami a különböző típusokat tárolja

const materialTypes = {
    'kolteszet': {
        name: 'Költészet',
        description: 'Versek és elemzéseik.'
    },
    'epika': {
        name: 'Epika',
        description: 'Novellák és regényrészletek.'
    }
};

export default function MaterialListPage() {
    return (
        <div>
            {Object.keys(materialTypes).map((type, index) => (
                <Card 
                    key={index}
                    title={materialTypes[type].name} 
                    description={materialTypes[type].description} 
                    icon={<i className="fa-solid fa-arrow-right"></i>} 
                    onClick={() => window.location.href = `/tablazat/${type}`}
                />
            ))}
        </div>
    );
}

```

### Betöltési állapot (Loading)

A `loading` prop használatával egyszerűen jelezhetjük, hogy az adat még töltődik.

```tsx
import Card from '@/components/Card/Card.component';

export default function MaterialsLoading() {
    return (
        <div>
            <Card loading />
            <Card loading />
            <Card loading />
        </div>
    );
}
```
