---
sidebar_position: 7
sidebar_label: 'Email újraküldése'
---

# Email megerősítés újraküldése

Bejelentkezett felhasználók újra kérhetik a megerősítő emailt, amennyiben az még nem lett megerősítve.

## Request
`POST /api/v1/auth/resend-verification`

### Headers
- `Authorization: Bearer {accessToken}` - Bejelentkezést igazoló JWT token (kötelező)

### Response
Sikeres küldés esetén:
```json
{
    "message": "verification email sent successfully"
}
```

Hiba esetén:
- **400 Bad Request**
  - `"invalid jwt token"` - Érvénytelen vagy lejárt token
  - `"user not found"` - Felhasználó nem található
  - `"email is already verified"` - Az email cím már meg van erősítve
  - `"rate limit exceeded - maximum 5 verification emails per 24 hours"` - Túllépte a maximális küldési limitet

- **401 Unauthorized** - Hiányzó vagy érvénytelen authentikáció

## Rate limiting

A visszaélések megelőzése érdekében egy felhasználó **maximum 5 megerősítő emailt** kérhet 24 óra alatt. Ez a limit felhasználónként van tárolva Redis-ben, és 24 óra után automatikusan resetelődik.

## Megjegyzések

- A felhasználó csak a saját email címére kérheti újra a megerősítő levelet
- Csak olyan felhasználók kérhetik, akiknek az `emailVerified` státusza `false`
- Az új verification link 24 óráig érvényes
- A korábbi verification linkek érvényesek maradnak a lejáratukig
- A rate limit számlálója Redis-ben van tárolva (`emailVerification:resend:{userId}`)
