"use server"
import connectDB from "@/database/mongodb"
import Post from "@/models/postModel"
import { revalidatePath } from "next/cache"

connectDB()

export async function createPost(data){
    try{
        const newPost = new Post(data)
        await newPost.save()

        revalidatePath("/")

        return {...newPost._doc, _id: newPost._id.toString()}
    } catch(error){
        return error
    }
}

export async function getPosts(searchParams){
    const search = searchParams.search || ''
    const sort = searchParams.sort || 'createdAt'

    const limit = searchParams.limit * 1 || 2;
    const page = searchParams.page * 1 || 1;
    const skip = searchParams.skip * 1 || limit * (page - 1);

    try{
        const posts = await Post.find({ title: { $regex: search } })
            .sort(sort)
            .limit(limit)
            .skip(skip)

        const count = await Post.find({ title : { $regex: search } }).count()

        const totalPage = Math.ceil(count / limit)
            
        const newData = posts.map(post => (
            {...post._doc, _id: post._id.toString()}
        ))
        return {posts: newData, count, totalPage}
    } catch(error){
        return error
    }
}

export async function getPost(postId){
    try {
        const post = await Post.findById(postId)
        return {...post._doc, _id: post._doc._id.toString()}
    } catch(error){
        throw new Error(error.message || "Failed to get post")
    }
}

export async function updatePost({title, image, id}){
    try{
        const post = await Post.findByIdAndUpdate(id, {title, image}, {new: true})
        revalidatePath("/")

        return {...post._doc, _id: post._id.toString()}
    }catch(error){
        throw new Error(error.message || "Failed to update post")
    }
}

export async function deletePost(postId){
    try{
        await Post.findByIdAndDelete(postId)
        revalidatePath("/")

        return {message: "Post deleted successfully"}
    }catch(error){
        throw new Error(error.message || "Failed to delete post")
    }
}
