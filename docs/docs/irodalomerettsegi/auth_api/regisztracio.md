---
sidebar_position: 3
sidebar_label: 'Regisztráció'
---

# Registration

## Request
`POST /api/v1/auth/register`

### Request body
```json
{
    "username": string, 
    "password": string, 
    "email": string
}
```

### Response
Token if registration is successful, otherwise null 