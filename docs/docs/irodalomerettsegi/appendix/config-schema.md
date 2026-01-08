---
sidebar_position: 5
sidebar_label: 'Konfiguráció'
---

# Configuration Schema

A rendszer konfigurációja a `config` Prisma táblában található, JSON formátumban. A `mainline: true` jelöléssel rendelkező rekord az aktív konfiguráció.

## Konfiguráció struktúra

```typescript
interface Config {
  limiter: LimiterConfig;
  ads: AdsConfig;
  history: HistoryConfig;
}
```

## Rate Limiter konfiguráció

### Schema

```typescript
interface LimiterConfig {
  enabled: boolean;
  ipHeaderKey: string;
  ipRegister: number;
  limits: {
    guest: TaskLimits;
    registered: TaskLimits;
  };
}

interface TaskLimits {
  table: number;
  connect_1: number;
  gaps: number;
  quiz: number;
  essay: number;
  exam: number;
}
```

### Alapértelmezett értékek

```json
{
  "limiter": {
    "enabled": false,
    "ipHeaderKey": "cf-connecting-ip",
    "ipRegister": 5,
    "limits": {
      "guest": {
        "table": 10,
        "connect_1": 10,
        "gaps": 10,
        "quiz": 5,
        "essay": 1,
        "exam": 1
      },
      "registered": {
        "table": 30,
        "connect_1": 30,
        "gaps": 30,
        "quiz": 15,
        "essay": 5,
        "exam": 3
      }
    }
  }
}
```

### Mezők leírása

#### `enabled`
- **Típus:** `boolean`
- **Alapértelmezett:** `false`
- **Leírás:** Rate limiting funkció aktiválása. `false` esetén minden rate limit bypass-olva van.

#### `ipHeaderKey`
- **Típus:** `string`
- **Alapértelmezett:** `"cf-connecting-ip"`
- **Leírás:** A HTTP header neve, amelyből a kliens IP címe kinyerhető. Cloudflare használata esetén `cf-connecting-ip` ajánlott.

#### `ipRegister`
- **Típus:** `number`
- **Alapértelmezett:** `5`
- **Leírás:** Egy IP címről legfeljebb ennyi visitor key igényelhető 24 órán belül. Visszaélések megelőzésére szolgál.

#### `limits.guest`
- **Típus:** `TaskLimits`
- **Leírás:** Vendég felhasználók (visitor key) napi limitjei feladattípusonként.

#### `limits.registered`
- **Típus:** `TaskLimits`
- **Leírás:** Regisztrált, nem prémium felhasználók napi limitjei feladattípusonként.

### Feladattípus limitek

| Feladattípus | Vendég | Regisztrált | Leírás |
|--------------|--------|-------------|---------|
| `table` | 10 | 30 | Táblázat kitöltős feladatok |
| `connect_1` | 10 | 30 | Egyszerű párosítás (1:1) |
| `gaps` | 10 | 30 | Hiányos szöveg kiegészítés |
| `quiz` | 5 | 15 | Kvíz feladatok |
| `essay` | 1 | 5 | Esszé témák |
| `exam` | 1 | 3 | Érettségi feladatsorok |

**Megjegyzés:** Prémium felhasználókra nem vonatkoznak limitek, korlátlanul használhatnak minden feladattípust.

## Ads konfiguráció

### Schema

```typescript
interface AdsConfig {
  enabled: boolean;
}
```

### Alapértelmezett értékek

```json
{
  "ads": {
    "enabled": false
  }
}
```

### Mezők leírása

#### `enabled`
- **Típus:** `boolean`
- **Alapértelmezett:** `false`
- **Leírás:** Reklám megjelenítés aktiválása. `false` esetén senki nem lát reklámokat. `true` esetén csak a nem prémium felhasználók látnak reklámokat.

## History konfiguráció

### Schema

```typescript
interface HistoryConfig {
  enabled: boolean;
}
```

### Alapértelmezett értékek

```json
{
  "history": {
    "enabled": false
  }
}
```

### Mezők leírása

#### `enabled`
- **Típus:** `boolean`
- **Alapértelmezett:** `false`
- **Leírás:** Felhasználói előzmények követésének aktiválása.

## Konfiguráció módosítása

### SQL parancsok

#### Rate limiting bekapcsolása

```sql
UPDATE config
SET config = jsonb_set(config, '{limiter,enabled}', 'true')
WHERE mainline = true;
```

#### Guest table limit módosítása

```sql
UPDATE config
SET config = jsonb_set(config, '{limiter,limits,guest,table}', '20')
WHERE mainline = true;
```

#### Reklámok bekapcsolása

```sql
UPDATE config
SET config = jsonb_set(config, '{ads,enabled}', 'true')
WHERE mainline = true;
```

#### IP regisztrációs limit növelése

```sql
UPDATE config
SET config = jsonb_set(config, '{limiter,ipRegister}', '10')
WHERE mainline = true;
```

### Prisma lekérdezés

```typescript
const config = await prisma.config.findFirst({
  where: { mainline: true }
});

console.log(config.config.limiter.enabled);
```

### Konfiguráció frissítése kódból

```typescript
import { PrismaService } from './prisma.service';

const updatedConfig = {
  ...existingConfig.config,
  limiter: {
    ...existingConfig.config.limiter,
    enabled: true
  }
};

await prisma.config.update({
  where: { mainline: true },
  data: { config: updatedConfig }
});
```

## Migráció régi konfigurációról

Ha egy régebbi konfigurációs struktúra van élesben (flat `unregistered` és `registered` limitekkel), a `ConfigService` automatikusan létrehoz egy új, alapértelmezett konfigurációt, ha nem talál `mainline: true` rekordot.

### Régi struktúra (deprecated)

```json
{
  "limiter": {
    "enabled": false,
    "unregistered": 10,
    "registered": 100,
    "ipHeaderKey": "cf-connecting-ip",
    "ipRegister": 5
  }
}
```

### Új struktúra

A fenti régi struktúra helyett a feladattípus-alapú limiteket kell használni. Régi konfiguráció esetén ajánlott a teljes `config` mező cseréje az új struktúrára.

```sql
UPDATE config
SET config = '{
  "limiter": {
    "enabled": false,
    "ipHeaderKey": "cf-connecting-ip",
    "ipRegister": 5,
    "limits": {
      "guest": {
        "table": 10,
        "connect_1": 10,
        "gaps": 10,
        "quiz": 5,
        "essay": 1,
        "exam": 1
      },
      "registered": {
        "table": 30,
        "connect_1": 30,
        "gaps": 30,
        "quiz": 15,
        "essay": 5,
        "exam": 3
      }
    }
  },
  "ads": {
    "enabled": false
  },
  "history": {
    "enabled": false
  }
}'::jsonb
WHERE mainline = true;
```

## Konfiguráció ellenőrzése

### Backend logban

A `ConfigService` inicializáláskor logol, ha nem talál konfigurációt:

```
[ConfigService] Config not found, generating with default values...
```

### Manuális ellenőrzés

```sql
SELECT * FROM config WHERE mainline = true;
```

### API endpoint (jövőbeli)

Jelenleg nincs dedikált konfiguráció lekérdező endpoint. Admin API-n keresztül lehetséges hozzáférés.

## Kapcsolódó dokumentáció

- [Rate Limiting](/docs/irodalomerettsegi/auth_api/rate-limiting) - Rate limiting működése és használata
- [Előfizetés](/docs/irodalomerettsegi/auth_api/elofizetes) - Előfizetési rendszer és prémium státusz
