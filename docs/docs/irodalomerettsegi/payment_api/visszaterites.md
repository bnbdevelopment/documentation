---
sidebar_position: 4
sidebar_label: 'Visszatérítés'
---

# Visszatérítési folyamat

## Áttekintés
A visszatérítési rendszer lehetővé teszi adminisztrátorok számára sikeres fizetések visszatérítését külső billing rendszeren keresztül. Visszatérítés esetén a felhasználó előfizetése azonnal deaktiválásra kerül.

## Visszatérítés létrehozása

### Request
`POST /api/v2/refund/create`

### Autentikáció
**JWT token kötelező** (`Authorization: Bearer {token}`)
**Admin jogosultság szükséges**

### Request body
```json
{
  "paymentId": "pay_abc123xyz",
  "reason": "Ügyfél kérte a visszatérítést technikai problémák miatt"
}
```

| Mező | Típus | Kötelező | Leírás |
|------|-------|----------|--------|
| `paymentId` | string | Igen | Billing fizetési azonosító (billingPaymentId) |
| `reason` | string | Igen | Visszatérítés indoka (kötelező mező) |

### Response
```json
{
  "refundId": "ref_xyz789abc",
  "paymentId": "pay_abc123xyz",
  "billingRefundId": "rfnd_billing123",
  "amount": 6392,
  "reason": "Ügyfél kérte a visszatérítést technikai problémák miatt",
  "status": "pending",
  "refundToken": "tok_refund123",
  "expiresAt": "2026-01-19T15:30:00.000Z",
  "createdAt": "2026-01-19T14:30:00.000Z"
}
```

| Mező | Típus | Leírás |
|------|-------|--------|
| `refundId` | string | Helyi visszatérítés azonosító |
| `paymentId` | string | Eredeti fizetés azonosítója |
| `billingRefundId` | string | Billing rendszerben létrehozott visszatérítés ID |
| `amount` | number | Visszatérítendő összeg forintban |
| `reason` | string | Visszatérítés indoka |
| `status` | string | Visszatérítés státusza (`created`, `pending`, `succeeded`, `failed`) |
| `refundToken` | string | Megerősítési token (opcionális) |
| `expiresAt` | string | Token lejárat (ISO 8601) |
| `createdAt` | string | Visszatérítés létrehozási időpontja |

### Hibakódok
- **400** - Érvénytelen fizetés (még nem sikeres, vagy már visszatérített)
- **401** - Hiányzó vagy érvénytelen token
- **403** - Nem admin felhasználó
- **404** - Fizetés nem található
- **503** - Billing rendszer nem elérhető

## Automatikus megerősítés

A visszatérítés automatikusan megerősítésre kerül a létrehozás után:
1. **Létrehozás**: Visszatérítési szándék rögzítése a billing rendszerben
2. **Auto-megerősítés**: Rendszer azonnal megerősíti a visszatérítést
3. **Feldolgozás**: Billing rendszer feldolgozza a visszatérítést
4. **Webhook**: Végleges státusz frissítés webhook-on keresztül

## Visszatérítési státusz lekérdezése

### Request
`GET /api/v2/refund/status/:refundId`

### Autentikáció
**JWT token kötelező**
**Admin jogosultság szükséges**

### Response
```json
{
  "refundId": "ref_xyz789abc",
  "paymentRecordId": "clx123abc",
  "billingRefundId": "rfnd_billing123",
  "billingPaymentId": "pay_abc123xyz",
  "userId": "usr_123",
  "amount": 6392,
  "reason": "Ügyfél kérte a visszatérítést",
  "status": "succeeded",
  "refundToken": null,
  "expiresAt": null,
  "initiatedBy": "admin_456",
  "createdAt": "2026-01-19T14:30:00.000Z",
  "updatedAt": "2026-01-19T14:35:00.000Z",
  "processedAt": "2026-01-19T14:35:00.000Z"
}
```

### Státusz értékek
- **created**: Visszatérítési szándék létrehozva, megerősítésre vár
- **pending**: Visszatérítés megerősítve, feldolgozás alatt a billing rendszerben
- **succeeded**: Sikeres visszatérítés, előfizetés deaktiválva
- **failed**: Sikertelen visszatérítés

## Visszatérítések listázása

### Request
`GET /api/v2/refund/list`

### Autentikáció
**JWT token kötelező**
**Admin jogosultság szükséses**

