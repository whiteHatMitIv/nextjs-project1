"use client"

import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const MyProfile = () => {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<PostInit[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            if (!session?.user.id) return

            const response = await fetch(`/api/users/${session.user.id}/posts`)
            const data = await response.json()

            setPosts(data)
            setLoading(false)
        }

        if (session?.user.id) {
            fetchPosts()
        } else {
            setLoading(false) // Handle the case when no session exists
        }
    }, [session?.user.id]) // Adding dependency on session

    const handleEdit = (post: PostInit) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post: PostInit) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                })

                const filteredPosts = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (status === "loading" || loading) {
        return <div>Loading...</div> // Loading state
    }

    if (!session) {
        return <div>Please log in to see your profile.</div> // Not logged in
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
