---
sidebar_position: 20
sidebar_label: 'GDPR Megfelelőség'
---

# GDPR Megfelelőség és Adatvédelem

Az Irodalomerettsegi.hu platform teljes mértékben megfelel az Európai Unió **Általános Adatvédelmi Rendeletének** (GDPR - General Data Protection Regulation, 2016/679 rendelet) és a magyar **Infotörvénynek** (2011. évi CXII. törvény).

## Elkötelezettségünk

A felhasználók adatainak védelme számunkra kiemelt prioritás. Biztosítjuk minden GDPR által garantált jog gyakorlását, átlátható adatkezelést végzünk, és modern biztonsági megoldásokat alkalmazunk.

## Jogaik a GDPR szerint

Az Európai Unió GDPR rendelete számos jogot biztosít a felhasználók számára személyes adataik kezelésével kapcsolatban. Platformunkon ezek a jogok teljes mértékben gyakorolhatók.

### 1. Tájékoztatáshoz való jog (13-14. cikk)

**Mit jelent ez?**
Joga van tudni, hogy milyen adatokat kezelünk Önről, miért és meddig.

**Hogyan biztosítjuk?**
- Részletes Adatkezelési Tájékoztató a honlapunkon
- Átlátható dokumentáció a fejlesztői API-ban
- Egyértelmű kommunikáció minden adatgyűjtési ponton

**Amit tárolunk Önről:**
- **Profil adatok**: felhasználónév, email cím
- **Aktivitási adatok**: pontszámok, tanulási statisztikák, előzmények
- **Előfizetési adatok**: előfizetés típusa, időtartama
- **Felhasználó által generált tartalom**: posztok, hozzászólások, reakciók
- **Technikai adatok**: IP cím (naplózás céljából), böngésző információk

**Amit NEM tárolunk:**
- Jelszavakat egyszerű szövegként
- Bankkártya adatokat (a fizetési szolgáltató kezeli)
- Érzékeny különleges adatokat (faji, vallási, egészségügyi, stb.)

### 2. Hozzáférési jog (15. cikk)

**Mit jelent ez?**
Joga van hozzáférni az Önről tárolt személyes adatokhoz.

**Hogyan gyakorolhatja?**

#### API endpoint
```
GET /api/v1/auth/get
```
Lekérheti a profil adataidat.

**Dokumentáció:** [Felhasználó adatok](/docs/irodalomerettsegi/auth_api/felhasznalo-adatok)

### 3. Adathordozhatósághoz való jog (20. cikk)

**Mit jelent ez?**
Joga van megkapni az Önről tárolt adatokat strukturált, széles körben használt, géppel olvasható formátumban (JSON).

**Hogyan gyakorolhatja?**

#### API endpoint
```
GET /api/v1/auth/export
```

**Mit kapsz?**
- Teljes profil adatok
- Összes aktivitási előzmény
- Pontszámok és statisztikák
- Előfizetési információk
- Ön által létrehozott tartalmak (posztok, hozzászólások, reakciók)

**Formátum:** JSON (géppel olvasható, könnyen feldolgozható)

**Dokumentáció:** [Adatexportálás](/docs/irodalomerettsegi/auth_api/adat-export)

### 4. Helyesbítéshez való jog (16. cikk)

**Mit jelent ez?**
Joga van kijavítani az Önről tárolt helytelen vagy hiányos adatokat.

**Hogyan gyakorolhatja?**

#### API endpoint
```
PUT /api/v1/auth/profile
```

**Mit módosíthatsz?**
- Felhasználónév
- Email cím

**Megjegyzés:** Email cím módosítása esetén újra meg kell erősíteni az új címet.

**Dokumentáció:** [Profil módosítása](/docs/irodalomerettsegi/auth_api/profil-modositas)

### 5. Törléshez való jog - "Elfeledtetéshez való jog" (17. cikk)

**Mit jelent ez?**
Joga van kérni az Önről tárolt személyes adatok törlését.

