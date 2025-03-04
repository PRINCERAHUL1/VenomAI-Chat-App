import React from 'react'
import { useLocation } from 'react-router-dom'

const Project = () => {

    const location = useLocation()
  
    console.log(location.state)
  
    return (
    <div>
        <main
        className='h-screen w-screen flex'
        >

            <section className="left flex flex-col h-full min-w-72 bg-slate-300">

                <header
                className='flex justify-end p-2 px-4 w-full bg-slate-100'>
                    <button className='p-2 px-4'>
                        <i className="ri-group-fill"></i>
                    </button>                    
                </header>

                <div className="conversation-area flex-grow flex flex-col">
                    <div className="message-box p-1 flex-grow flex flex-col gap-1">
                        <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small
                            className='opacity-65 text-xs'
                            >example@gmail.com</small>
                            <p className='text-sm'>lorem ipsum dolor sit amet. lore</p>
                        </div>
                        <div className="ml-auto message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small
                            className='opacity-65 text-xs'
                            >example@gmail.com</small>
                            <p className='text-sm'>lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                        <div className="inputField w-full flex">
                            <input 
                            className='p-2 px-4 border-none outline-none'
                            type="text" placeholder='Enter message'/>
                            <button 
                            className='flex-grow px-3'
                            ><i className="ri-send-plane-fill"></i></button>
                        </div>
                </div>
            </section>

        </main>
    </div>
  )
}

export default Project