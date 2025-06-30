---
sidebar_position: 3
sidebar_label: 'Felhasználó séma'
---

# Felhasználó séma

```json
{
  "username": string,
  "email": string,
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