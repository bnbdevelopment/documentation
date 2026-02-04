---
title: Ads
---
# Ads Komponensek (`GoogleAds`, `AdHandler`, `HorizontalAd`, `VerticalAd`, `FlashcardAd`)

Az Ads komponensek Google AdSense hirdetések megjelenítésére szolgálnak, illetve a hirdetések engedélyezését konfigurálják az API alapján.

## `GoogleAds` Komponens

A `GoogleAds` egy kliens oldali komponens, amely egy AdSense hirdetési egységet jelenít meg dinamikus konfigurációval.

### Működés

1.  A komponens lekérdezi a hirdetés engedélyezési beállítást (`https://api.irodalomerettsegi.hu/api/v1/ad`).
2.  Ha engedélyezett, betölti az AdSense szkriptet és létrehozza a hirdetési blokkot az `adSlot` alapján.
3.  A szkript betöltése után a komponens meghívja az `adsbygoogle` inicializációt.
4.  Ha a hirdetések tiltva vannak, a komponens nem renderel.

### Propok

| Név | Típus | Kötelező | Alapértelmezett | Leírás |
| --- | --- | --- | --- | --- |
| `adSlot` | `string` | Igen | - | A Google AdSense hirdetési hely (ad slot) egyedi azonosítója. |
| `adFormat` | `string` | Nem | `'auto'` | A hirdetés formátuma (pl. `'auto'`, `'rectangle'`). |
| `adStyle` | `React.CSSProperties` | Nem | `{ display: 'block' }` | Egyéni CSS stílusok a hirdetési konténerhez. |
| `adLayoutKey` | `string` | Nem | - | Speciális AdSense elrendezés kulcs (pl. in-feed hirdetésekhez). |

## `AdHandler` Komponens

Az `AdHandler` nem jelenít meg UI elemet. Feladata, hogy az API alapján beállítsa, láthatóak-e a hirdetések.

### Működés

- Lekéri a hirdetési beállítást az API-ból.
- Ha sikeres, meghívja az opcionális `setShowAds` callbacket a `true/false` értékkel.

### Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `setShowAds?` | `Function` | Nem | Callback, amely megkapja a hirdetések engedélyezett állapotát. |

## `HorizontalAd`, `VerticalAd`, `FlashcardAd` Komponensek

Ezek a komponensek előre konfigurált, fix ad-slot azonosítókkal rendelkező hirdetési blokkok. A szkriptet és az `ins` blokkot közvetlenül renderelik, majd a `/adsRunScript.js` segítségével indítják a megjelenítést.

### Főbb különbségek

- `HorizontalAd`: vízszintes elrendezéshez igazított slot.
- `VerticalAd`: oldalhasáb jellegű, keskenyebb slot.
- `FlashcardAd`: a szókártya nézethez hangolt slot.

## Használati példa

Az alábbi példa bemutatja, hogyan lehet egy automatikus formátumú hirdetést beilleszteni az oldalra.

```tsx
import GoogleAds from "@/components/ads/ads.component";

export default function SzokartyakPage() {
    return (
        <div>
            <h1>Szókártyák</h1>
            <GoogleAds adStyle={{ display: "block" }} adFormat="auto" adSlot="2465533775" />
        </div>
    );
}
```

## Alkalmazási példa (az alkalmazásban)

- A dinamikus hirdetések több oldalon is megjelennek, például a kvíz nézetben `web/app/quiz/page.tsx` és a táblázatok oldalán `web/app/tablazat/page.tsx`.
- A `AdHandler` a szókártya oldal beállítási ablakában állítja be a hirdetések láthatóságát `web/app/szokartyak/page.tsx`.
