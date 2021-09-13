import Head from "next/head"
import styled from "styled-components"
import {Button} from "@material-ui/core"
import { auth, provider } from "../firebase"
function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="./whatsapp.png" />
                <Button onClick={signIn} variant="outlined">Login with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
display: grid;
height: 100vh;
place-items: center;
align-items: center;
background-color: white
`;
const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: whitesmoke;
padding: 100px;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
width:200px;
height: 200px;
margin-bottom: 50px;
`;
