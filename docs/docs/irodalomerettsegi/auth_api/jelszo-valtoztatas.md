---
sidebar_position: 4
sidebar_label: 'Jelszó változtatás'
---

# Jelszó változtatás

## Request
`POST /api/v1/auth/password`

### Request body
```json
{
    "newPassword": string
}
```

### Response
User ha sikeres volt, különben error 