---
title: Progress
---
# ProgressBar Komponens

A `ProgressBar` komponens egy egyszerű, vízszintes haladásjelző sávot jelenít meg, amely vizuálisan mutatja egy folyamat aktuális állapotát százalékos formában.

## Működés

-   Egy konténeren belül (`progress-container`) egy belső sáv (`progress-bar`) szélességével jelzi a `progress` propban megadott százalékos értéket.
-   A sáv színe jelenleg fixen `var(--primary-color)`-ra van állítva.
-   A `loading` prop létezik az interface-ben, de a komponens kódja jelenleg nem használja a renderelés befolyásolására.

## Propok

| Név | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| `progress` | `number` | Igen | Szám 0 és 100 között, amely a folyamat befejezett százalékát jelöli. |
| `loading?` | `boolean` | Nem | **Jelenleg nem használt** a komponens renderelési logikájában. |

## Használati példa

Az alábbi példa egy szókártya tanulási sessionben történő használatát mutatja be, ahol a felhasználó haladását jelzi.

```tsx
import { useState, useEffect } from 'react';
import ProgressBar from '@/components/Progress/Progress.component';

export default function LearningSession() {
    const totalSteps = 10;
    const [currentStep, setCurrentStep] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        // Szimulált haladás: 1 másodpercenként 10%-ot nő
        const interval = setInterval(() => {
            setCurrentStep(prevStep => {
                const nextStep = prevStep + 1;
                if (nextStep <= totalSteps) {
                    setProgressPercentage(Math.floor((nextStep / totalSteps) * 100));
                    return nextStep;
                } else {
                    clearInterval(interval);
                    return prevStep;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Tanulási folyamat</h1>
            <p>Aktuális lépés: {currentStep} / {totalSteps}</p>
            <ProgressBar progress={progressPercentage} />
            <p style={{ marginTop: '10px' }}>{progressPercentage}% kész.</p>
        </div>
    );
}
```
