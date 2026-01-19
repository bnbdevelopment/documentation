---
sidebar_position: 2
sidebar_label: 'Kuponrendszer'
---

# Kuponrendszer

## Áttekintés
A kuponrendszer lehetővé teszi kedvezményes kódok létrehozását és kezelését, amelyekkel a felhasználók kedvezményt kaphatnak az előfizetési csomagok vásárlásakor.

## Kupon struktúra

A kuponok az alábbi adatokat tartalmazzák:

| Mező | Típus | Leírás |
|------|-------|--------|
| `id` | string | Egyedi azonosító |
| `name` | string | Admin felületen megjelenő név |
| `code` | string | Felhasználók által megadható kód (pl. SUMMER2026) |
| `description` | string \| null | Kupon leírása |
| `discountPercent` | number | Kedvezmény százalékban (pl. 20 = 20% kedvezmény) |
| `validFrom` | DateTime | Érvényesség kezdete |
| `validUntil` | DateTime | Érvényesség vége |
| `enabled` | boolean | Kupon aktív állapota |
| `maxUsage` | number | Maximális felhasználások száma (0 = korlátlan) |
| `usageCount` | number | Eddigi felhasználások száma |

## Kupon érvényesség

Egy kupon akkor használható, ha teljesülnek a következő feltételek:

- **enabled = true** (a kupon aktív)
- **Jelenlegi időpont** `>= validFrom`
- **Jelenlegi időpont** `<= validUntil`
- **usageCount < maxUsage** (ha maxUsage > 0)

## Használati limit

A `maxUsage` mező határozza meg, hogy egy kupon hányszor használható fel összesen:

- **maxUsage = 0**: Korlátlan felhasználás
- **maxUsage > 0**: A megadott számú felhasználás után a kupon nem használható

A `usageCount` mező automatikusan növekszik minden sikeres kuponfelhasználáskor.

## Példák

### Korlátozott időszakú akció
```json
{
  "code": "SUMMER2026",
  "discountPercent": 25,
  "validFrom": "2026-06-01T00:00:00.000Z",
  "validUntil": "2026-08-31T23:59:59.999Z",
  "maxUsage": 100
}
```
Ez a kupon 25% kedvezményt ad, csak nyáron használható, és maximum 100-szor használható fel.

### Korlátlan kedvezmény
```json
{
  "code": "EARLYBIRD",
  "discountPercent": 15,
  "validFrom": "2026-01-01T00:00:00.000Z",
  "validUntil": "2026-12-31T23:59:59.999Z",
  "maxUsage": 0
}
```
Ez a kupon 15% kedvezményt ad egész évben, korlátlan felhasználással.

## Kedvezmény számítás

A kedvezmény a csomag árának százalékában kerül levonásra:

```
Végső ár = Eredeti ár × (1 - discountPercent / 100)
```

Példa:
- Csomag ára: 7990 Ft
- Kupon: 20% kedvezmény
- Végső ár: 7990 × (1 - 20/100) = 7990 × 0.8 = **6392 Ft**
