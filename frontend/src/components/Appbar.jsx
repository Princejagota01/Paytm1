export function Appbar(){
    return (
        <div className="flex justify-between h-14 shadow">
            <div className="flex flex-col justify-center font-bold ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center font-bold text-medium mr-4">
                    Hello
                </div>
                <div className="bg-slate-200 mt-1 mr-2 rounded-full flex justify-center w-12 h-12">
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}