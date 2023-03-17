
// import './App.css'
import { useState } from 'react'
import ChatBody from './components/ChatBody'
import Chatinputs from './components/Chatinputs'
import {useMutation} from 'react-query';
import { fetchResponse } from './api';
function App() {

  const [chat,setChat] = useState([])

  const mutation = useMutation({
    mutationFn: ()=>{
      return fetchResponse(chat);
    },
    onSuccess: (data)=> setChat((prev)=>[...prev,{sender:'ai',message:data.message.replace(/^\n\n/,"")}])
  })
  
  const sendMessage = async (message)=>{
    await Promise.resolve(setChat((prev)=>[...prev,message]))
    mutation.mutate();
  }
  return (
  <div className='bg-[#1A232E] h-screen py-0 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle'>

    <div className="gradient-01 z-0 absolute"></div>
    <div className="gradient-02 z-0 absolute"></div>
    <div></div>

    {/* Header */}
    <div className='uppercase font-bo
     text-2xl text-center pt-10 mb-3'>ChatGPT  2.0</div>

    {/* body */}
    <div className='h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] px-4 py-8 self-center
    scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md
    '><ChatBody chat={chat}/></div>

    {/* input */}
    <div className=' w-[60%] max-w-4x1 min-w-[20rem] py-8 bottom-3  self-center'><Chatinputs sendMessage={sendMessage} loading={mutation.isLoading}/></div>
  </div>
  )
}

export default App
