'use client';

import { createContext, FC, PropsWithChildren, useState, useMemo, useContext, Dispatch, useEffect } from "react";
import { useStep } from "./StepProvider";

type StepContextValue = {
    showWarning: boolean,
    triggerShowWarning: () => void
}

const BorderedInputContext = createContext<StepContextValue>({
    showWarning: false,
    triggerShowWarning: () => { }
});

const BorderedInputProvider: FC<PropsWithChildren> = ({ children }) => {
    const [showWarning, setShowWarning] = useState(false);

    const { activeStep } = useStep();

    useEffect(() => {
        setShowWarning(false);
    }, [activeStep]);

    const triggerShowWarning = () => {
        setShowWarning(true);
    }

    const value = useMemo<StepContextValue>(() => ({
        showWarning,
        triggerShowWarning
    }), [
        showWarning,
        setShowWarning,
        activeStep
    ])

    return (
        <BorderedInputContext.Provider value={value}>
            {children}
        </BorderedInputContext.Provider>
    )
}

export const useInput = () => useContext(BorderedInputContext);

export default BorderedInputProvider;