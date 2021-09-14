import { db } from "../firebase"
import { useCollection } from 'react-firebase-hooks/firestore';


 function useRecipientData  (users, loggedInUser) {

    const recipientEmail = users?.filter(userToFilter => userToFilter !== loggedInUser?.email)[0]

    const [recipientSnapShot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
       
    const recipientData = recipientSnapShot?.docs?.[0]?.data()

    return { recipientEmail, recipientData } 
}

export default useRecipientData
