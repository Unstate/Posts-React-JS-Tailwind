import { useContext } from "react"
import { MyButton } from "../UI/button/MyButton"
import { MyInput } from "../UI/input/MyInput"
import { AuthContext } from "../../context"

export const Login = () => {
    
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const submit = e => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth','true')
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={submit}>
                <MyInput type="text"></MyInput>
                <MyInput type="password"></MyInput>
                <MyButton >Войти</MyButton>
            </form>
        </div>
    )
}