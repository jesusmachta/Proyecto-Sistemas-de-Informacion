export function TextField({placeholder}){
    return <input type ="text" placeholder={placeholder}></input>
}

export function EmailField({placeholder}){
    return <input type ="email" placeholder={placeholder}></input>
}

export function PasswordField({placeholder}){
    return <input type ="password" placeholder={placeholder}></input>
}

export function TelField({placeholder}){
    return <input type= "tel" placeholder={placeholder}/>;
}