import React, { useState } from 'react'
import Text from "@/components/Text";
import GradientButton from '@/components/Buttons/GradientButton';
import { StepTypes, useStep } from '@/contexts/StepProvider';
import { EditIcon, EmptyImagesIcon } from '@/components/icons';
import { getCroppedString } from '@/utils/stringUtils';
import { useNotification } from '@/contexts/NotificationProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { rest } from 'lodash';

const Preview = () => {
    const { setActiveStep, generateToken, instantiateToken } = useStep();

    const { processLoading } = useNotification();

    const [totalCapWarning, setTotalCapWarning] = useState(false);

    const handleInstantiateToken = () => {
        if (generateToken.tokenCap) {
            const totalAmount = generateToken.initialBalances.reduce((acc, curBalance) => { return (acc + Number(curBalance.amount)) }, 0);

            if (totalAmount > Number(generateToken.tokenCap)) {
                window.scrollTo({
                    top: 100,
                    behavior: 'smooth',
                });

                return setTotalCapWarning(true);
            }
        }

        instantiateToken();;
    }

    return (
        <div>
            <Text size='3xl'>Edit & Preview  your token</Text>
            <Text size="sm" weight='font-regular' className='mt-1'>Preview your token and make it ready to create.</Text>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='flex items-start flex-col gap-4'>
                        <Text size="lg" className='text-white/60'>Token Name (SYMBOL)</Text>
                        <span className='font-normal text-lg'>{generateToken.tokenName} ({generateToken.symbol})</span>
                    </div>
                    <button onClick={() => { setActiveStep(StepTypes.tokenDetail); }}>
                        <EditIcon />
                    </button>
                </div>
            </div>

            <div className={
                `w-full ${totalCapWarning ? "bg-[#969900]/10 border-[#969900]" : "bg-[#0c0c2766] border-[#004E99]"} border backdrop-blur-[37px] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6`
            }>
                <div className='flex justify-between'>
                    <div className='w-full flex flex-col'>
                        {
                            generateToken.initialBalances.map((item, index) => (
                                <>
                                    <div key={`initial-balance-${index}`} className='space-y-10 relative'>
                                        <div className='flex items-center'>
                                            <Text size="lg" className=' text-white/60'>
                                                Wallet Address
                                            </Text>
                                            <span className='font-normal ml-2 text-lg'>{getCroppedString(item.address ?? "", 6, 8) ?? "-"}</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <Text size="lg" className=' text-white/60'>
                                                Amount
                                            </Text>
                                            <span className='font-normal ml-2 text-lg'>{item.amount ?? "-"}</span>
                                            <AnimatePresence>
                                                {totalCapWarning && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 40 }}
                                                        animate={{ opacity: 1, y: 20 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-red-500 text-sm mt-1 absolute bg-gradient-to-r from-[#969900]/90 via-[#969900] to-[#969900] backdrop-brightness-75 rounded-sm py-2 px-4 right-[40%] top-20"
                                                    >
                                                        Amount values cannot exceed the total cap. Please adjust the amounts again. (Total Cap = {generateToken.tokenCap})
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    {
                                        index !== (generateToken.initialBalances.length - 1) &&
                                        <span className={`w-[calc(100%-8px)] h-[2px] my-8 block ${totalCapWarning ? "bg-[#969900]" : "bg-[#004E99]"}`} />
                                    }
                                </>
                            ))
                        }
                    </div>
                    <button onClick={() => { setActiveStep(StepTypes.initialBalances); }}>
                        <EditIcon />
                    </button>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='space-y-10'>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Minter Address
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{getCroppedString(generateToken.minterAddress ?? "", 6, 8) ?? "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Token Cap
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{generateToken.tokenCap ?? "-"}</span>
                        </div>
                    </div>
                    <button onClick={() => { setActiveStep(StepTypes.mintingDetails); }}>
                        <EditIcon />
                    </button>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='flex gap-16'>
                        <div className='flex items-center'>
                            <Text size="lg" className='text-white/60'>
                                Admin Fee
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{generateToken.adminFee?.status ? `%${generateToken.adminFee.value}` : "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Distribution to Holders
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{generateToken.holders?.status ? `%${generateToken.holders.value}` : "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Token Burn
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{generateToken.tokenBurn?.status ? `%${generateToken.tokenBurn.value}` : "-"}</span>
                        </div>
                    </div>
                    <button onClick={() => { setActiveStep(StepTypes.tokenFunctions); }}>
                        <EditIcon />
                    </button>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='space-y-6 flex-1 mr-10'>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Project
                            </Text>
                            <span className='font-normal ml-2 text-lg truncate'>{generateToken.project ?? "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Logo
                            </Text>
                            <span className='font-normal ml-2 text-lg truncate'>{generateToken.logoUrl ?? "-"}</span>
                        </div>
                        <div className='h-20 w-20 rounded-md border border-white/20 items-center justify-center flex'>
                            {generateToken.logoUrl ?
                                <img src={generateToken.logoUrl} />
                                :
                                <EmptyImagesIcon />
                            }
                        </div>
                        <div className='max-w-[600px] overflow-hidden'>
                            <Text size="lg" className=' text-white/60'>
                                Description
                            </Text>
                            <p className='font-normal my-2 text-lg'>{generateToken.description ?? "-"}</p>
                        </div>
                    </div>
                    <button onClick={() => { setActiveStep(StepTypes.marketing); }}>
                        <EditIcon />
                    </button>
                </div>
            </div>


            <GradientButton
                loading={processLoading}
                onClick={handleInstantiateToken}
                disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
                className="min-w-[176px] md:min-w-[374px] h-11 mt-8 ml-auto"
                rounded="rounded-lg"
            >
                <Text>Create Token</Text>
            </GradientButton>
        </div>
    )
}

export default Preview