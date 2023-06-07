import React from 'react'
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import { getPosts } from '@/actions/postActions'
import Feature from '@/components/Feature'
import Pagination from '@/components/Pagination'


const Home = async ({ params, searchParams }) => {
  const { posts, totalPage } = await getPosts(searchParams)
  return (
    <div className='flex flex-col p-10 bg-gray-100'>
      <div>
        <h1>NextJs Server Action test</h1>
      </div>
      <div>
        <PostForm />
      </div>
      <div>
        <Feature />
      </div>
      <div>
        {posts && <PostList posts={posts} />}
      </div>
      <div>
        { totalPage && <Pagination totalPage={totalPage} /> }
      </div>
    </div>
  )
}
export default Home