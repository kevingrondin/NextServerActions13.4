"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { deletePost } from '@/actions/postActions'
import PostCard from "@/components/PostCard";

const PostList = ({ posts }) => {
  const [optimisticPosts, addOptimisticPosts] = useOptimistic(
    { posts },
    (state, newPosts) => ({ ...state, posts: newPosts })
  );

  async function handleDelete(postId: any) {
    if (window.confirm("Are you sure you want to delete this post?")) {
        const newPosts = posts.filter( post => post._id !== postId);
        addOptimisticPosts({ posts: newPosts });
        await deletePost(postId);
    }
  }

  return (
    <div className="flex pt-10 space-x-5">
      {optimisticPosts.posts.map((post) => (
        <PostCard key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PostList;
