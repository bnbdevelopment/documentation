---
sidebar_position: 2
sidebar_label: 'Vers lekérése'
---

# Flashcardhoz tartozó vers lekérése

## Request
`GET /api/v1/material/?t=biblia&id=66ed8a4949de1b51a50ee159`

## URL parameters
- `t`: témakör id (`memoriter`, `kotelezok`, `fogalmak`, `stilusiranyzat`, `biblia`, `gorogist`, `mufajok`)
- `id`: a visszakért anyag idje

## Response
A válasz sémája megegyezik az adott tananyag sémájával (lásd: Appendix/Schemas) 