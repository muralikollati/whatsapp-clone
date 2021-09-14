import { Avatar } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'

function ChatScreen({recipientData, recipientEmail, messages}) {
    return (
        <Container>
            <Header>
                 {
                   recipientData ? <UserAvatar src={recipientData?.photoURL} />
                                 : <UserAvatar>{recipientEmail[0]}</UserAvatar>
                 }
                 
                <HeaderInfo>
                    <h3>{recipientEmail ? recipientEmail : ""}</h3>
                    <p>Last seen</p>
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
z-index: 100;
display: flex;
padding: 10px;
align-items: center;
`;
const HeaderInfo = styled.div`
flex: 1`;
const UserAvatar = styled(Avatar)``;
const HeaderIcons = styled.div``;


