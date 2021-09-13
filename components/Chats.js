import styled from 'styled-components';

function Chats() {
    return (
        <Container>
            {
                [1,2,3,4,5,6,7,8,9,10].map(list => <p>Murali@gmail.com</p>)
            }
        </Container>
    )
}

export default Chats

const Container = styled.div`

background: white;
`;