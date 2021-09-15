import { Circle } from 'better-react-spinkit'
function Loading() {
    return (
        <center style={{display: 'grid', placeItems:'center', height:'100vh'}}>
            <div>
              <img src="./whatsapp.png" 
              alt=""
              style={{marginBottom:30}} 
              height="200"
              />
              <Circle color="black" size={60} />

            </div>
        </center>
    )
}

export default Loading
