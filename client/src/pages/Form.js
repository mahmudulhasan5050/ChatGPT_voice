import React, { useState, useEffect } from 'react'

import send from '../assets/send.svg';
import { generateUniqueId } from '../components/funcShop';
import { axiosCall } from '../axios';

import SpeechRecog from '../components/SpeechRecog';


const Form = ({ conversation, setConversation }) => {
  const [text, setText] = useState('');
  const [finalTextForAi, setFinalTextForAi] = useState('');

  useEffect(() => {
    const answerFromAi = async (text) => {
      const response = await axiosCall(text).then((res) => {
        return res.data.bot
      })
      console.log(response)
      const idGenForAi = generateUniqueId()
      setConversation([...conversation, { id: idGenForAi, text: response, isAi: true }])
    }

    if (finalTextForAi !== '') {
      answerFromAi(finalTextForAi);
      setFinalTextForAi('')
    }

  }, [conversation, finalTextForAi, setConversation])

  const textChange = (e) => {
    e.preventDefault();
    setText(e.target.value)
  }

  const buttonClicked = async (e) => {
    e.preventDefault();
    const idGenForUser = generateUniqueId()
    if (text !== 'Ask AI...') {
      setConversation([...conversation, { id: idGenForUser, text: text, isAi: false }]);
      setFinalTextForAi(text);
      setText('');
    } else {
      alert('Please type a valid text!!!')
    }
  }

  return (
    <div className='formDiv'>
      <div className='item item-1'>
        <textarea type="text" name="name" onChange={textChange} value={text} />
      </div>
      <div className='item item-2'>
        <button onClick={buttonClicked} ><img src={send} alt='send button' /></button>
      </div>
      <div className='item item-3'>
        <SpeechRecog setFinalTextForAi={setFinalTextForAi} conversation={conversation} setConversation={setConversation} />
      </div>

    </div>
  )
}

export default Form