import { CopyIcon } from '@/components/icons';
import React, { useState } from 'react';
import Text from '@/components/Text';
import { useSearchParams } from 'next/navigation';
import { getCroppedString } from '@/utils/stringUtils';

const TokenResponse = () => {
  const searchParams = useSearchParams();

  const [copied, setCopied] = useState(false);

  // Function to copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(searchParams?.get("success") || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div>
      <Text size='3xl'>Your token is ready</Text>
      <Text size="sm" weight='font-regular' className='mt-1'>You can find and copy the contract address of your token below.</Text>

      <div className="w-full bg-[#0c0c2766] border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-12 flex flex-col gap-4 md:mt-6">
        <div className='flex justify-between'>
          <div className='flex items-start flex-col gap-4'>
            <Text size="lg" className='text-white/60'>Contract Address</Text>
            <span className='font-normal text-lg'>
              {getCroppedString(searchParams?.get("success") ?? "", 6, 18) ?? "-"}
            </span>
          </div>
          <button onClick={copyToClipboard}>
            {copied ? <Text size="sm" className="text-green">Copied</Text> : <CopyIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TokenResponse;
