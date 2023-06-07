"use client"
import { createPost, updatePost } from '@/actions/postActions'
import { useRef } from 'react'
import ButtonSubmit from './ButtonSubmit'
import { useMyContext } from '@/context/Provider'

const PostForm = () => {
    const formRef = useRef()
    const { editPost, setEditPost } = useMyContext()

    async function handleAction(formData : any) {
        const title = formData.get('title')
        const image = formData.get('image')

        if(editPost) {
            await updatePost({ title, image, id: editPost._id })
            setEditPost(null)
        } else {
            await createPost({ title, image })
        }

        formRef.current.reset()
    }

    return (
        <form action={handleAction} className='flex mt-5 space-x-5' ref={formRef} >
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                className='text-gray-800 bg-blue-200' 
                required 
                defaultValue={editPost?.title}
            />
            <input 
                type="text" 
                name="image" 
                placeholder="image" 
                required 
                defaultValue={editPost?.image}
            />
            {
                editPost ?
                <>
                    <ButtonSubmit value="Update" />
                    <button
                        type='button' 
                        onClick={() => setEditPost(null)} 
                        className='bg-gray-200 p-2 text-gray-600'
                    >
                        Cancel
                    </button>
                </>
                :
                <ButtonSubmit value="Create" />
            }
        </form>
    )
}

export default PostForm