---
sidebar_position: 5
sidebar_label: 'Rate limiting'
---

# Rate-limiting

A API requestek nagy részén rate limit van. Minden felhasználó kap egy egyedi tokent, amit a `GET /api/v1/vkey` endpointon kaphat meg. Egy adott IPhez maximum 5 darab tokent lehet igényelni. A token 24 óráig él, utána újra kell igényelni.

Ezek után minden requestben meg kell jelennie az alábbi headernek: `visitorkey: KEY_VALUE`. Amennyiben a felhasználó be van jelentkezve, a jwt tokent kell csatolni a fentebb leírt módszerrel. Bejelentkezett felhasználók számára lényegtelen a `visitorkey`, ők a jwt tokenjük alapján vannak azonosítva.

Jelenleg az alábbi oldalak vannak limitálva:
- `/api/v1/task`
- `/api/v1/flashcard` 