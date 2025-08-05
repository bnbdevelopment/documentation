---
title: Subscription Tiers
sidebar_label: Subscription Tiers
---
## Subscription benefits
| Feature | Guest | Free Tier | Premium User | Teacher | Enterprise |
|------------|-------|-----------|--------------|---------|------------|
| View courses and contents | ✅ (Limited) | ✅ | ✅ | ✅ | ✅ |
| Enroll into free courses | ❌ | ✅ | ✅ | ✅ | ✅ |
| Enroll into premium courses | ❌ | Demo | ✅ | ✅ | ✅ |
| Request specific randomized exercises | ❌ | ❌ | ✅ | ✅ | ✅ |
| Unlimited code executions | ❌ | ❌ | ✅ | ✅ | ✅ |
| Priority queue | ❌ | ❌ | ✅ | ✅ | ✅ |
| Create / Manage courses | ❌ | ❌ | ❌ | ✅ | ✅ |
| Create / Manage code exercises | ❌ | ❌ | ❌ | ✅ | ✅ |
| Create / Manage exams | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage organizations | ❌ | ❌ | ❌ | ❌ | ✅ |

:::note
On-demand users can have the same capabilities as premium users, but only for a specified course.
:::

## Rate Limiting

Based on the tier of the user, the API requests are limited.
:::info
All limits reset at 00:00 each day.
:::

| Tier | Watch Time (min) | Code Executions (min) | Custom Generated Exercises (#) |
|------|-----------------|---------------------|----------------------------|
| Guest | 30 | 0 | 0 |
| Free | 60 | 10 | 0 | 
| Premium | Unlimited | 100 | 25 |
| Teacher | Unlimited | 500 | 200 |
| Enterprise | Unlimited | Unlimited | 500 |

:::info
The code execution measure does not consider the startup and exit time of the process. Therefore only the code execution time is measured, which roughly equals to *~0.00065s / line*.
:::

:::note
The rate limits are enforced on a per-user basis and reset every minute. If you exceed the rate limit, requests will return a `429 Too Many Requests` status code.
:::
