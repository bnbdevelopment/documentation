---
sidebar_position: 1
sidebar_label: 'Tananyagok lekérdezése'
---

# Tananyagok lekérdezése egy adott témakörhöz
## Endpoint

`GET /api/v1/material?t=biblia`

## Description

Lekérdezi az adott témakörhöz tartozó tananyagokat. A témakör nevét a `t` query paraméterben kell megadni. A témakör neve megegyezik a `/api/v1/material/topics` endpointon visszakapott témakörök egyikének nevével.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| t | string | A témakör neve |

## Response

### 200 OK
