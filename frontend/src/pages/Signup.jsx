import { useState } from "react"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-400 h-screen flex justify-center ">
        <div className="flex justify-center flex-col">
            <div className="rounded-lg bg-white text-center w-80 px-4 h-max">
                <Header label={"SignUp"}/>
                <SubHeading label={"Enter your information to create"}/>
                <InputBox onChange={e => {setFirstName(e.target.value);}} label={"First Name"} placeholder={"John"}/>
                <InputBox onChange={e => {setLastName(e.target.value);}} label={"Last Name"} placeholder={"Doe"}/>
                <InputBox onChange={e => {setUsername(e.target.value);}} label={"Email"} placeholder={"John@gmail.com"}/>
                <InputBox onChange={e => {setPassword(e.target.value);}} label={"Password"} placeholder={"123456"}/>
                <div className="pt-4">
                <Button label={"Sign Up"} onClick={async()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        firstName:firstName,
                        lastName:lastName,
                        username: username,
                        password:password
                    });
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard")
                }} />
                </div>
                <ButtonWarning label={"Already have an account?"} ButtonText={"Sign in"} to={"/signin"}/>

            </div>

        </div>
        
    </div>
}