### Query paraméterek
| Paraméter | Típus | Alapértelmezett | Leírás |
|-----------|-------|----------------|--------|
| `skip` | number | 0 | Kihagyandó elemek száma (lapozás) |
| `take` | number | 50 | Visszaadandó elemek maximális száma |
| `status` | string | - | Szűrés státusz alapján (opcionális) |

### Példa request
`GET /api/v2/refund/list?skip=0&take=20&status=succeeded`

### Response
```json
{
  "refunds": [
    {
      "refundId": "ref_xyz789abc",
      "paymentRecordId": "clx123abc",
      "billingRefundId": "rfnd_billing123",
      "billingPaymentId": "pay_abc123xyz",
      "userId": "usr_123",
      "amount": 6392,
      "reason": "Ügyfél kérte a visszatérítést",
      "status": "succeeded",
      "initiatedBy": "admin_456",
      "createdAt": "2026-01-19T14:30:00.000Z",
      "processedAt": "2026-01-19T14:35:00.000Z"
    }
  ],
  "total": 142
}
```

## Visszatérítés lekérdezése fizetés alapján

### Request
`GET /api/v2/refund/payment/:paymentId`

### Autentikáció
**JWT token kötelező**
**Admin jogosultság szükséges**

### Response
Visszaadja a fizetéshez tartozó visszatérítést, vagy `null` ha nincs visszatérítés.

```json
{
  "refundId": "ref_xyz789abc",
  "paymentRecordId": "clx123abc",
  "billingRefundId": "rfnd_billing123",
  "billingPaymentId": "pay_abc123xyz",
  "userId": "usr_123",
  "amount": 6392,
  "reason": "Ügyfél kérte a visszatérítést",
  "status": "succeeded",
  "initiatedBy": "admin_456",
  "createdAt": "2026-01-19T14:30:00.000Z",
  "processedAt": "2026-01-19T14:35:00.000Z"
}
```

## Webhook

### Request
`POST /api/v2/refund/webhook`

### Autentikáció
**HMAC-SHA256 aláírás** (X-Webhook-Signature header)

### Request body
```json
{
  "eventId": "evt_rfnd123",
  "eventType": "refund.succeeded",
  "refundId": "rfnd_billing123",
  "paymentId": "pay_abc123xyz",
  "status": "succeeded",
  "userId": "usr_123",
  "amount": 6392,
  "timestamp": "2026-01-19T14:35:00.000Z"
}
```

### Response
```json
{
  "success": true
}
```

### Webhook feldolgozás
1. **Aláírás ellenőrzés**: HMAC-SHA256 validáció timing-safe összehasonlítással
2. **Idempotencia**: `eventId` alapján duplikált események kiszűrése
3. **Sikeres visszatérítés** (`refund.succeeded`):
   - Visszatérítés státusz frissítése `succeeded`-re
   - Előfizetés azonnali deaktiválása (subscriptionId: "null", endDate: "1990-01-01")
   - Email értesítés (tervezett)
4. **Sikertelen visszatérítés** (`refund.failed`):
   - Státusz frissítése `failed`-re
   - Naplózás

## Előfizetés deaktiválás

Sikeres visszatérítés esetén a felhasználó előfizetése azonnal deaktiválásra kerül:
```json
{
  "subscriptions": {
    "startDate": "1990-01-01T00:00:00.000Z",
    "endDate": "1990-01-01T00:00:00.000Z",
    "subscriptionId": "null"
  }
}
```

Ez azonnal érvényteleníti a felhasználó hozzáférését a prémium funkciókhoz.

## Visszatérítési szabályok

- **Csak sikeres fizetések** téríthetők vissza (`status: 'succeeded'`)
- **Egy fizetés csak egyszer** térítelhető vissza
- **Azonnali deaktiválás**: Sikeres visszatérítéskor azonnal megszűnik az előfizetés
- **Admin-only**: Csak admin felhasználók kezdeményezhetnek visszatérítést
- **Indok kötelező**: Minden visszatérítéshez kötelező indoklás

## Biztonsági intézkedések

- **Admin jogosultság**: Minden endpoint admin ellenőrzéssel védett
- **Webhook aláírás**: HMAC-SHA256 validáció minden webhook hívásnál
- **Idempotencia**: `eventId` alapú duplikáció védelem
- **Tranzakciós integritás**: Atomic database műveletek előfizetés deaktiválásakor
- **JWT védelem**: Admin token autentikáció minden endpointon
- **Audit trail**: Visszatérítést kezdeményező admin rögzítése (`initiatedBy`)