**Hogyan gyakorolhatja?**

#### API endpoint
```
DELETE /api/v1/auth/account
```

:::warning Figyelem!
Ez a művelet véglegesen törli a felhasználói fiókot és minden hozzá tartozó adatot. Nem visszavonható!
:::

**Mit törlünk?**
- Felhasználói fiók
- Összes személyes adat
- Aktivitási előzmények
- Pontszámok
- Hozzászólások
- Reakciók

**Mit őrzünk meg?**
- A felhasználó által létrehozott posztokat elrejtjük (nem töröljük teljesen) a beszélgetési szálak integritása érdekében
- Számviteli dokumentumok (jogszabályi kötelezettség)

**Dokumentáció:** [Fiók törlése](/docs/irodalomerettsegi/auth_api/fiok-torles)

### 6. Az adatkezelés korlátozásához való jog (18. cikk)

**Mit jelent ez?**
Bizonyos esetekben kérheti, hogy korlátozzuk az adatai kezelését.

**Hogyan gyakorolhatja?**
Lépjen kapcsolatba velünk az alábbi elérhetőségeken:
- Email: contact@irodalomerettsegi.hu
- Honlap: [Kapcsolat](https://bnbdevelopment.hu/hu/contact)

### 7. Tiltakozáshoz való jog (21. cikk)

**Mit jelent ez?**
Tiltakozhat az adatai kezelése ellen bizonyos esetekben (például közvetlen üzletszerzés).

**Hogyan gyakorolhatja?**
- Leiratkozhat a hírlevelekről az emailben található linkkel
- Letilthatja a nem kötelező cookie-kat
- Kapcsolatba léphet velünk: contact@irodalomerettsegi.hu

### 8. Automatizált döntéshozatal elleni tiltakozás joga (22. cikk)

**Átláthatóság:**
A platformunkon **NEM alkalmazunk** automatizált döntéshozatalt vagy profilalkotást, amely jelentős jogi hatással lenne Önre.

## Adatkezelés jogalapja

A GDPR 6. cikke alapján az adatkezelésnek jogalapja kell legyen. Az alábbi jogalapokat alkalmazzuk:

### 1. Hozzájárulás (6. cikk (1) a) pont)
- Regisztráció során elfogadja az Adatkezelési Tájékoztatót
- Cookie-k használata (nem kötelező cookie-k esetén)
- Marketing kommunikáció (hírlevél)

**Visszavonás:** Bármikor visszavonhatja a hozzájárulását.

### 2. Szerződés teljesítése (6. cikk (1) b) pont)
- Szolgáltatás nyújtása (platform használat)
- Előfizetés kezelése
- Felhasználói fiók működtetése

### 3. Jogi kötelezettség teljesítése (6. cikk (1) c) pont)
- Számviteli bizonylatok megőrzése (8 év)
- Adóügyi dokumentumok tárolása

### 4. Jogos érdek (6. cikk (1) f) pont)
- Biztonsági naplózás (visszaélések kivizsgálása)
- Rendszer stabilitásának biztosítása
- Posztok megőrzése törlés után (közösségi tartalom integritása)

## Adatbiztonság

### Technikai intézkedések

**Jelszavak védelme:**
- Argon2 hash algoritmus (ipari szabvány)
- Egyedi salt minden jelszóhoz
- Jelszavak soha nem tárolódnak egyszerű szövegként

**Adatbázis biztonság:**
- Titkosított kapcsolat (SSL/TLS)
- Szerepkör alapú hozzáférés kontroll
- Rendszeres biztonsági mentések
- Kétfaktoros authentikáció admin fiókokhoz

**Hálózati biztonság:**
- HTTPS minden kapcsolatra (TLS 1.3)
- HSTS (HTTP Strict Transport Security)
- Rate limiting DDoS védelem ellen
- Tűzfal és behatolás érzékelés

**API biztonság:**
- JWT tokenek 1 órás lejárattal
- Refresh token rotáció
- Token blacklisting kilépés után
- CORS védelem

### Szervezési intézkedések

- Rendszeres biztonsági auditok
- Korlátozott hozzáférés a személyes adatokhoz
- Alkalmazottak adatvédelmi képzése
- Incidenskezelési terv
- Adatvédelmi hatásvizsgálat

## Adatmegőrzés

### Megőrzési időtartamok

| Adattípus | Megőrzési időszak | Jogalap |
|-----------|-------------------|---------|
| Felhasználói fiók | Fiók törléséig | Hozzájárulás / Szerződés |
| Aktivitási előzmények | Fiók törléséig | Szerződés teljesítése |
| Előfizetési adatok | Előfizetés + 8 év | Jogi kötelezettség (számvitel) |
| Számlák | 8 év | Jogi kötelezettség (adótörvény) |
| Biztonsági naplók | 90 nap | Jogos érdek |
| Cookie-k | Max 1 év | Hozzájárulás |
| Elrejtett posztok | Véglegesen | Jogos érdek |

### Automatikus törlés
- Nem megerősített email címmel rendelkező, 12 hónapig inaktív fiókok automatikusan törlésre kerülnek
- Biztonsági naplók 90 nap után automatikusan törlődnek

## Adatvédelmi incidensek

### Bejelentési kötelezettség

Ha adatvédelmi incidens következik be (pl. adatszivárgás):

1. **72 órán belül** bejelentjük a Nemzeti Adatvédelmi és Információszabadság Hatóságnak (NAIH)
2. **Késedelem nélkül** értesítjük az érintett felhasználókat, ha a incidens magas kockázatot jelent
3. Dokumentáljuk az incidenst, következményeit és intézkedéseinket

### NAIH elérhetőségei
- **Cím:** 1055 Budapest, Falk Miksa utca 9-11.
- **Email:** ugyfelszolgalat@naih.hu
- **Telefon:** +36 (1) 391-1400
- **Weboldal:** https://naih.hu

## Cookie-k és nyomkövetés

### Cookie típusok

#### Elengedhetetlen cookie-k (kötelező)
Ezek a cookie-k elengedhetetlenek a platform működéséhez. Nem kapcsolhatók ki.
- Session cookie-k (bejelentkezés)
- CSRF védelem token
- Nyelvi beállítások

#### Funkcionális cookie-k (opcionális)
- Felhasználói preferenciák tárolása
- Témák (dark mode / light mode)

#### Analitikai cookie-k (opcionális)
- Google Analytics (anonimizált)
- Látogatói statisztikák

#### Marketing cookie-k (opcionális)
- Célzott hirdetések
- Remarketing

**Beállítás:** A cookie beállításokat a honlapon található cookie bannerben kezelheti.

## Harmadik felek

<!-- ### Adatfeldolgozók

Az alábbi szolgáltatókat használjuk (adatfeldolgozói minőségben):

| Szolgáltató | Célterület | Jogalap | Adatvédelmi szint |
|-------------|-----------|---------|-------------------|
| AWS | File tárolás | Szerződés | Megfelelő védelem |
| SimplePay | Fizetés kezelés | Szerződés | PCI-DSS tanúsított |
| Amazon SES | Email küldés | Szerződés | GDPR compliant |
| Cloudflare | CDN, DDoS védelem | Jogos érdek | GDPR compliant |

**Garancia:** Minden adatfeldolgozóval adatfeldolgozói szerződést kötöttünk, amely garantálja a GDPR megfelelőséget. -->

### Adattovábbítás harmadik országba

Bizonyos szolgáltatók USA-ban (harmadik ország) tárolnak adatokat:
- **Standard Contractual Clauses (SCC)** alkalmazása
- **Privacy Shield utód mechanizmusok**
- Megfelelő garanciák

## Gyermekek adatainak védelme

A platform használata **16 év alatti gyermekek** számára **szülői felügyelettel** megengedett.

- 16 év alatti gyermekek regisztrációjához szülői hozzájárulás szükséges
- Különleges védelmi intézkedések gyermekek adataira
- Érzékeny különleges adatokat NEM gyűjtünk

## Panaszkezelés

### Panasz benyújtása felénk

Ha úgy érzi, hogy megsértettük adatvédelmi jogait:

1. **Írjon nekünk:** contact@irodalomerettsegi.hu
2. **Válaszunk:** 30 napon belül válaszolunk
3. **Megoldás:** Együttműködünk a probléma megoldásában

### Felügyeleti hatósághoz fordulás

Jogod van panaszt tenni a felügyeleti hatóságnál:

**Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)**
- **Cím:** 1055 Budapest, Falk Miksa utca 9-11.
- **Postacím:** 1363 Budapest, Pf. 9.
- **Email:** ugyfelszolgalat@naih.hu
- **Telefon:** +36 (1) 391-1400
- **Honlap:** https://naih.hu

