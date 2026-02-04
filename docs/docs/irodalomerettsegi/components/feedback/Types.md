---
title: Feedback Types
---
# Visszajelzés Típusok

Ezek a típusok a visszajelzés és felhasználói üzenetek komponenseihez tartoznak.

## `AutoRviewParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `userName?` | `string` | Opcionális felhasználónév. |
| `userEmail?` | `string` | Opcionális email cím. |
| `successFunction?` | `(success: Error) => void` | Siker callback a beküldés után. |
| `errorFunction?` | `(errorParam: Error) => void` | Hiba callback. |

## `Error` (AutoReview)

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | Hiba címe. |
| `message` | `string` | Hiba szövege. |

## `TypeOfErrorParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `message?` | `string` | A hiba szövege. |
| `title?` | `string` | A hiba címe. |
| `open?` | `boolean` | Megjelenítés állapota. |
| `closeFunction?` | `Function` | Bezárási callback. |

## `Error` (ErrorType)

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | Hiba címe. |
| `message` | `string` | Hiba szövege. |

## `TypeOfSuccessParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `message?` | `string` | A siker üzenet szövege. |
| `title?` | `string` | A siker üzenet címe. |
| `open?` | `boolean` | Megjelenítés állapota. |
| `closeFunction?` | `Function` | Bezárási callback. |

## `SuccessType`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | Siker üzenet címe. |
| `message` | `string` | Siker üzenet szövege. |

## `typeOfPopupParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `title` | `string` | A popup címe. |
| `message` | `string` | A popup üzenete. |

## `TypeOfWindowFeedbackParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `closeFeedbackWindow` | `Function` | Bezárási callback. |
| `open` | `boolean` | Megnyitott állapot. |
| `percent` | `number` | Eredmény százalék. |
| `color` | `string` | A visszajelzés színe. |
| `replay` | `Function` | Újrajátszás callback. |
| `extra?` | `any` | Opcionális extra tartalom. |

## `typeOfInformationParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `message` | `string \| React.ReactElement \| React.ReactElement[]` | Információs szöveg vagy elemek. |
| `title` | `string` | Információs cím. |
| `action?` | `Function` | Opcionális művelet callback. |
| `actionTitle` | `string` | A gomb felirata. |
| `closed?` | `boolean` | Kezdeti zárt állapot. |

## `Reaction`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `likes` | `number` | Lájkok száma. |
| `dislikes` | `number` | Diszlájkok száma. |

## `ReactionParams`

| Kulcs | Típus | Leírás |
| --- | --- | --- |
| `reactions` | `Reaction` | Aktuális reakciók számai. |
| `like` | `Function` | Lájk callback. |
| `dislike` | `Function` | Diszlájk callback. |

## Alkalmazási példa (az alkalmazásban)

- Hibák és sikeres műveletek: `web/components/Error/Error.component.tsx`, `web/components/Success/Success.component.tsx`.
- Visszajelzés és információ: `web/components/FeedbackWindow/FeedbackWindow.component.tsx`, `web/components/Information/information.component.tsx`.
- Reakciók és vélemények: `web/components/Reactions/Reactions.component.tsx`, `web/components/AutoReview/AutoReview.component.tsx`.
