import React from "react";
import auth from "auth.js";

export default function Login (props) {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={()=>{
                auth.login( () => { 
                    props.history.push("/admin/dashboard");
                });
            }}
            >Login</button>
        </div>
    );
};