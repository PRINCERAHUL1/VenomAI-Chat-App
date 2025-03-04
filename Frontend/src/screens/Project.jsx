import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import {UserContext} from '../context/user.context'

const Project = () => {
    const location = useLocation()
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState([])
    const [project, setProject] = useState(location.state.project)
    const [message, setMessage] = useState('')
    const {user} = useContext(UserContext)
    const messageBox = React.createRef()

    const [users, setUsers] = useState([])

    const handleUserSelect = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
            newSelectedUserId.delete(id);
            } else {
            newSelectedUserId.add(id);
            }
            return newSelectedUserId;
        });
    }

    function addColaborators() {
        axios.put('/projects/add-user', {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {

            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })
    }

    const send = () =>  {

        sendMessage('project-message', {
            message,
            sender: user.email,
        })

        appendOutgoingMessage(message);

        setMessage("")
    }

    useEffect(() => {

        initializeSocket(project._id)

        receiveMessage('project-message', data => {
            console.log(data)
            appendIncomingMessage(data);
        });



        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
            setProject(res.data.project)
        }).catch(err => {
            console.log(err)
        })


        axios.get('/users/all').then(res => {
            setUsers(res.data.users)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function appendIncomingMessage(messageObject) {
        const messageBox = document.querySelector('.message-box')

        const message = document.createElement('div')
        message.classList.add('message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md')
        message.innerHTML = `
            <small class='opacity-65 text-xs'>${messageObject.sender}</small>
            <p class='text-sm'>${messageObject.message}</p>
        `
        messageBox.appendChild(message)
        scrollToBottom()
    }

    function appendOutgoingMessage(message){
        const messageBox = document.querySelector('.message-box')

        const messageElement = document.createElement('div')
        messageElement.classList.add('ml-auto', 'message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md')
        messageElement.innerHTML = `
            <small class='opacity-65 text-xs'>${user.email}</small>
            <p class='text-sm'>${message}</p>
        `
        messageBox.appendChild(messageElement)
        scrollToBottom()
    }

    function scrollToBottom(){
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }


    return (
        <div>
            <main className='h-screen w-screen flex'>
                <section className="left relative flex flex-col h-screen min-w-80 bg-slate-300">
                    <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute top-0'>
                        <button className='flex gap-2 ' onClick={() => setIsModalOpen(true)}>
                            <i className="ri-add-fill mr-1"></i>
                            <p>Add Collaborator</p>
                        </button>
                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 px-4'>
                            <i className="ri-group-fill"></i>
                        </button>
                    </header>

                    <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
                            <div 
                            ref={messageBox}
                            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
                            </div>
                        <div className="inputField w-full flex absolute bottom-0">
                            <input 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                            <button 
                            onClick={send}
                            className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                        </div>
                    </div>

                    <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                        <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
                            <h1 className='font-semibold text-lg'>Collaborators</h1>
                            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users flex flex-col gap-2">
                            {project.users && project.users.map(user => {
                                return (
                                        <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center ">
                                            <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                                <i className='ri-user-fill absolute'></i>
                                            </div>
                                            <h1 className='font-semibold text-lg'>{user.email}</h1>
                                        </div>)
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-xl">&times;</button>
                        </header>
                        <div className="user-list flex flex-col gap-2 mb-16 max-h-96 overflow-y-auto">
                            {users.map(user => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id)!=-1?'bg-slate-200':''} p-2 flex gap-2 items-center`} onClick={() => handleUserSelect(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className='ri-user-fill absolute'></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                        onClick={addColaborators}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded">
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Project