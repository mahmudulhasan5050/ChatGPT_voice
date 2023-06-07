import React, { useState, useEffect } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import microphone from '../assets/microphone.svg'
import record from '../assets/record.svg'
import stop from '../assets/stop.svg'
import { generateUniqueId } from '../components/funcShop';

const appId = `${process.env.REACT_APP_VOICE}`;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const SpeechRecog = ({ setFinalTextForAi, conversation, setConversation }) => {
    const [speech, setSpeech] = useState('');
    const [buttonListening, setButtonListening] = useState(false);
    const [buttonReset, setButtonReset] = useState(false);
    const {
        transcript,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition();

    useEffect(() => {
        setFinalTextForAi(speech)
        setSpeech('');
        
      
    }, [speech])

    const startListening = (e) => {
        e.preventDefault();
        setButtonListening(true);
        SpeechRecognition.startListening({ continuous: true });
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const endRec = (e) => {
        e.preventDefault();
        const idGenForUser = generateUniqueId()
        SpeechRecognition.stopListening()
        setSpeech(transcript)
        setConversation([...conversation, { id: idGenForUser, text: transcript, isAi: false }])
        setButtonListening(false);
        setButtonReset(true);
    }
    const resetHandle = () =>{
        setButtonReset(false)
        resetTranscript()
    }

    return (
        <>
            {buttonListening
                ? (<button
                    onClick={(e) => endRec(e)}
                ><img src={record} width='20' alt='...' /></button>)
                : buttonReset
                    ? (<button
                        onClick={resetHandle}
                    ><img src={stop} width='20' alt='...' /></button>)
                    : (<button
                        onClick={(e) => startListening(e)}
                    ><img src={microphone} width='20' alt='...' /></button>)}
        </>
    );
};
export default SpeechRecog;


// console.log("listening   ", listening)
// return (

//     <button
//         onTouchStart={(e) => startListening(e)}
//         onMouseDown={(e) => startListening(e)}
//         onTouchEnd={(e) => endRec(e)}
//         onMouseUp={(e) => endRec(e)}
//     >
//         {buttonListening ? <img src={record} width='20' alt='...' /> : <img src={microphone} width='20' alt='...' />}</button>



// );
// };
// export default SpeechRecog;