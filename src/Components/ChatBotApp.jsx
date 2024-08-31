import React from 'react'
import './ChatBotApp.css'
import { useState, useEffect } from 'react'



const ChatBotApp = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(chats[0]?.messages || [])
  const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
      const activeChatObj = chats.find((chat) => chat.id === activeChat)
      setMessages(activeChatObj ? activeChatObj.messages : [])
    }, [activeChat, chats])

    const handleInputChange = (e) => {
      setInputValue(e.target.value)
    }

    const sendMessage = async () => {
      if (inputValue.trim() === '') return

      const newMessage = {
        type: 'prompt',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString(),
      }

      if(!activeChat) {
        onNewChat(inputValue)
        setInputValue("")
      } else {
        const updatedMessages = [...messages, newMessage]
      setMessages(updatedMessages)
      setInputValue('')

      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessages }
        }
        return chat
      })
      setChats(updatedChats)
      setIsTyping(true)

      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: inputValue}],
          max_tokens: 500,
        }),
      })

      const data = await response.json()
      const chatResponse = data.choices[0].message.content.trim()

      const newResponse = {
        type: 'response',
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      }

      const updatedMessagesWithResponse = [...updatedMessages, newResponse]
      setMessages(updatedMessagesWithResponse)
      setIsTyping(false)

      const updatedChatsWithResponse = chats.map((chat) => {
        if(chat.id === activeChat) {
          return {...chat, messages: updatedMessagesWithResponse}
        }
        return chat
      })
      setChats(updatedChatsWithResponse)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        sendMessage()
      }
    }

    const handleSelectChat = (id) => {
      setActiveChat(id)
    }

    const handleDeleteChat = (id) => {
      const updatedChats = chats.filter((chat) => chat.id !== id)
      setChats(updatedChats)
      
      if(id === activeChat) {
        const newActiveChat = updatedChats.length > 0 ?
        updatedChats[0].id : null
        setActiveChat(newActiveChat)
      }
    }

  return ( 
  <div className="chat-app">
    <div className="chat-list">
        <div className="chat-list-header">
            <h2>Chat List</h2>
            <i className="bx bx-edit-alt new-chat" onClick={() => onNewChat()}></i>
        </div>
        {chats.map((chat) => (
          <div 
          key={chat.id} 
          className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`} 
          onClick={() => handleSelectChat(chat.id)}>
          <h4>{chat.displayId}</h4>  
          <i className="bx bx-x-circle" onClick={(e) => {
            e.stopPropagation()
            handleDeleteChat(chat.id)
          }}></i>
        </div>
        ))}
    </div>
    <div className="chat-window">
      <div className="chat-title">
        <h3>Chat with AI</h3>
        <i onClick={onGoBack} className="bx bx-arrow-back arrow"></i>
      </div>
      <div className="chat">
        {messages.map((msg, index) =>  (
          <div key={index} className={msg.type === 'prompt' ? 'prompt' : 'response'}>
            {msg.text}
            <span>{msg.timestamp}</span>
          </div>
        ))} 
        {isTyping && <div className="typing">Typing...</div>}
      </div>
        <form className="msg-form" onSubmit={() => e.preventDefault()}>
            <i className="bx bxs-smile"></i>
            <input type="text" className="msg-input" placeholder="Type a message..." 
            value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
            <i className="bx bxs-paper-plane" onClick={sendMessage}></i>
        </form>  
    </div>
  </div>
  )
}

export default ChatBotApp


