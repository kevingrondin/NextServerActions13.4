"use client"
import { useMyContext } from '@/context/Provider'
import Image from 'next/image'
import Link from 'next/link'
import React, { useTransition } from 'react'

const PostCard = ({ post, handleDelete }) => {
    const { setEditPost } = useMyContext()
    let [isPending, startTransition] = useTransition()

    return (
        <div>
            <Link href={`/post/${post._id}`}>
                <Image
                    src={post?.image}
                    alt='image'
                    width={200}
                    height={200}
                    priority
                />
                <h3>{post?.title}</h3>
            </Link>
            <div className='space-x-2'>
                <button 
                    className='bg-gray-200 p-2 text-gray-600'
                    onClick={() => setEditPost(post)}
                >
                    Edit
                </button>
                <button 
                    className='bg-gray-200 p-2 text-gray-600'
                    onClick={() => startTransition(() => handleDelete(post._id))}
                    disabled={isPending}
                >
                    {isPending ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}

export default PostCard