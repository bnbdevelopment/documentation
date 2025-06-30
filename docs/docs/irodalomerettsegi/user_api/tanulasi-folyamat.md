---
sidebar_position: 1
sidebar_label: 'Tanulási folyamat'
---

# Tanulási folyamat eltárolása

A User API az autentikáción kívüli felhasználó kezelésért felel. Ide tartozik az adott teljesítmény, flashcard eredmény, vagy különböző teszteredmények eltárolása is.

## Request
`POST /api/v1/user/store?id=66ed87fc63a2cc057337d968`

### Request body
```json
{
    "scoreType": "flashcard",
    "score": {}
}
```

A `score` paraméter formátuma a `scoreType` paraméter alapján váltakozik a következőképpen:

### Flashcard
Flashcardoknál a `score` paraméterben tárolhatóak a flashcardokra vonatkozó statisztikák, kártyák amiket tudott, illetve kártyák amiket elhibázott.

Az adatbázisban minden felhasználóhoz csak egy flashcard eredmény objektum tartozik, így a request során a már meglévő objektumot frissítjük.

```json
{
    "score": {
      "correct": [],
      "incorrect": [],
    }
}
```

> TODO: a headerbe kell lennie az adott tokennek, hogy a felhasználó csak saját magának tudja updatelni az adatokat 