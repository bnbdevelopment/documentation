---
sidebar_position: 4
sidebar_label: 'Adat sémák'
---

# Schemas

## biblia
```json
{
  "eId": number,
  "fogalom": string,
  "definicio": string,
}
```

## fogalom
```json
{
  "eId": number,
  "fogalom": string,
  "definicio": string,
}
```

## gorogi
```json
{
  "eId": number,
  "foglalkozasa": string,
  "gorog": string,
  "romai": string,
}
```

## kotelezok
```json
{
  "eId": number,
  "cim": string,
  "szerzo": string,
  "mufaj": string,
  "szereplok": string[],
}
```

## memoriter
```json
{
  "eId": number,
  "cim": string,
  "szerzo": string,
  "vers": string[],
}
```

## mufajok
```json
{
  "eId": number,
  "nev": string,
  "leiras": string,
  "jellemzok": string[],
}
```

## stilusiranyzat
```json
{
  "eId": number,
  "nev": string,
  "definicio": string,
  "jellemzok": string[],
  "szerzok": string[],
}
``` 