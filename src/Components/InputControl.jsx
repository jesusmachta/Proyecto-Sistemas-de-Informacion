export function TextField({placeholder, onChange}){
    return <input type ="text" placeholder={placeholder} onChange={onChange}></input>
}

export function EmailField({placeholder, onChange}){
    return <input type ="email" placeholder={placeholder} onChange={onChange}></input>
}

export function PasswordField({placeholder, onChange}){
    return <input type ="password" placeholder={placeholder} onChange={onChange}></input>
}

export function TelField({placeholder, onChange}){
    return <input type= "tel" placeholder={placeholder} onChange={onChange}/>;
}
