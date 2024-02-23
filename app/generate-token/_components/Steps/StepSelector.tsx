import { motion } from 'framer-motion';
import React, { FC, useEffect, useRef, useState } from 'react';

interface Props<T> {
    steps: T[];
    selectedStep: number;
    onSelectedStep?: (step: number) => void;
    dots?: number[];
    loading?: boolean;
}


const Steps: FC<Props<any>> = ({ steps, selectedStep, onSelectedStep, loading, dots }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [selectedStep]);

    return (
        <nav className='relative'>
            <ul className='flex-auto gap-2 border border-white/10 rounded-lg md:flex hidden'>
                {steps.map((step, _index) => (
                    <motion.li
                        key={step.value}
                        onClick={() => onSelectedStep?.(step.value)}
                        className={`px-6 py-3 m-1 text-base font-medium text-white relative cursor-pointer rounded-md hover:text-[#E97700] duration-700 flex-1 whitespace-nowrap text-center`}
                    >
                        {step.content}
                        {dots?.includes(step) && (
                            <div className='h-2 w-2 absolute bg-[#E97700] right-3 top-2 animate-pulse rounded-full' />
                        )}
                        {step.value === selectedStep && (
                            <motion.div layoutId={'gliding'} className='absolute bottom-0 h-[48px] border rounded-md border-[#E97700] left-0 right-0' />
                        )}
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
};

export default Steps;
