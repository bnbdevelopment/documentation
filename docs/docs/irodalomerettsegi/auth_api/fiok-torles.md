---
sidebar_position: 10
sidebar_label: 'Fiók törlése'
---

# Felhasználói fiók törlése

Ez az endpoint lehetővé teszi a bejelentkezett felhasználók számára, hogy véglegesen töröljék saját fiókjukat. **Ez a művelet visszafordíthatatlan.**

## GDPR megfelelés

Ez a funkció a GDPR 17. cikkében foglalt **törléshez való jog** (Right to Erasure / Right to be Forgotten) megvalósítása. A felhasználók bármikor kérhetik személyes adataik törlését.

:::warning Figyelmeztetés
**Ez a művelet véglegesen törli a fiókodat és minden hozzá kapcsolódó adatot!**
:::

Törlésre kerül:
- Felhasználói fiókod
- Összes személyes adatod
- Aktivitási előzményeid
- Pontszámaid és statisztikáid
- Előfizetési információid
- Hozzászólásaid
- Reakcióid (like, dislike)

Anonimizálásra kerül, de nem törlődik teljesen:
- Posztjaid (elrejtésre kerülnek, de megmaradnak az adatbázisban a beszélgetési szálak integritása érdekében)

**Törlés előtt javasolt:**
1. [Exportáld az adataidat](/docs/irodalomerettsegi/auth_api/adat-export) biztonsági mentés céljából
2. Győződj meg róla, hogy tényleg törölni szeretnéd a fiókodat
3. Készíts képernyőképet fontos információkról

## Request

`DELETE /api/v1/auth/account`

### Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
Content-Type: application/json
```

### Body paraméterek

```json
{
    "password": string  // KÖTELEZŐ - jelszó megerősítés (8-32 karakter)
}
```

**Biztonsági ellenőrzés:**
A törléshez meg kell adnod a jelenlegi jelszavadat. Ez megakadályozza a fiók véletlen vagy illetéktelen törlését ellopott token esetén.

### Példa request

```json
{
    "password": "jelenlegiJelszavam123"
}
```

## Response

### Sikeres törlés (200 OK)

A fiók sikeresen törlésre került. A válasz üres lesz, és minden tokened (JWT és refresh token) automatikusan érvénytelenné válik.

```
200 OK
```

### Hibás jelszó (400 Bad Request)

```json
{
    "statusCode": 400,
    "message": "invalid password"
}
```

### Admin fiók törlése megtagadva (400 Bad Request)

Admin fiókok nem törölhetik magukat biztonsági okokból.

```json
{
    "statusCode": 400,
    "message": "admin accounts cannot be self-deleted"
}
```

### Érvénytelen token (400 Bad Request)

```json
{
    "statusCode": 400,
    "message": "invalid jwt token"
}
```

### Nem engedélyezett (401 Unauthorized)

Ha a token lejárt vagy hiányzik az Authorization header.

## Adatmegőrzés és visszaállítás

### Azonnali törlés
A törlés **azonnal és véglegesen** végrehajtódik. Nincs "szemétkosár" vagy 30 napos türelmi időszak.

### Nincs visszaállítás
A törölt fiókok **NEM állíthatók vissza**. Ha később újra használni szeretnéd a platformot, új fiókot kell létrehoznod.

### Bizonyos adatok megmaradnak
GDPR szerint bizonyos adatokat jogszerűen megőrizhetünk:
- Számviteli adatok (számlák) - jogszabályi kötelezettség
- Elrejtett posztok - jogos érdek (közösségi tartalom integritása)
- Biztonsági naplók - jogos érdek (visszaélések kivizsgálása)


## Gyakori kérdések

**K: Visszaállíthatom a fiókomat a törlés után?**
V: Nem. A törlés azonnali és végleges. Nincs visszaállítási lehetőség.

**K: Mi történik a posztjaimmal?**
V: A posztjaid elrejtésre kerülnek, de nem törlődnek teljesen a beszélgetési szálak integritásának megőrzése érdekében.

**K: Admin törölheti magát?**
V: Nem. Admin fiókok nem törölhetik magukat biztonsági okokból.

**K: Használhatom ugyanazt az email címet új fiók létrehozásához?**
V: Igen, a törlés után az email cím azonnal újra használható új regisztrációhoz.

**K: Megkapom az adataimat a törlés előtt?**
V: A rendszer nem küldi el automatikusan. Javasoljuk, hogy előtte használd az [adatexportálás](/docs/irodalomerettsegi/auth_api/adat-export) funkciót.

**K: Mennyibe kerül a fiók törlése?**
V: A fiók törlése teljesen ingyenes és jogod van hozzá GDPR szerint.

**K: Mi történik az előfizetésemmel?**
V: Az aktív előfizetés azonnal megszűnik. Automatikus fizetési adatok törlésre kerülnek.

## Jogszabályi háttér

Ez az endpoint a következő jogszabályoknak felel meg:
- **GDPR 17. cikk** - Törléshez való jog ("elfeledtetéshez való jog")
- **Infotv. 16. §** - Magyar adatvédelmi törvény
- **ePrivacy irányelv** - Elektronikus adatvédelem

További információ: [GDPR megfelelés](/docs/irodalomerettsegi/gdpr-megfeleloseg)
