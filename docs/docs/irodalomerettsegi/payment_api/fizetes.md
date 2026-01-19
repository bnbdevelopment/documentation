---
sidebar_position: 3
sidebar_label: 'Fizetés'
---

# Fizetési folyamat

## Áttekintés
A fizetési rendszer lehetővé teszi előfizetési csomagok vásárlását külső billing rendszeren keresztül. A felhasználók kiválasztanak egy csomagot, opcionálisan alkalmaznak kupont, majd átirányításra kerülnek a fizetési oldalra.

## Fizetés létrehozása

### Request
`POST /api/v1/payment/create`

### Autentikáció
**JWT token kötelező** (`Authorization: Bearer {token}`)

### Request body
```json
{
  "packageId": "clx123abc",
  "couponCode": "SUMMER2026"
}
```

| Mező | Típus | Kötelező | Leírás |
|------|-------|----------|--------|
| `packageId` | string | Igen | Előfizetési csomag ID |
| `couponCode` | string | Nem | Kuponkód (opcionális) |

### Response
```json
{
  "paymentId": "pay_abc123xyz",
  "checkoutToken": "tok_xyz789abc",
  "amount": 6392,
  "originalAmount": 7990,
  "discountApplied": 1598,
  "validityStart": "2026-01-19T14:30:00.000Z",
  "validityEnd": "2026-06-30T23:59:59.000Z"
}
```

| Mező | Típus | Leírás |
|------|-------|--------|
| `paymentId` | string | Fizetés egyedi azonosítója |
| `checkoutToken` | string | Token a fizetési oldalra történő átirányításhoz |
| `amount` | number | Fizetendő összeg forintban (kupon után) |
| `originalAmount` | number | Eredeti ár forintban |
| `discountApplied` | number | Levont kedvezmény forintban |
| `validityStart` | string | Előfizetés kezdete (ISO 8601) |
| `validityEnd` | string | Előfizetés vége (ISO 8601) |

### Hibakódok
- **400** - Érvénytelen csomag, lejárt/érvénytelen kupon
- **401** - Hiányzó vagy érvénytelen token
- **404** - Csomag nem található
- **503** - Billing rendszer nem elérhető

## Előfizetési időszak szabály

Az előfizetés mindig **június 30-ig** tart:
- **Június 30. előtt vásárlás**: előfizetés a tárgyév június 30-ig érvényes
- **Június 30. után vásárlás**: előfizetés a következő év június 30-ig érvényes

A `validity` mező a csomagban figyelmen kívül marad, mindig a június 30-i szabály érvényesül.

## Fizetési státusz lekérdezése

### Request
`GET /api/v1/payment/status/:paymentId`

### Autentikáció
**JWT token kötelező**

### Response
```json
{
  "paymentId": "pay_abc123xyz",
  "status": "succeeded",
  "amount": 6392,
  "originalAmount": 7990,
  "packageId": "clx123abc",
  "validityStart": "2026-01-19T14:30:00.000Z",
  "validityEnd": "2026-06-30T23:59:59.000Z",
  "createdAt": "2026-01-19T14:30:00.000Z",
  "processedAt": "2026-01-19T14:32:15.000Z"
}
```

### Státusz értékek
- **pending**: Fizetés folyamatban
- **succeeded**: Sikeres fizetés, előfizetés aktiválva
- **failed**: Sikertelen fizetés

## Webhook

### Request
`POST /api/v1/payment/webhook`

### Autentikáció
**HMAC-SHA256 aláírás** (X-Webhook-Signature header)

### Request body
```json
{
  "eventId": "evt_abc123",
  "eventType": "payment.succeeded",
  "paymentId": "pay_abc123xyz",
  "status": "succeeded",
  "userId": "usr_123",
  "amount": 6392,
  "timestamp": "2026-01-19T14:32:15.000Z"
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
3. **Sikeres fizetés** (`payment.succeeded`):
   - Előfizetés aktiválása
   - Kupon használat növelése
   - Email értesítés (tervezett)
4. **Sikertelen fizetés** (`payment.failed`):
   - Státusz frissítése
   - Naplózás

## Biztonsági intézkedések

- **Webhook aláírás**: HMAC-SHA256 validáció minden webhook hívásnál
- **Idempotencia**: `eventId` alapú duplikáció védelem
- **Tranzakciós integritás**: Atomic database műveletek előfizetés aktiváláskor
- **JWT védelem**: Minden felhasználói endpoint autentikált
- **Titkos kulcsok**: Billing kommunikáció teljes mértékben szerver oldalon

## Környezeti változók

```env
BILLING_API_URL=https://billing.example.com
BILLING_APP_NAME=erettsegi-site
BILLING_APP_SECRET=your-app-secret
BILLING_WEBHOOK_SECRET=your-webhook-secret
```
