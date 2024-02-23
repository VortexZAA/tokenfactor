import BorderedContainer from '@/components/BorderedContainer';
import BackButton from '@/components/Buttons/BackButton';
import GradientButton from '@/components/Buttons/GradientButton';
import BorderedInput from '@/components/Input/BorderedInput';
import { PlusIcon } from '@/components/icons';
import { useStep } from '@/contexts/StepProvider';
import React from 'react'
import Text from '@/components/Text';
import { useInput } from '@/contexts/BorderedInputProvider';
import { isEmpty } from 'lodash';

const MintingsDetails = () => {
  const { activeStep, setActiveStep, generateToken, setGenerateToken } = useStep();
  const { triggerShowWarning } = useInput();

  const handleNextStep = () => {
    if (isEmpty(generateToken.minterAddress)) {
      triggerShowWarning();
      return;
    }

    setActiveStep(activeStep + 1);
  }

  return (
    <div>
      <Text size='3xl'>Determine new minting details for your token</Text>
      <Text size="sm" weight='font-regular' className='mt-1'>Your new token-minting rules.</Text>

      <BorderedInput
        isRequired
        tooltipDesc='The wallet address that will create the token. It is preferred that it be your wallet address.'
        title='Minter Address'
        bgVariant="transparent"
        placeholder='Enter...'
        className="text-end ml-auto"
        onChange={(e) => { setGenerateToken({ ...generateToken, minterAddress: e.target.value }) }}
        value={generateToken.minterAddress}
      />

      <BorderedInput
        isNumeric
        tooltipDesc='You determine how many tokens you will have—0=Unlimited amount.'
        title='Token Cap (Optional)'
        bgVariant="transparent"
        placeholder='Enter...'
        className="text-end ml-auto"
        onValueChange={(e) => { setGenerateToken({ ...generateToken, tokenCap: Number(e.value) }) }}
        value={generateToken.tokenCap}
      />

      <div className='flex justify-end gap-8 items-center mt-8'>
        <BackButton />
        <GradientButton
          onClick={handleNextStep}
          disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
          className="min-w-[176px] md:min-w-[374px] h-11"
          rounded="rounded-lg"
        >
          <Text>Save & Continue</Text>
        </GradientButton>
      </div>
    </div>
  )
}

export default MintingsDetails