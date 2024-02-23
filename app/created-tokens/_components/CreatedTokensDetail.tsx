import React, { FC, useEffect, useState } from 'react'
import Text from "@/components/Text";
import GradientButton from '@/components/Buttons/GradientButton';
import { StepTypes, useStep } from '@/contexts/StepProvider';
import { EditIcon, EmptyImagesIcon, LeftArrowIcon } from '@/components/icons';
import { getCroppedString } from '@/utils/stringUtils';
import { useNotification } from '@/contexts/NotificationProvider';
import OutlinedButton from '@/components/Buttons/OutlinedButton';
import { GeneratedTokenInfo } from '@/types/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
    tokenDetail: GeneratedTokenInfo
}
const CreatedTokensDetail: FC<Props> = ({ tokenDetail }) => {

    return (
        <div>
            <Text size='3xl'>Created tokens</Text>
            <Text size="sm" weight='font-regular' className='mt-1'>View and manage all created tokens.</Text>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='flex items-start flex-col gap-4'>
                        <Text size="lg" className='text-white/60'>Token Name (SYMBOL)</Text>
                        <span className='font-normal text-lg'>{tokenDetail.name} ({tokenDetail.symbol})</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='space-y-10'>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Contract Address
                            </Text>
                            <span className='font-normal ml-4 text-lg'>{tokenDetail.contract_address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='space-y-10'>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Minter Address
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{getCroppedString(tokenDetail.mint_address ?? "", 6, 16) ?? "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Token Cap
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{tokenDetail.total_suply ?? "-"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='flex gap-16'>
                        <div className='flex items-center'>
                            <Text size="lg" className='text-white/60'>
                                Admin Fee
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{tokenDetail.admin_fee ? `%${tokenDetail.admin_fee}` : "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Distribution to Holders
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{tokenDetail.distribution_to_holders ? `%${tokenDetail.distribution_to_holders}` : "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Token Burn
                            </Text>
                            <span className='font-normal ml-2 text-lg'>{tokenDetail.token_burn ? `%${tokenDetail.token_burn}` : "-"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
                <div className='flex justify-between'>
                    <div className='space-y-6 flex-1 mr-10'>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Project
                            </Text>
                            <span className='font-normal ml-2 text-lg truncate'>{tokenDetail.project_name || "-"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Text size="lg" className=' text-white/60'>
                                Logo
                            </Text>
                            <span className='font-normal ml-2 text-lg truncate'>{tokenDetail.logo_url || "-"}</span>
                        </div>
                        <div className='h-20 w-20 rounded-md border border-white/20 items-center justify-center flex'>
                            {tokenDetail.logo_url ?
                                <img src={tokenDetail.logo_url} />
                                :
                                <EmptyImagesIcon />
                            }
                        </div>
                        <div className='w-80'>
                            <Text size="lg" className=' text-white/60'>
                                Description
                            </Text>
                            <p className='font-normal my-2 text-lg'>{tokenDetail.description || "-"}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex gap-4'>
                <Link className='text-white flex gap-2 items-center font-normal leading-8 text-xl pt-8 flex-1' href={'/created-tokens/list'}>
                    <LeftArrowIcon />
                    <span className='underline'>Back</span>
                </Link>
                <div className='flex ml-auto space-x-4'>
                    <OutlinedButton
                        disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
                        className="min-w-[176px] md:min-w-[274px] h-11 mt-8"
                    >
                        <Text>Burn</Text>
                    </OutlinedButton>
                    <GradientButton
                        disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
                        className="min-w-[176px] md:min-w-[274px] h-11 mt-8"
                        rounded="rounded-lg"
                    >
                        <Text>Send</Text>
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}

export default CreatedTokensDetail