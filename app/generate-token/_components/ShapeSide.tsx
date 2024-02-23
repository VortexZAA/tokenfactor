"use client";

import { Shape2Icon, ShapeIcon } from '@/components/icons';
import { StepTypes, useStep } from '@/contexts/StepProvider';
import { motion } from 'framer-motion';
import React from 'react'

const ShapeSide = () => {
    const { activeStep, setActiveStep, processLoading } = useStep();

    return (
        <div>
            {activeStep === StepTypes.tokenDetail && (
                <motion.div
                    className="md:block hidden"
                >
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[510px] w-[455px] -top-48 left-80 -z-10"
                    />
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[750px] w-[455px] -bottom-0 rotate-0 right-0 -z-10"
                    />

                </motion.div>
            )}
            {activeStep === StepTypes.initialBalances && (
                <motion.div
                    className="md:block hidden"
                >
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[510px] w-[455px] -top-48 right-80 -z-10"
                    />
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[750px] w-[455px] -bottom-0 rotate-90 right-0 -z-10"
                    />

                </motion.div>
            )}
            {activeStep === StepTypes.mintingDetails && (
                <motion.div

                    className="md:block hidden"
                >
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[510px] w-[455px] -top-48 right-40 -z-10"
                    />
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[450px] w-[455px] -bottom-0 rotate-180 left-20 -z-50"
                    />

                </motion.div>
            )}
            {activeStep === StepTypes.tokenFunctions && (
                <motion.div

                    className="md:block hidden"
                >
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[510px] w-[455px] -top-48 left-80 -z-10"
                    />
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[750px] w-[455px] -bottom-0 rotate-0 right-0 -z-10"
                    />

                </motion.div>
            )}
            {activeStep === StepTypes.marketing && (
                <motion.div

                    className="md:block hidden"
                >
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[510px] w-[455px] -top-48 right-40 -z-10"
                    />
                    <Shape2Icon
                        animate={processLoading}
                        className="fixed h-[750px] w-[455px] -bottom-0 rotate-0 right-0 -z-10"
                    />

                </motion.div>
            )}
        </div>
    )
}

export default ShapeSide