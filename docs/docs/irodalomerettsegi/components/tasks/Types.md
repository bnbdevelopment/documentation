---
title: Tasks Types
---
# Feladat Típusok

Ezek a típusok a feladatokhoz kapcsolódó komponensek propjait és adatstruktúráit rögzítik.

## `TaskHeaderParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title?` | `String` | A feladat címe. |
| `description?` | `String[]` | Leíró sorok. |
| `examType?` | `boolean` | Érettségi jelölés. |
| `tags?` | `String[]` | Címkék listája. |
| `children?` | `React.JSX.Element \| React.JSX.Element[]` | Opcionális tartalom. |

## `ConnectParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `data` | `{ r1: string[]; r2: string[] }` | Párosítandó elemek. |
| `connections` | `number[]` | A kapcsolatok indexei. |
| `selectedIndex` | `number` | Aktív bal oldali index. |
| `onSelectLeft` | `(index: number) => void` | Bal oldali kiválasztás. |
| `onConnectRight` | `(index: number) => void` | Jobb oldali párosítás. |
| `disabled?` | `boolean` | Tiltott állapot. |
| `showMode?` | `boolean` | Megoldás megjelenítési mód. |
| `correctSolution?` | `string[]` | Helyes jobb oldali sorrend. |

## `PoemGapFillerProps`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `data` | `{ title: string; data: string[] }` | Vers és sorok. |
| `userSolutions` | `string[]` | Aktuális megoldások. |
| `onSolutionChange` | `(updatedSolutions: string[]) => void` | Megoldás változás callback. |
| `result?` | `any` | Kiértékelés eredménye. |
| `showCorrectAnswers` | `boolean` | Helyes megoldások megjelenítése. |

## `SolutionTableProps`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `tableStructure` | `{ cols: string[]; data: any[][] }` | Táblázat felépítése. |
| `userSolutions` | `string[][]` | Felhasználói válaszok. |
| `onSolutionChange` | `(updatedSolutions: string[][]) => void` | Változás callback. |
| `checkMask?` | `boolean[][]` | Ellenőrzési maszk. |
| `correctSolutions?` | `string[][]` | Helyes megoldások. |
| `previousAnswers?` | `string[][]` | Korábbi válaszok. |
| `disabled?` | `boolean` | Tiltott állapot. |
| `showCorrectSolutions?` | `boolean` | Helyes megoldások megjelenítése. |

## `TypeOfQuestions`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `topic` | `string` | Témakör. |
| `question` | `string` | A kérdés szövege. |
| `body` | `string` | Kiegészítő szöveg. |
| `options` | `string[]` | Válaszlehetőségek. |

## `TypeOfQuestionsParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `questions` | `TypeOfQuestions[]` | Kérdések listája. |
| `selectFunction` | `Function` | Válaszkezelő callback. |
| `selected` | `number[][]` | Kiválasztott válaszok indexei. |
| `solution?` | `SolutionType[]` | Kiértékelt megoldások. |

## `QuestionParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `question` | `TypeOfQuestions` | Az adott kérdés adatai. |
| `selectOption` | `Function` | Válasz kiválasztás callback. |
| `index` | `number` | Kérdés indexe. |
| `selected` | `number[][]` | Kiválasztott válaszok. |
| `solution?` | `SolutionType` | Kiértékelt megoldás. |

## `SolutionType`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `question` | `string` | A kérdés szövege. |
| `answer` | `number[][]` | A felhasználó válaszai. |
| `correct` | `boolean` | Helyes-e a válasz. |
| `solution` | `number[][]` | Helyes megoldás indexek. |

## `TypeOfFlashcard`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `term` | `string` | Kifejezés. |
| `definition` | `string` | Definíció. |
| `id` | `string` | Azonosító. |
| `known?` | `boolean` | Ismert jelölés. |

## `TypeOfFlashcardParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `definition` | `string` | Definíció. |
| `term` | `string` | Kifejezés. |
| `onChangeFunction?` | `Function` | Fordítás callback. |
| `defaultSet?` | `boolean` | Kezdő oldal. |
| `loading?` | `boolean` | Betöltési állapot. |
| `id?` | `string` | Opcionális azonosító. |
| `last?` | `boolean` | Utolsó kártya jelölés. |
| `animationClass?` | `string` | Animációs CSS osztály. |
| `swipeLeft` | `Function` | Balra húzás callback. |
| `swipeRight` | `Function` | Jobbra húzás callback. |
| `blockSwipe?` | `boolean` | Húzás tiltása. |

## `TypeOfFlashcardsParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `flashcards?` | `TypeOfFlashcard[]` | Szókártyák listája. |
| `loading?` | `boolean` | Betöltési állapot. |
| `user` | `any` | Bejelentkezett felhasználó. |

## `TypeOfCounterParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `numberOfFlashcards` | `number` | Összes kártya. |
| `studiedFlashcards` | `number` | Tanult kártyák. |
| `known` | `number` | Ismert kártyák. |
| `dontKnown` | `number` | Ismeretlen kártyák. |
| `loading?` | `boolean` | Betöltési állapot. |

## `TypeOfGradeParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `grade` | `number` | Érdemjegy. |
| `maxPoint` | `number` | Maximális pontszám. |
| `points` | `number` | Elért pontszám. |

## `poemType`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `cim` | `string` | Vers címe. |
| `szerzo` | `string` | Szerző neve. |
| `vers` | `string[]` | Vers sorai. |
| `eId` | `number` | Külső azonosító. |
| `id` | `string` | Belső azonosító. |

## `TypeOfAutoTextParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `text` | `string` | Megjelenítendő szöveg. |
| `width` | `number` | Célzott szélesség. |
| `height` | `number` | Célzott magasság. |

## `Post`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | A tétel egyedi azonosítója. |
| `title` | `string` | Cím. |
| `content` | `string` | Tartalom. |
| `authorId` | `string` | Szerző azonosítója. |
| `visible` | `boolean` | Láthatóság jelző. |
| `attachments` | `Attachment[]` | Csatolmányok. |
| `uploadDate` | `string` | Feltöltés dátuma. |
| `updatedAt` | `string` | Frissítés dátuma. |
| `author` | `Author` | Szerző adatai. |

## `Author`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `string` | Szerző azonosítója. |
| `username` | `string` | Szerző neve. |

## `PostParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `post` | `Post` | A megjelenítendő tétel adatai. |

## `Task`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `id` | `number` | Feladat azonosító. |
| `title` | `string` | Feladat cím. |
| `description` | `string` | Rövid leírás. |
| `link` | `string` | Navigációs link. |

## `SuggestionParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `tasks` | `Task[]` | Javasolt feladatok listája. |

## `SuggestionItemParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `task` | `Task` | A megjelenítendő feladat. |
| `index` | `number` | Lista index animációhoz. |

## Alkalmazási példa (az alkalmazásban)

- Kvíz és feladat típusok: `web/components/Tasks/Quiz/Questions.component.tsx`, `web/components/Tasks/Connect/Connect.component.tsx`, `web/components/Tasks/Fill/Fill.component.tsx`.
- Szókártya és haladás: `web/components/Flashcard/Flashcards.component.tsx`, `web/components/FlashcardCounter/Counter.component.tsx`.
- Tételek listázása: `web/components/task-posts/post.component.tsx`.
- Javasolt feladatok: `web/components/Suggestion/Suggestion.component.tsx`.
