---
title: ads
---
# GoogleAds Komponens

A `GoogleAds` egy kliens oldali komponens, amely egy Google AdSense hirdetési egységet jelenít meg.

## Működés

1.  A komponens először lekérdez egy központi beállítást (`https://api.irodalomerettsegi.hu/api/v1/ad`) annak megállapítására, hogy a hirdetések megjelenítése engedélyezett-e.
2.  Amennyiben a hirdetések engedélyezettek, a komponens dinamikusan betölti a Google AdSense szkriptet.
3.  A szkript betöltődése után megjeleníti a megadott `adSlot` azonosítóhoz tartozó hirdetést.
4.  Ha a hirdetések nincsenek engedélyezve, a komponens nem jelenít meg semmit.

## Propok

| Név | Típus | Kötelező | Alapértelmezett | Leírás |
| --- | --- | --- | --- | --- |
| `adSlot` | `string` | Igen | - | A Google AdSense hirdetési hely (ad slot) egyedi azonosítója. |
| `adFormat` | `string` | Nem | `'auto'` | A hirdetés formátuma (pl. 'auto', 'rectangle', 'vertical'). |
| `adStyle` | `React.CSSProperties` | Nem | `{ display: 'block' }` | Egyéni CSS stílusok a hirdetési konténerhez. |
| `adLayoutKey` | `string` | Nem | - | Bizonyos speciális hirdetési elrendezésekhez használható kulcs. |

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy automatikus formátumú hirdetést beilleszteni az oldalra.

```tsx
import GoogleAds from "@/components/ads/ads.component";

export default function SzokartyakPage() {
    return (
        <div>
            <h1>Szókártyák</h1>
            {/* ... egyéb tartalom ... */}

            <GoogleAds 
                adStyle={{ display: "block" }} 
                adFormat='auto' 
                adSlot="2465533775" 
            />

            {/* ... egyéb tartalom ... */}
        </div>
    );
}
```
