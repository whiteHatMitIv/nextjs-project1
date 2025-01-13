import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@/styles/globals.css'

export const metadata = {
    title: "Promptopia",
    description: "Discover & share AI prompts",
    keywords: "AI, prompts, discovery, sharing",
    icons: {
        icon: '/images/logo.svg'
    },
    viewport: "width=device-width, initial-scale=1"
}

const Rootlayout = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout