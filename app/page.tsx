import Feed from "@/components/Feed"

const HomePage = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share</h1>
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center text-5xl font-extrabold leading-[1.15] sm:text-6xl">AI-Powered Prompts</span>
        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for modern
            world to discover, create and share creative prompts.
        </p>

        <Feed/>
    </section>
  )
}

export default HomePage