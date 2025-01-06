
export function InputBox({label,placeholder,onChange}){
    return (
        <div>
            <div className="text-sm text-left py-2 font-medium">
                {label}
            </div>
            <input onChange={onChange} type="text" placeholder={placeholder} className="rounded w-full px-2 py-1 border border-solid border-slate-200 "/>
        </div>
    )
}