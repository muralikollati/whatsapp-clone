export const getRecipientEmailId = (users, loggedInUser) =>(
    users?.filter(userToFilter => userToFilter !== loggedInUser?.email)[0]
)