### Bírósági jogorvoslat

A GDPR 79. cikke alapján jogod van bírósághoz fordulni, ha úgy érzi, hogy jogellenesen kezeltük az adatait.

## API endpointok összefoglalása

| Jog | Endpoint | Metódus | Dokumentáció |
|-----|----------|---------|--------------|
| Hozzáférés | `/api/v1/auth/get` | GET | [Link](/docs/irodalomerettsegi/auth_api/felhasznalo-adatok) |
| Adathordozhatóság | `/api/v1/auth/export` | GET | [Link](/docs/irodalomerettsegi/auth_api/adat-export) |
| Helyesbítés | `/api/v1/auth/profile` | PUT | [Link](/docs/irodalomerettsegi/auth_api/profil-modositas) |
| Törlés | `/api/v1/auth/account` | DELETE | [Link](/docs/irodalomerettsegi/auth_api/fiok-torles) |

## Hasznos linkek

### Belső dokumentumok
- [Adatkezelési Tájékoztató](https://irodalomerettsegi.hu/adatkezelesi-tajekoztato)
- [Általános Szerződési Feltételek](https://irodalomerettsegi.hu/aszf)
- [Cookie Szabályzat](https://irodalomerettsegi.hu/cookie-szabalyzat)

### Jogszabályok
- [GDPR teljes szövege (magyar)](https://eur-lex.europa.eu/legal-content/HU/TXT/?uri=CELEX%3A32016R0679)
- [Infotörvény (2011. évi CXII. törvény)](https://net.jogtar.hu/jogszabaly?docid=a1100112.tv)
- [NAIH útmutatók](https://naih.hu/adatvedelem)

### Nemzetközi források
- [European Data Protection Board](https://edpb.europa.eu/)
- [GDPR.eu - Felhasználóbarát GDPR útmutató](https://gdpr.eu/)

## Kapcsolat

### Adatvédelmi kérdések
- **Email:** contact@irodalomerettsegi.hu
- **Válaszidő:** 30 nap

### Általános ügyfélszolgálat
- **Email:** info@irodalomerettsegi.hu
- **Honlap:** [Kapcsolat](https://irodalomerettsegi.hu/kapcsolat)

### Adatvédelmi tisztviselő (DPO)
Ha van kinevezett adatvédelmi tisztviselő, itt tüntesd fel az elérhetőségét.

---

## Frissítések

**Utolsó frissítés:** 2026. január 12.

**Verzió:** 2.0

Ez a dokumentáció folyamatosan frissül az új funkciók és jogszabályi változások tükrében. Javasoljuk, hogy időnként tekintse át.

---

## Nyilatkozat

Az Irodalomerettsegi.hu üzemeltetője elkötelezett amellett, hogy a legmagasabb adatvédelmi standardokat alkalmazza és tiszteletben tartja minden felhasználó magánélethez való jogát. A GDPR és a magyar adatvédelmi jogszabályok betartása számunkra nem csak kötelezettség, hanem alapvető érték.

**Ha bármilyen kérdése van, forduljon hozzánk bizalommal!**
