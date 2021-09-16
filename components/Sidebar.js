import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { Modal } from './Modal';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatList from './ChatList';
import { useRouter } from 'next/router'

function  Sidebar  ()  {
    const [ loggedInUser ] = useAuthState(auth)
    const [showModal, setShowModal] = useState(false);
    const [chatRef, setChatRef] = useState("");
    const router = useRouter()

   useEffect(() => {
       console.log(loggedInUser.email);
        if(loggedInUser.email){
            console.log(db.collection('chats').where('users', 'array-contains', loggedInUser?.email));
            setChatRef(db.collection('chats').where('users', 'array-contains', loggedInUser?.email))
        }
   },[loggedInUser])
   
 console.log(chatRef);
  const [chatsSnapshot] = useCollection(chatRef)
  //console.log("chatRef::",chatsSnapshot);

  const openModal = () => {
    setShowModal(prev => !prev);
  };
  const signOutHandler = () =>{
     auth.signOut()
     router.push('/')
  }
    return (
        <Container>
            <Modal showModal={showModal} 
                   setShowModal={setShowModal} 
                   chatsSnapshot={chatsSnapshot}
                   />
            <Header>
              <UserAvatar src={loggedInUser.photoURL} 
              onClick={signOutHandler}/>
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
  /* display: flex;
  flex-direction: column; */
  justify-content: unset;
  flex: 0.45;
  overflow-y: scroll;
  height: 100vh;
  border-right: 1px solid #11458a;
  min-width: 300px;
  max-width: 350px;

  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; 
`;


const IconContainer = styled.div`
`;
const Header = styled.div`
    display: flex;
    position: sticky;
    top:0;
    z-index:1;
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





