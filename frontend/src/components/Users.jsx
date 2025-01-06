import { useEffect, useState } from "react"
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Users(){
    const [users,setUser] = useState([]);
    const [filter,setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then((res)=>{
            setUser(res.data.user);
        })
    },[filter]);
    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div>
                <input onChange={e=>setFilter(e.target.value)} type="text" placeholder="Search Users..." className=" border border-slate-200 rounded w-full mt-3 h-10 p-2" />
            </div>
            <div>
                {users.map((user)=>
                    <User key={user._id} user={user} />)}
            </div>
        </>
    )
}

function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between mt-2">
        <div className="flex">
            <div className="bg-slate-200 mx-2 rounded-full flex justify-center w-12 h-12">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
                <div>
                {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={()=>{
                navigate("/send?id="+user._id+"&name="+user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
