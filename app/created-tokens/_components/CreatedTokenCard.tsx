"use client";

import { CheckIcon, CopyIcon, EditIcon, EmptyImagesIcon } from '@/components/icons';
import { getCroppedString } from '@/utils/stringUtils';
import React, { FC, useState } from 'react'
import Text from "@/components/Text";
import { GeneratedTokenInfo } from '@/types/types';
import Link from 'next/link';

const CreatedTokenCard: FC<{ item: GeneratedTokenInfo }> = ({ item }) => {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl p-4" href={`/created-tokens/detail/${item.id}`}>
      <div className='flex items-center gap-2'>
        <div className='h-12 w-12 shrink-0 rounded-full border border-white/20 items-center justify-center flex'>
          {item.logo_url ?
            <img src={item.logo_url} className='object-cover rounded-full' alt={item.project_name} />
            :
            <EmptyImagesIcon />
          }
        </div>
        <Text size="sm" className='truncate'>{item.name} ({item.symbol})</Text>
      </div>
      <button onClick={copyToClipboard} className='flex gap-4 mt-4 justify-between w-full'>
        <span className='font-normal text-xs'>
          {getCroppedString(item.contract_address, 6, 16) ?? "-"}
        </span>
        {copied ? <CheckIcon/> : <CopyIcon />}
      </button>
    </Link>
  )
}

export default CreatedTokenCard