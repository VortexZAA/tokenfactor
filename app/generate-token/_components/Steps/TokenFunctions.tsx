import GradientButton from '@/components/Buttons/GradientButton';
import BorderedInput from '@/components/Input/BorderedInput';
import { useStep } from '@/contexts/StepProvider';
import React, { useState } from 'react'
import Text from '@/components/Text';
import Checkbox from '@/components/Checkbox';
import BackButton from '@/components/Buttons/BackButton';
import { useInput } from '@/contexts/BorderedInputProvider';
import { isEmpty } from 'lodash';

const TokenFunctions = () => {
  const { activeStep, setActiveStep, generateToken, setGenerateToken } = useStep();
  const { triggerShowWarning } = useInput();
  
  const handleNextStep = () => {
    if (
      (generateToken.adminFee?.status && !generateToken.adminFee.value) ||
      (generateToken.holders?.status && !generateToken.holders.value) ||
      (generateToken.tokenBurn?.status && !generateToken.tokenBurn.value)
    ) {
      triggerShowWarning();
      return;
    }

    setActiveStep(activeStep + 1);
  }
  return (
    <div>
      <div className='flex'>
        <Text size='3xl'>Set up the functions of the token</Text>
        <span className='text-gradient ml-2 mt-1 text-base font-medium leading-5'>Optional</span>
      </div>
      <Text size="sm" weight='font-regular' className='mt-1'>Set up the functions for each TX from the following options.</Text>

      <div className='flex gap-6 items-center'>
        <Checkbox className='mt-6' checked={generateToken.adminFee?.status || false} onChange={() => { setGenerateToken({ ...generateToken, adminFee: { status: !generateToken.adminFee?.status ?? false } }); }} />
        <BorderedInput
          isNumeric
          tooltipDesc='In each transaction, the number of tokens used in the transaction will be sent to the wallet address you specified as the Minter address, at the percentage you specify.'
          isRequired={generateToken.adminFee?.status}
          containerClassName={!generateToken.adminFee?.status ? "hidden" : undefined}
          title='Admin Fee'
          bgVariant="transparent"
          placeholder='%'
          className="text-end ml-auto"
          onValueChange={(e) => { setGenerateToken({ ...generateToken, adminFee: { status: true, value: Number(e.value) } }) }}
          value={generateToken.adminFee?.value}
        />
      </div>
      <div className='flex gap-6 items-center'>
        <Checkbox className='mt-6' checked={generateToken.holders?.status || false} onChange={() => { setGenerateToken({ ...generateToken, holders: { status: !generateToken.holders?.status ?? false } }); }} />
        <BorderedInput
          isNumeric
          tooltipDesc='In each transaction, the number of tokens used in the transaction will be distributed to token holders in the percentage you specify.'
          isRequired={generateToken.holders?.status}
          containerClassName={!generateToken.holders?.status ? "hidden" : undefined}
          title='Distrubiton to Holders'
          bgVariant="transparent"
          placeholder='%'
          className="text-end ml-auto"
          onValueChange={(e) => { setGenerateToken({ ...generateToken, holders: { status: true, value: Number(e.value) } }) }}
          value={generateToken.holders?.value}
        />
      </div>
      <div className='flex gap-6 items-center'>
        <Checkbox className='mt-6' checked={generateToken.tokenBurn?.status || false} onChange={() => { setGenerateToken({ ...generateToken, tokenBurn: { status: !generateToken.tokenBurn?.status ?? false } }); }} />
        <BorderedInput
          isNumeric
          tooltipDesc='In each transaction, the percentage of tokens you specify will be burned depending on how many tokens the transaction was made with.'
          isRequired={generateToken.tokenBurn?.status}
          containerClassName={!generateToken.tokenBurn?.status ? "hidden" : undefined}
          title='Token Burn'
          bgVariant="transparent"
          placeholder='%'
          className="text-end ml-auto" 
          onValueChange={(e) => { setGenerateToken({ ...generateToken, tokenBurn: { status: true, value: Number(e.value) } }) }}
          value={generateToken.tokenBurn?.value}
          />

      </div>

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

export default TokenFunctions; 