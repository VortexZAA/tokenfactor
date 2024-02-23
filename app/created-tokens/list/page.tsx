import React from 'react'
import CreatedTokens from '../_components/CreatedTokens'
import pb from '@/lib/pocketbase';
import { GeneratedTokenInfo } from '@/types/types';

const getCreatedTokens = async () => {
    const result = await pb.collection('token_create').getList(1, 50);

    return result;
}

const page = async () => {
    const data = await getCreatedTokens();
    const createdList = data.items as GeneratedTokenInfo[];

    return (
        <CreatedTokens createdList={createdList}/>
    )
}

export default page