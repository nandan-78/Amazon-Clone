import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>

    )
}

export default ContextProvider

// By the help of context API ---> wq we will update the value of the cart
