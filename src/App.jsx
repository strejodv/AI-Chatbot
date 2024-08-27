import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
 
  const handleStartChat = () => {
    setIsChatting(true)

    if(chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  const createNewChat = () => {
    const newChat = {
      id: `Chat ${new Date().toLocaleDateString
      ("en-GB")} ${new Date().toLocaleTimeString()}`,
      messages: [],
    }

    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    setActiveChats(newChat.id)
  }
    
 



  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp 
        onGoBack={handleGoBack} 
        chats={chats} 
        setChats={setChats} 
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onNewChat={createNewChat}/>
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}

export default App


