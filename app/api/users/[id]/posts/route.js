import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt'

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const { id } = await params

        const prompts = await Prompt.find({
            creator: id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all posts", { status: 500 })
    }
}