"use client"

import { ClientSafeProvider, getProviders, signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    fetchProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/images/logo.svg" 
          alt="The logo"
          width={40} 
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link> 

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                priority
                src={session?.user.image ?? "images/logo.svg"}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                type="button" 
                key={provider.name}
                onClick={() => signIn(provider.name)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              priority
              src={session?.user.image ?? "images/logo.svg"}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button 
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                type="button" 
                key={provider.name}
                onClick={() => signIn(provider.name)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav