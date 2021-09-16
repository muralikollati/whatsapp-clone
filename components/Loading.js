import { Circle } from 'better-react-spinkit'
import Image from 'next/image'
import logo from '../public/whatsapp.png'
import styled from 'styled-components'
function Loading() {
    return (
        <center style={{display: 'grid', placeItems:'center', height:'100vh'}}>
            <div>
              <div style={{marginBottom:30}} >
              <Image src={logo} 
                alt=""
                height="200"
                objectFit="contain"
              />
              </div>
              <Circle color="black" size={60} />

            </div>
        </center>
    )
}

export default Loading
