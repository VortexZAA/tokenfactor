import GradientButton from '@/components/Buttons/GradientButton';
import BorderedInput from '@/components/Input/BorderedInput';
import { useStep } from '@/contexts/StepProvider';
import React from 'react'
import Text from '@/components/Text';
import BackButton from '@/components/Buttons/BackButton';
import { PlusIcon } from '@/components/icons';
import BorderedContainer from '@/components/BorderedContainer';
import { useInput } from '@/contexts/BorderedInputProvider';
import { cloneDeep, isEmpty } from 'lodash';
import { motion } from 'framer-motion';

const InitialBalances = () => {
  const { activeStep, setActiveStep, generateToken, setGenerateToken } = useStep();
  const { triggerShowWarning } = useInput();

  const handleNextStep = () => {
    if (
      generateToken.initialBalances.length === 0 ||
      generateToken.initialBalances.some(item => (isEmpty(item.address) || !item.amount))
    ) {
      triggerShowWarning();
      return;
    }

    setActiveStep(activeStep + 1);
  }

  const changeWalletName = (index: number, value: string) => {
    const temp = cloneDeep(generateToken.initialBalances);
    temp[index].address = value;
    setGenerateToken({ ...generateToken, initialBalances: temp });
  }

  const changeAmount = (index: number, value: number) => {
    const temp = cloneDeep(generateToken.initialBalances);
    temp[index].amount = value;
    setGenerateToken({ ...generateToken, initialBalances: temp });
  }

  const addItem = () => {
    setGenerateToken({
      ...generateToken,
      initialBalances: [
        ...generateToken.initialBalances,
        { address: '', amount: 0 }
      ]
    })
  }

  const removeItem = (index: number) => {
    if (index === 0) return;

    const filteredBalances = generateToken.initialBalances.filter((_, i) => i !== index);
    setGenerateToken({ ...generateToken, initialBalances: filteredBalances });
  }

  return (
    <div>
      <Text size='3xl'>Set the initial balance of your token</Text>
      <Text size="sm" weight='font-regular' className='mt-1'>Enter wallet address and initial balance.</Text>

      {
        generateToken.initialBalances.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='relative'>
              <BorderedInput
                isRequired
                tooltipDesc='Once the token is created, you determine which wallet addresses will receive tokens. You can enter your wallet address.'
                title='Address'
                bgVariant="transparent"
                placeholder='Enter...'
                className="text-end ml-auto"
                onChange={(e) => changeWalletName(index, e.target.value)}
                value={item.address}
              />
              {
                index !== 0 &&
                <button className='absolute top-2 -right-2 translate-x-full' onClick={() => removeItem(index)}>
                  <BorderedContainer containerClassName='w-6 h-6' className='flex items-center justify-center'>
                    <Text size='xl' weight='font-bold' className='text-red'>-</Text>
                  </BorderedContainer>
                </button>
              }
            </div>

            <BorderedInput
              isRequired
              isNumeric
              tooltipDesc='You determine how many tokens wallet addresses receive. If you specify the token cap amount, all tokens will be in your wallet.'
              title='Amount'
              bgVariant="transparent"
              placeholder='Enter...'
              className="text-end ml-auto"
              onValueChange={(e) => changeAmount(index, Number(e.value))}
              value={item.amount}
            />
            {
              index !== (generateToken.initialBalances.length - 1) &&
              <span className='w-full h-[2px] my-8 bg-[#004E99] block' />
            }
          </motion.div>
        ))
      }

      <button className='mt-6 mx-auto flex active:scale-95' onClick={addItem}>
        <BorderedContainer containerClassName='w-12 h-12' className='flex items-center justify-center'>
          <PlusIcon className="w-4 h-4 text-white" />
        </BorderedContainer>
      </button>

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

export default InitialBalances;