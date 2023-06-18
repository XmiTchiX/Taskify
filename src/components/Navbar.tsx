'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function () {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav>
      <button
        className='md:hidden flex items-center'
        onClick={() => setOpen(true)}
      >
        <Image src='/icons/menu.svg' alt='menu' height={30} width={30} />
      </button>
      <div
        onClick={() => setOpen((state) => !state)}
        className={`md:hidden fixed z-20 top-0 left-0 cursor-pointer h-screen w-screen bg-black transition-[opacity] duration-500 ease-in-out ${
          open ? 'translate-x-0 opacity-25' : '-translate-x-full opacity-0'
        }`}
      />
      <ul
        className={`flex h-full md:items-center flex-col md:flex-row gap-8 md:gap-4 md:translate-x-0 transition-transform md:transition-none duration-500 
            ease-in-out bg-white py-8 pl-10 pr-20 md:p-0 z-20 fixed top-0 left-0 md:static shadow-[0_0_10px_5px_rgba(0,0,0,.1)] md:shadow-none
            font-semibold text-xl md:text-base ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
      >
        <button
          className='absolute right-5 md:hidden'
          onClick={() => setOpen(false)}
        >
          <Image src='/icons/close.svg' alt='menu' height={30} width={30} />
        </button>
        {session?.user && (
          <>
            <li>
              <Link href='/tasks/create'>Create Task</Link>
            </li>
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
            <li>
              <Link href='/tasks/mine'>My tasks</Link>
            </li>
          </>
        )}

        {session?.user ? (
          <li className='block md:hidden mt-12'>
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        ) : (
          <li className='block md:hidden'>
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
      </ul>
    </nav>
  )
}
