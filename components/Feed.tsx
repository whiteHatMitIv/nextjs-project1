"use client"

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { Post } from '@/types/promptcardlistType'

const PromptCardList: React.FC<{ 
  data: Post[],
  handleTagClick: (tag: string) => void 
}> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setsearchText] = useState('')
  const [posts, setPosts] = useState([])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleSearchChange = (_e: any) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])
  
  return (
    <>
      <section className='feed'>
        <form className='relative w-full flex-center'>
          <input 
            type="text" 
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>

        <PromptCardList
          data={posts}
          handleTagClick={() => {}}
        />
      </section>
    </>
  )
}

export default Feed