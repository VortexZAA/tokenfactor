'use client';

import CreatedTokenCard from '@/app/created-tokens/_components/CreatedTokenCard';
import OutlinedButton from '@/components/Buttons/OutlinedButton';
import pb from '@/lib/pocketbase';
import { GeneratedTokenInfo } from '@/types/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { FC, use, useEffect, useState } from 'react'


const INTERVAL_TIME = 8000;
const content:
  { title: string, desc: string, linkStr?: string, linkUrl?: string }[] = [
    {
      title: "All Cosmos chains, One token creator",
      desc: "In all Cosmos chains where Token factory deployed, you can create your own token according to your wishes using the Token factory app."
    },
    {
      title: "All Cosmos chains, One token creator",
      desc: "In all Cosmos chains where Token factory deployed, you can create your own token according to your wishes using the Token factory app."
    },
    {
      title: "All Cosmos chains, One token creator",
      desc: "In all Cosmos chains where Token factory deployed, you can create your own token according to your wishes using the Token factory app."
    },
    {
      title: "All Cosmos chains, One token creator",
      desc: "In all Cosmos chains where Token factory deployed, you can create your own token according to your wishes using the Token factory app."
    },
    {
      title: "All Cosmos chains, One token creator",
      desc: "In all Cosmos chains where Token factory deployed, you can create your own token according to your wishes using the T-Okenator app."
    }
  ]

const InfoSide: FC = () => {

  const [showContentIdx, setShowContentIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const [newestTokens, setNewestTokens] = useState<GeneratedTokenInfo[]>([]);

  useEffect(() => {
    getCreatedTokens();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!hovering) {
      timer = setInterval(() => {
        setShowContentIdx(prev => (prev + 1) === content.length ? 0 : (prev + 1));
      }, INTERVAL_TIME);
    }

    return () => {
      clearInterval(timer);
    };
  }, [hovering]);

  const getCreatedTokens = async () => {
    const result = await pb.collection('token_create').getList(1, 4);
    const items = result.items as GeneratedTokenInfo[];

    setNewestTokens(items);
  }

  const handleHover = (isHovering: boolean) => {
    setHovering(isHovering);
  };

  const renderDescription = () => {
    const item = content[showContentIdx];
    if (item.linkStr && item.linkUrl) {
      const parts = item.desc.split(item.linkStr);
      return (
        <>
          {parts[0]}
          <Link target={"_blank"} href={item.linkUrl} className="text-[#F8B810] animate-pulse">
            {item.linkStr}
          </Link>
          {parts[1]}
        </>
      );
    }
    return item.desc;
  };

  return (
    <div
      className="md:max-w-[400px] w-full md:w-[379px] px-4 pt-6 md:p-0 group"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        key={showContentIdx}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.98 }}
        transition={{ ease: "easeInOut", duration: 1.2 }}
        layout
        className="min-h-[102px] md:min-h-[226px]"
      >
        <h1 className="text-white text-2xl md:text-[39px] md:leading-[50px] font-semibold">{content[showContentIdx].title}</h1>
        <h2 className="text-sm md:text-base text-ghost-white leading-6 font-medium mt-2 md:mt-4">
          {renderDescription()}
        </h2>
      </motion.div>
      <div className='space-x-2 md:space-x-1 group-hover:opacity-100 md:opacity-0 transition-opacity my-2'>
        {
          content.map((i, idx) => {
            return <button key={idx} onClick={() => { setShowContentIdx(idx); }} className={`md:w-2 md:h-2 w-6 h-1 rounded-sm ${showContentIdx === idx ? "bg-celticBlue" : "bg-ghost-white"}`} />
          })
        }
      </div>

      {newestTokens.length > 0 &&
        <>
          <h3 className='text-lg text-ghost-white leading-6 font-medium mb-4'>Newest Tokens</h3>
          <div className='grid grid-cols-2 gap-2 mb-4'>
            {newestTokens.map(item => {
              return <CreatedTokenCard key={item.id} item={item} />
            })}
          </div>
          <Link href={'/created-tokens/list'} className='w-full'>
            <OutlinedButton
              disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
              className="w-full h-11"
              containerClassName='w-full'
            >
              <span className='font-medium'>All Craeted Tokens</span>
            </OutlinedButton>
          </Link>
        </>
      }
    </div>
  )
}

export default React.memo(InfoSide)