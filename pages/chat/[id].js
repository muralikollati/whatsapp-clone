import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import useRecipientData from "../../hooks/useRecipientData";
import Login from '../login'
import { useRouter } from 'next/router';
import { useEffect } from "react";

function Chat({chat, messages}) {
    const router = useRouter()
    const [user] = useAuthState(auth)

    useEffect(()=>{
    if(!user) return <Login />
    if(!chat.users.includes(user.email)){
        router.replace('/')
    }
   },[user,chat,router])
    
    const {recipientEmail, recipientData} = useRecipientData(chat?.users, user)
    return (
        <Container>
            <Head>
                <title>chat with {recipientEmail}</title>
            </Head>
            
            <Sidebar />
            <ChatContainer>
                 <ChatScreen recipientData= {recipientData} 
                             recipientEmail= {recipientEmail}
                             messages= {messages}/>
            </ChatContainer>
        </Container>
    )
}
export default Chat;

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id)
    const massagesRef = await ref
                           .collection('messages')
                           .orderBy('timestamp','asc')
                           .get()
    const messages =  massagesRef.docs.map(doc =>({
                                id: doc.id,
                                ...doc.data()
                           })).map(messages => ({
                               ...messages,
                               timestamp: messages.timestamp.toDate().getTime()
                           }))  
    const chatRef = await ref.get()
    const chat = {
        id: chatRef.id,
        ...chatRef.data()
    }
    return{
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }                                        
}

const Container = styled.div`
display: flex;
`;
const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none; 
`;
