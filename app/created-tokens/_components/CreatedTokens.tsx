import React, { FC, useEffect, useState } from 'react'
import Text from "@/components/Text";
import GradientButton from '@/components/Buttons/GradientButton';
import { StepTypes, useStep } from '@/contexts/StepProvider';
import { EditIcon, EmptyImagesIcon } from '@/components/icons';
import { getCroppedString } from '@/utils/stringUtils';
import { useNotification } from '@/contexts/NotificationProvider';
import OutlinedButton from '@/components/Buttons/OutlinedButton';
import pb from '@/lib/pocketbase';
import { GeneratedTokenInfo } from '@/types/types';
import CreatedTokenCard from './CreatedTokenCard';

interface Props {
    createdList: GeneratedTokenInfo[]
}
const CreatedTokens: FC<Props> = ({ createdList }) => {

    return (
        <div className='ml-auto min-[749px]'>
            <Text size='3xl'>Created tokens</Text>
            <Text size="sm" weight='font-regular' className='mt-1'>View and manage all created tokens.</Text>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                {createdList.map(item => {
                    return <CreatedTokenCard key={item.id} item={item} />
                })}
            </div>
        </div>
    )
}

export default CreatedTokens;