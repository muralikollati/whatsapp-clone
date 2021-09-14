import styled from 'styled-components';
import {Avatar} from '@material-ui/core';
import useRecipientData from '../hooks/useRecipientData';
import { useRouter } from 'next/router';

function ChatList({ id, users, loggedInUser }) {
    const router = useRouter()
    const {recipientEmail, recipientData} = useRecipientData(users, loggedInUser)
    
    const enterChat = () =>{
        console.log('Entering')
        router.push(`/chat/${id}`)
    }
    return (
        <>
           <Container onClick={enterChat}>
                 {
                   recipientData ? <UserAvatar>{recipientData?.photoURL}</UserAvatar>
                                 : <UserAvatar>{recipientEmail[0]}</UserAvatar>
                 }
                 <p>{recipientEmail}</p>
           </Container>
        </>
    )
}
export default ChatList;

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
:hover{
    background-color: #345345
}
`;
const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 10px;`;
