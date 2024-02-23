import React from 'react'
import Text from "@/components/Text";
import GradientButton from '@/components/Buttons/GradientButton';
import BorderedInput from '@/components/Input/BorderedInput';
import { useStep } from '@/contexts/StepProvider';
import { useInput } from '@/contexts/BorderedInputProvider';
import { isEmpty } from 'lodash';

const TokenDetails = () => {

    const { activeStep, setActiveStep, generateToken, setGenerateToken } = useStep();
    const { triggerShowWarning } = useInput();

    const handleNextStep = () => {
        if (isEmpty(generateToken.tokenName) || isEmpty(generateToken.symbol)) {
            triggerShowWarning();
            return;
        }

        setActiveStep(activeStep + 1);
    }

    return (
        <div>
            <Text size='3xl'>Start creating your own token</Text>
            <Text size="sm" weight='font-regular' className='mt-1'>First information about your custom token.</Text>

            <BorderedInput
                isRequired
                title='Name'
                tooltipDesc="Your token’s name. Ex:Token Factory Token"
                bgVariant="transparent"
                placeholder='Enter...'
                onChange={(e) => { setGenerateToken({ ...generateToken, tokenName: e.target.value }) }}
                value={generateToken.tokenName}
                className="text-end ml-auto" />

            <BorderedInput
                isRequired
                title='Symbol'
                tooltipDesc="Abbreviation of your token name. Ex: TFT"
                bgVariant="transparent"
                placeholder='Enter...'
                className="text-end ml-auto"
                onChange={(e) => { setGenerateToken({ ...generateToken, symbol: e.target.value.toUpperCase() }) }}
                value={generateToken.symbol} />


            <BorderedInput
                isRequired
                isNumeric
                title='Decimal'
                tooltipDesc="Information about how many digits your token has Ex:1.000000 = 6 Decimals"
                bgVariant="transparent"
                placeholder='Enter...'
                className="text-end ml-auto"
                onValueChange={(e) => setGenerateToken({ ...generateToken, decimal: Number(e.value) })}
                value={generateToken.decimal}
            />


            <GradientButton
                onClick={handleNextStep}
                disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
                className="min-w-[176px] md:min-w-[374px] h-11 mt-8 ml-auto"
                rounded="rounded-lg"
            >
                <Text>Save & Continue</Text>
            </GradientButton>
        </div>
    )
}

export default TokenDetails