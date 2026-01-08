---
sidebar_position: 5
sidebar_label: 'Rate limiting'
---

# Rate Limiting & Subscription Plans

Az API implementál egy feladattípus-alapú rate limiting rendszert, amely különböző limiteket alkalmaz vendég felhasználók, regisztrált felhasználók és prémium előfizetők számára.

## Felhasználói kategóriák

### Vendég felhasználók
Nem regisztrált felhasználók, akik visitor key segítségével férnek hozzá az API-hoz.

**Napi limitek feladattípusonként:**
- `table`: 10 kérés/nap
- `connect_1`: 10 kérés/nap
- `gaps`: 10 kérés/nap
- `quiz`: 5 kérés/nap
- `essay`: 1 kérés/nap
- `exam`: 1 kérés/nap

### Regisztrált felhasználók
Felhasználói fiókkal rendelkező, de nem prémium előfizetők.

**Napi limitek feladattípusonként:**
- `table`: 30 kérés/nap
- `connect_1`: 30 kérés/nap
- `gaps`: 30 kérés/nap
- `quiz`: 15 kérés/nap
- `essay`: 5 kérés/nap
- `exam`: 3 kérés/nap

### Prémium előfizetők
Aktív előfizetéssel rendelkező felhasználók.

**Korlátlan hozzáférés** minden feladattípushoz. A rate limiter automatikusan átengedi a kéréseket előfizetés ellenőrzés után.

## Visitor Key (vendég hozzáférés)

### Visitor key igénylése

**Endpoint:** `GET /api/v1/vkey`

**Request headers:**
```
cf-connecting-ip: <client-ip>
```

**Response:**
```
abc123def456...  // 40 karakteres hexadecimális string
```

**Korlátozások:**
- Egy IP címről maximum 5 visitor key igényelhető 24 órán belül
- A visitor key 10,000 másodpercig (kb. 2.77 óra) érvényes
- A key kriptográfiailag biztonságos véletlenszám-generátorral készül

**Hibakezelés:**
- `401 Unauthorized`: Az IP elérte a maximális key igénylési limitet (5/24h)

### Visitor key használata

A visitor key-t minden rate limit alá eső kéréshez csatolni kell header formájában:

```
visitorkey: abc123def456...
```

## Authentikációval rendelkező felhasználók

Regisztrált és prémium felhasználók JWT token alapján vannak azonosítva. A visitor key ezekben az esetekben **opcionális**.

**Request header:**
```
Authorization: Bearer <jwt-token>
```

A backend a következő lépésekkel dolgozza fel az authentikációt:

1. JWT token dekódolása és user ID kinyerése
2. Előfizetés státusz ellenőrzése (`SubscriptionService.validateSubscription()`)
3. Ha prémium: rate limit bypass
4. Ha nem prémium: regisztrált felhasználói limitek alkalmazása feladattípusonként

## Rate limitált endpointok

Az alábbi endpointok rate limiting alatt állnak:

| Endpoint | Feladattípus | Vendég limit | Regisztrált limit | Prémium |
|----------|--------------|--------------|-------------------|---------|
| `GET /api/v1/task?tasktype=table` | `table` | 10/nap | 30/nap | Korlátlan |
| `GET /api/v1/task?tasktype=connect_1` | `connect_1` | 10/nap | 30/nap | Korlátlan |
| `GET /api/v1/task?tasktype=gaps` | `gaps` | 10/nap | 30/nap | Korlátlan |
| `GET /api/v1/task?tasktype=quiz` | `quiz` | 5/nap | 15/nap | Korlátlan |
| `GET /api/v1/essay` | `essay` | 1/nap | 5/nap | Korlátlan |
| `POST /api/v1/exam` | `exam` | 1/nap | 3/nap | Korlátlan |

## Rate limit nélküli endpointok

Az alábbi endpointok **nem** állnak rate limiting alatt és szabadon elérhetők minden felhasználó számára:

- `GET /api/v1/flashcard` - Szókártyák lekérése
- `GET /api/v1/flashcard/number` - Szókártyák száma
- `GET /api/v1/material` - Tananyagok lekérése
- `GET /api/v1/material/topics` - Témakörök listája
- `POST /api/v1/solution` - Megoldás validálása
- `GET /api/v1/vkey` - Visitor key generálás (IP throttling érvényes)

## Hibaüzenetek

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "visitorkey is required for guest access"
}
```
Vendég felhasználó nem csatolt visitor key-t a kéréshez.

### 401 Unauthorized - Rate limit túllépve
```json
{
  "statusCode": 401,
  "message": "You have exceeded your daily limit for {taskType} exercises ({limit}/{limit}). Upgrade to premium for unlimited access or wait until tomorrow."
}
```
A felhasználó elérte a napi limitet az adott feladattípusra.

### 401 Unauthorized - Érvénytelen visitor key
```json
{
  "statusCode": 401,
  "message": "visitorkey is incorrect, please don't manually enter it"
}
```
A megadott visitor key nem létezik vagy lejárt.

### 401 Unauthorized - Érvénytelen JWT
```json
{
  "statusCode": 401,
  "message": "Failed to validate authentication token"
}
```
A JWT token hibás vagy lejárt.

## Technikai implementáció

### Redis tárolási struktúra

A rate limiting Redis (database 5) hash struktúrát használ feladattípusonként:

**Vendég felhasználók:**
```
visitor:{visitorKey}
├─ registered: <timestamp>
├─ table_count: 5
├─ connect_1_count: 3
├─ gaps_count: 2
├─ quiz_count: 1
├─ essay_count: 0
└─ exam_count: 1
```

**Regisztrált felhasználók:**
```
jwt:{userId}
├─ registered: <timestamp>
├─ table_count: 15
├─ connect_1_count: 8
├─ gaps_count: 12
├─ quiz_count: 4
├─ essay_count: 2
└─ exam_count: 1
```

**IP throttling:**
```
addresses:{ipAddress}
├─ count: 3
└─ TTL: 86400 (24 óra)
```

### Feladattípus detektálás

A `LimiterInterceptor` a következő logikával azonosítja a feladattípust:

1. Query paraméter ellenőrzése: `req.query.tasktype`
2. URL path alapú detektálás:
   - `/essay` → `essay`
   - `/exam` → `exam`
   - `/flashcard` → `flashcard` (bypass)
   - `/material` → `material` (bypass)

## Fejlesztői jegyzet

A rate limiting jelenleg **alapértelmezetten kikapcsolva** van. Az éles környezetben történő aktiváláshoz az alábbi SQL parancsot kell futtatni:

```sql
UPDATE config
SET config = jsonb_set(config, '{limiter,enabled}', 'true')
WHERE mainline = true;
```

A konfigurációs beállítások a `config` táblában találhatók JSON formátumban.