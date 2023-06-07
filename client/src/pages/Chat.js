import React from 'react'
import bot from '../assets/bot.svg';
import user from '../assets/user.svg';


const Chat = ({ conversation}) => {

    return (
        <div id='chat_container'>
            <div className={conversation.isAi ? 'wrapper ai' : 'wrapper'}>
                <div className="chat">
                    <div className="profile">
                        <img
                            src={conversation.isAi ? bot : user}
                            alt={conversation.isAi ? 'bot' : 'user'}
                        />
                    </div>
                    <div className="message" id={conversation.id}>{conversation.text}</div>
                </div>
            </div>
        </div>
    )
}

export default Chat