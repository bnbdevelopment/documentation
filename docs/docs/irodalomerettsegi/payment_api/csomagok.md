---
sidebar_position: 1
sidebar_label: 'Előfizetési csomagok'
---

# Előfizetési csomagok

## Áttekintés
Az előfizetési csomagok rendszer lehetővé teszi különböző előfizetési ajánlatok kezelését és lekérését. A csomagok prioritás szerint rendezve jelennek meg, és opcionálisan ütemezhetők meghatározott időszakra.

## Csomagok lekérése

### Request
`GET /api/v1/payment/packages`

### Autentikáció
Nem szükséges.

### Response
A válasz tartalmazza az aktív, jelenleg elérhető csomagokat prioritás szerint csökkenő sorrendben.

```json
[
  {
    "id": "clx123abc",
    "name": "Alapcsomag",
    "description": "Hozzáférés az alapvető funkciókhoz",
    "validity": 30,
    "price": 2990,
    "isFeatured": false,
    "isDiscounted": false,
    "validFrom": null,
    "validUntil": null
  },
  {
    "id": "clx456def",
    "name": "Prémium csomag",
    "description": "Teljes hozzáférés minden funkcióhoz",
    "validity": 90,
    "price": 7990,
    "isFeatured": true,
    "isDiscounted": true,
    "validFrom": "2026-01-01T00:00:00.000Z",
    "validUntil": "2026-03-31T23:59:59.999Z"
  }
]
```

## Csomag struktúra

| Mező | Típus | Leírás |
|------|-------|--------|
| `id` | string | Egyedi azonosító |
| `name` | string | Csomag neve |
| `description` | string \| null | Csomag leírása |
| `validity` | number | Érvényesség napokban |
| `price` | number | Ár forintban (HUF) |
| `isFeatured` | boolean | Kiemelt csomag jelölés |
| `isDiscounted` | boolean | Kedvezményes ár jelölés |
| `validFrom` | string \| null | Csomag elérhetőségének kezdete (ISO 8601) |
| `validUntil` | string \| null | Csomag elérhetőségének vége (ISO 8601) |

## Ütemezés logika

A csomagok csak akkor jelennek meg az API válaszban, ha teljesülnek a következő feltételek:

- **enabled = true** (a csomag aktív)
- **validFrom**: Ha meg van adva, a jelenlegi időpontnak `>= validFrom` kell lennie
- **validUntil**: Ha meg van adva, a jelenlegi időpontnak `<= validUntil` kell lennie

Ha a `validFrom` és `validUntil` mezők `null` értékűek, a csomag folyamatosan elérhető (amíg enabled = true).

### Példák

- Csomag `validFrom: 2026-02-01`, `validUntil: 2026-03-01` → csak februárban látható
- Csomag `validFrom: null`, `validUntil: null` → mindig látható (ha enabled)
- Csomag `validFrom: 2026-01-01`, `validUntil: null` → 2026. január 1-től mindig látható

## Rendezés

A csomagok a `priority` mező szerint csökkenő sorrendben jelennek meg. Magasabb prioritású csomagok előrébb kerülnek a listában.
