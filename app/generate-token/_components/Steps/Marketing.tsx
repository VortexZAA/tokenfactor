import React, { ChangeEvent, useRef, useState } from 'react'
import Text from '@/components/Text';
import BackButton from '@/components/Buttons/BackButton';
import GradientButton from '@/components/Buttons/GradientButton';
import BorderedInput from '@/components/Input/BorderedInput';
import { useStep } from '@/contexts/StepProvider';
import BorderedContainer from '@/components/BorderedContainer';
import { PlusIcon } from '@/components/icons';
import { useInput } from '@/contexts/BorderedInputProvider';
import { AnimatePresence, motion } from 'framer-motion';

const Marketing = () => {
  const { activeStep, setActiveStep, generateToken, setGenerateToken } = useStep();
  const [notValidImage, setNotValidImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImageURLValid = (url: string) => {
    const checkImage = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });

    return checkImage
  };

  const handleNextStep = async () => {
    if (generateToken?.logoUrl && await isImageURLValid(generateToken.logoUrl) === false) {
      setNotValidImage(true);

      return;
    }

    setActiveStep(activeStep + 1);
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64 = event.target?.result as string;
        setGenerateToken({ ...generateToken, logoUrl: base64 });
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <div className='flex'>
        <Text size='3xl'>Add marketing data for your new token</Text>
        <span className='text-gradient ml-2 mt-1 text-base font-medium leading-5'>Optional</span>
      </div>
      <Text size="sm" weight='font-regular' className='mt-1'>Public metadata for your new token.</Text>

      <BorderedInput
        title='Project'
        tooltipDesc='Please specify the name of your project.'
        bgVariant="transparent"
        placeholder='Enter...'
        className="text-end ml-auto"
        onChange={(e) => { setGenerateToken({ ...generateToken, project: e.target.value }) }}
        value={generateToken.project}
      />

      <div className='relative'>
        <BorderedInput
          title='Logo URL'
          tooltipDesc='Specify the logo of your project as IPFS.'
          bgVariant="transparent"
          placeholder='https://...'
          className="text-end ml-auto"
          onChange={(e) => { setGenerateToken({ ...generateToken, logoUrl: e.target.value }); setNotValidImage(false); }}
          value={generateToken.logoUrl}
        />
        <AnimatePresence>
          {notValidImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm mt-1 absolute bg-gradient-to-r from-celticBlue via-celticBlue to-celticBlue  backdrop-brightness-75 rounded-sm py-2 px-4 right-[10%] -bottom-4"
            >
              {<span>Please check the link to make sure it is a valid image.</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BorderedInput
        isTextArea
        title='Description'
        tooltipDesc='Please specify your project details.'
        bgVariant="transparent"
        placeholder='Enter...'
        className="text-end ml-auto"
        onChange={(e) => { setGenerateToken({ ...generateToken, description: e.target.value }) }}
        value={generateToken.description}
      />

      {/* <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-8 flex flex-col gap-4 mt-6">
        <div className="flex items-center w-full justify-between">
          <div>
            <Text size="lg" weight="font-medium" className='flex-1 text-center'>Logo URL</Text>
          </div>
          <div className={`w-[525px] relative bg-[#0D2842] text-white rounded-lg cursor-text`} >
            <input
              onChange={(e) => { setGenerateToken({ ...generateToken, logoUrl: e.target.value }) }}
              value={generateToken.logoUrl}
              placeholder={"https://"} className='bg-[#0D2842] rounded-lg h-12 pl-4 focus:outline-none w-full' />
          </div>
          <button onClick={handleButtonClick} className='flex active:scale-95 border-l-2 border-white/10 pl-8'>
            <BorderedContainer containerClassName='w-12 h-12' className='flex items-center justify-center'>
              <PlusIcon className="w-4 h-4 text-white" />
            </BorderedContainer>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept='image/*'
              style={{ display: 'none' }}
            />
          </button>
        </div>
      </div>
 */}
      <div className='flex justify-end gap-8 items-center mt-8'>
        <BackButton />
        <GradientButton
          onClick={handleNextStep}
          disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
          className="min-w-[176px] md:min-w-[374px] h-11"
          rounded="rounded-lg"
        >
          <Text>Preview Your Token Details</Text>
        </GradientButton>
      </div>
    </div>
  )
}

export default Marketing