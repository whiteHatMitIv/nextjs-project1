"use client"

import Form from '@/components/Form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditPrompt = () => {
    const router = useRouter()
    // const searchParams = useSearchParams()
    // const promptId = searchParams.get('id')

    const [promptId, setpromptId] = useState<string | null>(null)

    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search)
        const id = searchParams.get('id')
        if (id) {
          setpromptId(id)
        }
      }
    }, [])

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setpost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e: React.FormEvent) => {
        e.preventDefault()
        setsubmitting(true)

        if(!promptId) return alert("Prompt ID not found")

        try {
            const response = await fetch(`api/prompt/${promptId}`, 
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
            type="Edit"
            post={post}
            setpost={setpost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt