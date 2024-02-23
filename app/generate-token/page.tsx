'use client';

import React from 'react'
import InfoSide from './_components/InfoSide';
import Step from './_components/StepSide';
import StepProvider from '@/contexts/StepProvider';
import ShapeSide from './_components/ShapeSide';
import BorderedInputProvider from '@/contexts/BorderedInputProvider';

const GenerateToken = () => {
    return (
        <div className="flex gap-4 flex-col md:flex-row md:gap-24 z-10 relative md:min-h-[879px] justify-between">
            <InfoSide />
            <div>
                <StepProvider>
                    <BorderedInputProvider>
                        <Step />
                        <ShapeSide />
                    </BorderedInputProvider>
                </StepProvider>
            </div>
        </div>
    )
}

export default GenerateToken;