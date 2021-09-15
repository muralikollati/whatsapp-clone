import { Avatar } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useState } from 'react';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import TimeAgo from 'timeago-react'
import { useRef } from 'react'

function ChatScreen({recipientData, recipientEmail, messages}) {
    const [user] = useAuthState(auth)
    const [input, setInput] = useState("")
    const router = useRouter()
    const endMessageRef = useRef(null)
    const [messageSnapshot] = useCollection(
                  db
                    .collection('chats')
                    .doc(router.query.id)
                    .collection('messages')
                    .orderBy('timestamp', 'asc')
                  )
    const showMessage = () =>{
        if(messageSnapshot){
           return messageSnapshot?.docs.map( message =>(
                    <Message key={message.id}
                             user = {message.data().user}
                             message = {{
                                 ...message.data(),
                                 timestamp: message.data().timestamp?.toDate().getTime()
                             }}
                            /> 
            ))
        }else{
            return JSON.parse(messages).map(message =>(
                <Message key={message.id}
                         user={message}
                         message = {message}
                         />
            ))
        }
    }
    const sendMessage = (e) => {
       e.preventDefault();
       // update lastSeen
       db.collection('users').doc(user?.uid).set({
           lastSeen: firebase.firestore.FieldValue.serverTimestamp()
       }, { merge: true })

       // insert message
       db.collection('chats').doc(router.query.id).collection('messages').add({
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           message: input,
           user: user.email,
           photoURL: user.photoURL
       })
       setInput("")
       ScrollToBottom()
    }
    const ScrollToBottom =() =>{
        endMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
    return (
        <Container>
            <Header>
                 {
                   recipientData ? <UserAvatar src={recipientData?.photoURL} />
                                 : <UserAvatar>{recipientEmail[0]}</UserAvatar>
                 }
                 
                <HeaderInfo>
                    {
                      recipientData ? <h3>{recipientData.email}</h3> : <h3>{recipientEmail}</h3>  
                    }
                    {
                       
                        <p>Last Active: {" "}
                        {
                          recipientData?.lastSeen?.toDate() ?
                          (<TimeAgo datetime={recipientData?.lastSeen?.toDate()} />
                          ):("Unavailable")  
                        }
                        </p>
                        
                    }
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                       <MoreVert />
                    </IconButton>
                    <IconButton>
                       <AttachFileIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
                <MessageContainer>
                    {/* showMsg */}
                    {showMessage()}
                    <EndMessage ref={endMessageRef}/>
                </MessageContainer>
                <InputContainer>
                    <InsertEmoticonIcon />
                    <Input value={input} onChange={(e) =>setInput(e.target.value)}/>
                    <button 
                        disabled={!input}
                        type="submit"
                        // hidden
                        onClick={sendMessage}    
                        >send me
                     </button>
                    <MicIcon />
                </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`;
const Header = styled.div`
position: sticky;
top:0;
background-color: white;
height: 80px;
border-bottom: 1px solid #11458a;
z-index: 1;
display: flex;
padding: 10px;
align-items: center;
`;
const HeaderInfo = styled.div`
flex: 1;
margin-left: 15px;
> h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: grey;
}
`;
const UserAvatar = styled(Avatar)``;
const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
 padding: 30px;
 overflow-y: scroll;
 background-color: white;
 height: 90vh;

 ::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none; 
`;

const EndMessage = styled.div`
height: 5vh;
`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: white;
z-index: 1;
`;

const Input = styled.input`
flex: 1;
align-items: center;
padding: 13px;
position: sticky;
bottom: 0;
background-color: white;
z-index: 1;
outline: none;
border: 1px solid #11458a;
border-radius: 50px;
margin: 10px;
font-size: 17px
`;


