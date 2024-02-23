import React from 'react'
import CreatedTokens from '../../_components/CreatedTokens'
import pb from '@/lib/pocketbase';
import CreatedTokensDetail from '../../_components/CreatedTokensDetail';
import { GeneratedTokenInfo } from '@/types/types';
export const runtime = 'edge';
const getCreatedTokens = async (tokenId: string) => {
    const result = await pb.collection('token_create').getOne(tokenId);

    return result;
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
    const tokenDetail = await getCreatedTokens(id) as GeneratedTokenInfo;

    return (
        <CreatedTokensDetail tokenDetail={tokenDetail} />
    )
}

export default page