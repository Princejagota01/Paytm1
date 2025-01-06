export function Balance({amount}){
    return (
        <div className="flex">
            <div className=" font-bold text-lg mx-2">
                Your Balance</div>
            <div className="font-semibold ml-2 text-lg">
                Rs. {amount}
            </div>
        </div>
    )
}