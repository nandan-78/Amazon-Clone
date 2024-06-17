import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginContext } from './../context/ContextProvider';

const Option = ({ deletedata, get }) => {

    const { account, setAccount } = useContext(LoginContext);
    // console.log(account);

    const removedata = async (id) => {
        try {
            const res = await fetch(`/remove/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("error aai remove time pr");
            } else {
                setAccount(data)
                get();
                console.log("item removed");
                toast.success("Iteam remove from cart 😃!", {
                    position: "top-center"

                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='add_remove_select'>
            <select >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p> <span>|</span>
            <p className='forremovemedia'>Save for later</p><span>|</span>
            <p className='forremovemedia'>See more items like this</p>
        </div>


    )
}

export default Option
