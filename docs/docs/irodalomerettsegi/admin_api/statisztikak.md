---
sidebar_position: 1
sidebar_label: 'Statisztikák'
---

# Statisztikák kérése

Az Admin API adminisztratív feladatokért felel, mint például felhasználók kezelése, vagy a tananyag megváltoztatása.

## Request
`GET /api/v2/admin/stats`

## Response
```json
{
    "users": 2,
    "admins": 2,
    "tasks": 91,
    "reviews": 12,
    "material": {
        "biblia": 41,
        // ... 
        "stilusiranyzat": 7
    },
    "currentConfig": {}
}
``` 