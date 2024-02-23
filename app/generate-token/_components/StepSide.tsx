import React, { useContext } from 'react'
import Steps from './Steps/StepSelector';
import StepProvider, { StepTypes, useStep } from '@/contexts/StepProvider';
import { motion } from 'framer-motion';
import TokenDetails from './Steps/TokenDetails';
import InitialBalances from './Steps/InitialBalances';
import MintingsDetails from './Steps/MintingsDetails';
import TokenFunctions from './Steps/TokenFunctions';
import Marketing from './Steps/Marketing';
import Preview from './Steps/Preview';
import { isEmpty } from 'lodash';
import TokenResponse from './Steps/TokenResponse';


interface StepModel {
    value: StepTypes,
    content: string
}

export const stepList: StepModel[] = [
    {
        value: StepTypes.tokenDetail,
        content: "Token Detail"
    }, 
    {
        value: StepTypes.mintingDetails,
        content: "Minting Details"
    },
    {
        value: StepTypes.initialBalances,
        content: "Initial Balances"
    },
    {
        value: StepTypes.tokenFunctions,
        content: "Token Functions"
    },
    {
        value: StepTypes.marketing,
        content: "Marketing"
    }
]

const Step = () => {
    const { activeStep, setActiveStep, generateToken } = useStep();

    const stepperControls = (): boolean => {
        if (activeStep === 1) {
            if (isEmpty(generateToken.tokenName) || isEmpty(generateToken.symbol) || generateToken.decimal === 0) {
                return false;
            }
        }

        if (activeStep === 2) {
            if (isEmpty(generateToken.minterAddress)) {
                return false;
            }

        }

        if (activeStep === 3) {
            if (generateToken.initialBalances.length === 0 ||
                generateToken.initialBalances.some(item => (isEmpty(item.address) || !item.amount))) {
                return false;
            }
        }


        if (activeStep === 4) {
            if ((generateToken.adminFee?.status && !generateToken.adminFee.value) ||
                (generateToken.holders?.status && !generateToken.holders.value) ||
                (generateToken.tokenBurn?.status && !generateToken.tokenBurn.value)) {
                return false;
            }
        }

        return true;
    }

    return (
        <div>
            <Steps steps={stepList} selectedStep={activeStep} onSelectedStep={(e: number) => { setActiveStep(e); }} />

            <motion.main
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className={`mt-8 ${stepperControls() ? "" : "blur-sm"}`}>
                {!stepperControls() && (
                    <div className="cursor-not-allowed h-full w-full absolute top-0 bottom-0 left-0 z-50 blur-sm" />
                )}
                {activeStep === StepTypes.tokenDetail && <TokenDetails />}
                {activeStep === StepTypes.mintingDetails && <MintingsDetails />}
                {activeStep === StepTypes.initialBalances && <InitialBalances />}
                {activeStep === StepTypes.tokenFunctions && <TokenFunctions />}
                {activeStep === StepTypes.marketing && <Marketing />}
                {activeStep === StepTypes.preview && <Preview />}
                {activeStep === StepTypes.tokenResponse && <TokenResponse />}
            </motion.main>
        </div>
    )
}

export default Step;