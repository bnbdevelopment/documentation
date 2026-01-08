---
sidebar_position: 6
sidebar_label: 'Előfizetés'
---

# Subscription Management

Az előfizetési rendszer lehetővé teszi prémium funkciók aktiválását regisztrált felhasználók számára. Az előfizetők korlátlan hozzáférést kapnak minden feladattípushoz és reklámmentesen használhatják a platformot.

## Előfizetési státusz

### Felhasználói típusok

**Vendég felhasználó**
- Nincs regisztrált fiók
- Visitor key alapú hozzáférés
- Rate limit: alacsony (lásd: [Rate Limiting](/docs/irodalomerettsegi/auth_api/rate-limiting))

**Regisztrált felhasználó (nem előfizető)**
- Regisztrált fiókkal rendelkezik
- JWT token alapú authentikáció
- Rate limit: közepes
- Reklámok megjelennek

**Prémium előfizető**
- Aktív előfizetéssel rendelkezik
- JWT token alapú authentikáció
- Rate limit: **korlátlan**
- Reklámok **nem** jelennek meg

**Admin felhasználó**
- Automatikusan prémium státusz
- Teljes hozzáférés minden funkcióhoz


## Prémium funkciók

### Rate Limiting Bypass

Prémium felhasználók automatikusan megkerülik a rate limiteket:

**Implementáció:** `LimiterService.validate()`

```typescript
const isPremium = await this.subscriptionService.validateSubscription(userId);

if (isPremium) {
  return true;  // Bypass rate limit
}
```

Az összes endpoint korlátlan hozzáféréssel használható prémium státusz mellett.

### Reklámmentesség

Prémium felhasználók nem látnak reklámokat.

**Endpoint:** `GET /api/v1/ad/should-show`

**Request header:**
```
Authorization: Bearer <jwt-token>
```

**Response (nem prémium):**
```json
{
  "shouldShow": true
}
```

**Response (prémium):**
```json
{
  "shouldShow": false
}
```

## Előfizetés lekérdezése

A felhasználó előfizetési státusza a login és token refresh során kerül visszaadásra:

### Login response

```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "def502...",
  "user": {
    "id": "ckx123...",
    "username": "johndoe",
    "email": "john@example.com",
    "isPremium": true,          // Előfizetés státusz
    "subscriptions": {
      "subscriptionId": "premium",
      "startDate": "2025-01-01T00:00:00.000Z",
      "endDate": "2025-12-31T23:59:59.999Z"
    }
  }
}
```

### Token refresh response

```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "ckx123...",
    "isPremium": true
  }
}
```

## Előfizetés kezelés (Admin)

Az előfizetések kezelése admin jogosultsággal történik.

### Előfizetés módosítása

**Endpoint:** `PUT /api/v2/admin/user?id={userId}`

**Request header:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request body:**
```json
{
  "subscriptions": {
    "subscriptionId": "premium",
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": "2025-12-31T23:59:59.999Z"
  }
}
```

**Response:**
```json
{
  "message": "User updated successfully"
}
```

**Hibakezelés:**
- `401 Unauthorized`: Nem admin felhasználó
- `404 Not Found`: Felhasználó nem található
- `400 Bad Request`: Hibás dátum formátum

### Előfizetés törlése

Az előfizetés törléséhez az alapértelmezett értéket kell beállítani:

```json
{
  "subscriptions": {
    "subscriptionId": "null",
    "startDate": "1990-01-01T00:00:00.000Z",
    "endDate": "1990-01-01T00:00:00.000Z"
  }
}
```

## Előfizetési típusok

A `subscriptionId` mező jelenleg string alapú azonosító, nem korlátozva enum típusra. Lehetséges értékek:

- `"premium"` - Prémium előfizetés
- `"basic"` - Alap előfizetés (jelenleg nem használt)
- `"null"` - Nincs előfizetés

Az előfizetési típusok bővíthetők további azonosítók hozzáadásával. A validálás kizárólag dátum alapú, a `subscriptionId` jelenleg informatív jellegű.

## Technikai megjegyzések

### Dátum formátum

Minden dátum **ISO 8601** formátumban tárolódik:
```
YYYY-MM-DDTHH:MM:SS.sssZ
```

Például: `2025-01-15T14:30:00.000Z`

### Időzóna

Minden dátum **UTC** időzónában van tárolva. A frontend számára szükséges lehet lokális időzónára konvertálás.

### Előfizetés lejárata

Az előfizetés automatikusan lejár, amikor `currentDate > endDate`. Nincs automatikus értesítési mechanizmus implementálva.

### Admin előfizetés bypass

Admin felhasználók előfizetési dátumtól függetlenül mindig prémium státuszt kapnak:

```typescript
if (user.isAdmin) return true;
```

Ez a logika a `SubscriptionService.validateSubscription()` metódusban található.

## Példakód integráció

### Frontend előfizetés státusz ellenőrzés

```typescript
interface User {
  isPremium: boolean;
  subscriptions: SubscriptionDTO;
}

const user: User = await authService.getCurrentUser();

if (user.isPremium) {
  showPremiumBadge();
  hideAds();
} else {
  showUpgradePrompt();
}
```


## Kapcsolódó dokumentáció

- [Rate Limiting](/docs/irodalomerettsegi/auth_api/rate-limiting) - Rate limiting és előfizetési limitek
- [Bejelentkezés](/docs/irodalomerettsegi/auth_api/bejelentkezes) - Authentikáció és user objektum
- [Token frissítés](/docs/irodalomerettsegi/auth_api/token-frissites) - JWT token kezelés
