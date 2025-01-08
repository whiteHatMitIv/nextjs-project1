"use client"

import Form from '@/components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePrompt = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e: React.FormEvent) => {
        e.preventDefault()
        setsubmitting(true)

        try {
            const response = await fetch('api/prompt/new', 
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsubmitting(false)
        }
    }

    return (
        <Form 
            type="Create"
            post={post}
            setpost={setpost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt