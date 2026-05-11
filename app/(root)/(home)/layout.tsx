import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode } from 'react'

const Homelayout = (props: {children: ReactNode}) => {
  return (
    <main className="relative">
      <Navbar/>
      <div className="flex">
      <Sidebar/>
        <section className="flex flex-1 flex-col min-h-full px-6 pb-6 pt-28 
        max-md:pb-14 sm:px-14 bg-dark-1">
          <div className="w-full">
            {props.children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Homelayout