import React from 'react'
import { LeftArrowIcon } from '../icons'
import { useStep } from '@/contexts/StepProvider';


const BackButton = () => {
    const { activeStep, setActiveStep } = useStep();

    return (
        <button onClick={() => { setActiveStep(activeStep - 1); }} className='text-white flex gap-2 items-center font-normal leading-8 text-xl'>
            <LeftArrowIcon />
            <span className='underline'>Back</span>
        </button>
    )
}

export default BackButton