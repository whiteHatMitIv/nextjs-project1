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
  const [searchText, setsearchText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setfilteredPosts] = useState<Post[]>([])

  const handleSearchChange = (text: string) => {
    // const text = e.target.value
    setsearchText(text)

    const filtered = posts.filter(
      (post) =>
        post.creator.username.toLowerCase().includes(text.toLowerCase()) ||
        post.tag.toLowerCase().includes(text.toLowerCase()) ||
        post.prompt.toLowerCase().includes(text.toLowerCase())
    )

    setfilteredPosts(filtered)
  }

  const handleTagClick = (tag: string) => {
    handleSearchChange(tag)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      console.log(data)

      setPosts(data)
      setfilteredPosts(data)
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
            onChange={(e) => handleSearchChange(e.target.value)}
            required
            className='search_input peer'
          />
        </form>

        <PromptCardList
          data={filteredPosts}
          handleTagClick={handleTagClick}
        />
      </section>
    </>
  )
}

export default Feed