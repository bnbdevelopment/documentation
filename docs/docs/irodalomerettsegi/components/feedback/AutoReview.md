# AutoReview Komponens

Az `AutoReview` egy egyszerű React komponens, amely lehetővé teszi a felhasználók számára, hogy értékelést küldjenek. A komponens egy csillagos értékelőből és egy küldés gombból áll.

## Használat

Az `AutoReview` komponens használatához importálni kell a komponensfájlt, majd beilleszteni a JSX kódba.

```jsx
import AutoReview from './AutoReview.component';

function MyPage() {
  const handleSuccess = (success) => {
    console.log('Success:', success.title, success.message);
    // Itt kezelheted a sikeres küldést, például megjeleníthetsz egy üzenetet a felhasználónak.
  };

  const handleError = (error) => {
    console.error('Error:', error.title, error.message);
    // Itt kezelheted a hibát, például megjeleníthetsz egy hibaüzenetet.
  };

  return (
    <div>
      <h1>Értékelje az oldalt!</h1>
      <AutoReview
        userName="Teszt Felhasználó"
        userEmail="teszt@email.com"
        successFunction={handleSuccess}
        errorFunction={handleError}
      />
    </div>
  );
}
```

## Propok

Az `AutoReview` komponens a következő propokat fogadja el:

- `userName` (opcionális, string): A felhasználó neve.
- `userEmail` (opcionális, string): A felhasználó e-mail címe.
- `successFunction` (opcionális, függvény): Egy callback függvény, ami sikeres értékelésküldés esetén hívódik meg. A függvény egy objektumot kap paraméterként, ami a következőket tartalmazza:
  - `title` (string): A sikeres üzenet címe.
  - `message` (string): A sikeres üzenet tartalma.
- `errorFunction` (opcionális, függvény): Egy callback függvény, ami hiba esetén hívódik meg. A függvény egy objektumot kap paraméterként, ami a következőket tartalmazza:
  - `title` (string): A hibaüzenet címe.
  - `message` (string): A hibaüzenet tartalma.

## Működés

A komponens a felhasználó által adott értékelést (1-5 csillag) és a megadott felhasználói adatokat (név, e-mail) küldi el a szervernek a `https://api.irodalomerettsegi.hu/api/v1/reviews` végpontra egy POST kéréssel.

A küldés gomb le van tiltva a kérés ideje alatt, hogy megakadályozza a többszöri küldést. Sikeres küldés esetén a `successFunction` hívódik meg, hiba esetén pedig az `errorFunction`.
