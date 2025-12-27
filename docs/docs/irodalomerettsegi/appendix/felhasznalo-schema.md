---
sidebar_position: 3
sidebar_label: 'Felhasználó séma'
---

# Felhasználó séma

```json
{
  "username": string,
  "email": string,
  "emailVerified": boolean,
  "salt": string,
  "hash": string,
  "exams": string[],
  "isAdmin": boolean,
  "score": {
    "scoreType": "flashcard",
    "score": number,
  },
  "streak": {
    "streak": number,
    "lastUpdated": Date,
  },
  "history": [
    {
      "type": 'task',
      "taskId": taskId,
      "date": new Date(),
    }
  ],
  "subscriptions": {
      "subscriptionId": string,
      "startDate": Date,
      "endDate": Date,
    }
}
```

## Mezők leírása

- `emailVerified`: Boolean mező, amely jelzi, hogy a felhasználó megerősítette-e az email címét. Regisztrációkor automatikusan `false`, az email megerősítése után `true`-ra vált. Részletek: [Email megerősítés](/irodalomerettsegi/auth_api/email-megerosites) 