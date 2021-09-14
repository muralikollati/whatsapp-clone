import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import Chats from './Chats';
import { Modal } from './Modal';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatList from './ChatList';

function Sidebar() {
    const [showModal, setShowModal] = useState(false);
    const [ loggedInUser ] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', loggedInUser.email)
    const [chatsSnapshot] = useCollection(userChatRef)

  const openModal = () => {
    setShowModal(prev => !prev);
  };
    return (
        <Container>
            <Header>
              <UserAvatar src={loggedInUser.photoURL} 
              onClick={()=> auth.signOut()}/>
                <IconContainer>
                    <Icon_Button>
                        <Chat_Icon />
                    </Icon_Button>
                    <Icon_Button>
                        <MoreVert_Icon />
                    </Icon_Button>
                </IconContainer>      
            </Header>
            <Search>
                <SearchInput placeholder="Search in chats"/>
                <Search_Icon />
            </Search>
            <ChatButton onClick={openModal}>start a new chat</ChatButton>

            {/* List of Chats */}
            {/* <Chats /> */}
            

            <Modal showModal={showModal} 
                   setShowModal={setShowModal} 
                   chatsSnapshot={chatsSnapshot}
                   />
                   
            {
            chatsSnapshot?.docs.map(chat =>(
                      <ChatList key={chat.id} 
                                id={chat.id}
                                users={chat.data().users}
                                loggedInUser={loggedInUser}
                                />
                   ))
            }
        </Container> 
    )
} 
export default Sidebar

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const IconContainer = styled.div`
`;
const Header = styled.div`
    display: flex;
    position: sticky;
    top:0;
    /* z-index:1; */
    justify-content:space-between;
    align-items: center;
    height: 80px;
    padding: 15px;
    border-bottom: 1px solid #11458a;
`;
const UserAvatar = styled(Avatar)`
   cursor: pointer;
:hover{
    opacity: 0.8
}
`;
const Icon_Button = styled(IconButton)`
    :hover{
        &&&{
           background-color: red;
        }
    }
`;
const Chat_Icon = styled(ChatIcon)`
   color:whitesmoke;
`;
const MoreVert_Icon = styled(MoreVertIcon)`
   color:whitesmoke;
`;


//Search div
const Search = styled.div`
    display: flex;
    flex: 1;
    border: 1px solid #11458a;
    padding: 10px;
    width: 90%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 50px;
    align-items: center;
    :hover{
        background-color: whitesmoke; 
    }
`;
const SearchInput = styled.input`
    border: none;
    width: 100%;
    margin-left: 10px;
    outline: none;
    font-size: 16px;
    color: grey;
    background-color: transparent;
`;
const Search_Icon = styled(SearchIcon)`
    color: whitesmoke;
    margin-right: 5px;
`;
const ChatButton = styled(Button)`
    width: 100%;
    &&&{
        color: whitesmoke;
        border-top: 1px solid #11458a;
        border-bottom: 1px solid #11458a;
    }
    :hover{
        &&&{
            background-color: #11458a;
        }
    }
    `;




