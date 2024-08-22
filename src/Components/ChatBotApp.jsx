import React from 'react'
import './ChatBotApp.css'

const ChatBotApp = ( {onGoBack} ) => {
  return ( 
  <div className="chat-app">
    <div className="chat-list">
        <div className="chat-list-header">
            <h2>Chat List</h2>
            <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list-item active">
          <h4>Chat 20/07/2024 11:38:35 PM</h4>  
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 20/07/2024 11:38:35 PM</h4>  
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 20/07/2024 11:38:35 PM</h4>  
          <i className="bx bx-x-circle"></i>
        </div>
    </div>
    <div className="chat-window">
      <div className="chat-title">
        <h3>Chat with AI</h3>
        <i onClick={onGoBack} className="bx bx-arrow-back arrow"></i>
      </div>
      <div className="chat">
        <div className="prompt">Hi, how are you?
            <span>12:51:12 AM</span>
        </div>
        <div className="response">Hello! I'm doing great! how can I help today?
            <span>12:51:13 AM</span>
        </div>
        <div className="typing">Typing...</div>
      </div>
        <form className="msg-form">
            <i className="bx bxs-smile"></i>
            <input type="text" className="msg-input" placeholder="Type a message..."></input>
            <i className="bx bxs-paper-plane"></i>
        </form>  
    </div>
  </div>
  )
}

export default ChatBotApp
