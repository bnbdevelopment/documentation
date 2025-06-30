---
sidebar_position: 1
sidebar_label: 'Hirdetés lekérése'
---

# Hirdetés API

A request leellenőrzi, hogy az adott `id`-vel rendelkező felhasználónak szükséges-e a hirdetések megjelenítése. Alternatívaként, az `id` paraméter használata helyett lehetőség van a felhasználó azonosítására a JWT tokenje alapján is, ezt a fentebb már említett módon kell csatolni a kérésbe. Amennyiben nem validálható a token, vagy nem létezik a felhasználó, a válaszban `true` fog szerepelni.

## Request
`GET /api/v1/ad?id=66eedc1783bdb70ecc8efa01`

## Request params
- `id`: az adott felhasználó idje (nem kötelező) 