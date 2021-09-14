import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 600px;
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  padding: 20px;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  margin-top: 40px;
 
  p{
    position: absolute;
    top: 53%;
    left: 50px;
    color: red;
  }
  input {
    border: 1px solid #11458a;
    outline: none;
    width: 100%;
    font-size: 20px;
    border-radius: 50px;
    padding: 10px 20px;
  }
  button {
    margin: 20px;
    padding: 10px 50px;
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 10px;
  }
`;

const CloseModalButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



export const Modal = ({ showModal, setShowModal, chatsSnapshot}) => {
  const modalRef = useRef();
  const [email, setEmail] = useState('')
  const [emailValidationMsg, setEmailValidationMsg] = useState('')
  const [ user ] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  //const [chatsSnapshot] = useCollection(userChatRef)

  
  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        // console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );
 
  const addEmailToDb = () =>{
    if(!email) return setEmailValidationMsg("please enter email")
    if(chatAlreadyExists(email)) return setEmailValidationMsg("chat already exists");
    if(email === user.email) return setEmailValidationMsg("can't create chat with your email")
    if(!EmailValidator.validate(email)) return setEmailValidationMsg("plz enter valid email")
      
       db.collection('chats').add({
         users: [ user.email, email ],
       })
       setEmail("")
       setShowModal(prev => !prev) 
  }
  
  const chatAlreadyExists =(recipientEmail)=>
     !!chatsSnapshot?.docs.find(
         (chat) => chat.data().users.find(user => user === recipientEmail)?.length > 0
     );
 

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
            {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
              <h3>Please enter an email for the user you wish to chat with</h3>
              <p>{ emailValidationMsg }</p>
                <input value={email} onChange={(e)=>{setEmail(e.target.value), setEmailValidationMsg("")}}
                       placeholder={emailValidationMsg}/>
                <button onClick={addEmailToDb}>Start Chat</button>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};