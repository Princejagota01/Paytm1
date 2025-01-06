import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"


export const Signin = ()=>{
    const navigate = useNavigate();
    return <div className="bg-slate-400 flex h-screen justify-center">
        <div className="flex justify-center flex-col">
            <div className="rounded-lg bg-white text-center w-80 px-4 h-max">
                <Header label={"Sign In"}/>
                <SubHeading label={"Enter your Credentials to access your account"}/>
                <InputBox label={"Email"} placeholder={"John@gmail.com"}/>
                <InputBox label={"Password"} placeholder={""}/>
                <div className="py-2">
                <Button label={"Sign In"} onClick={async()=>{
                    navigate("/dashboard")
                }}/>
                </div>
                <ButtonWarning label={"Don't have an account?"} ButtonText={"Sign Up"} to={"/signup"}/>

            </div>

        </div>
        
    </div>
}