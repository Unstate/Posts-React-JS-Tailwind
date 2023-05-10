import { Link } from "react-router-dom"
import classes from './NavBar.module.scss'
import { MyButton } from "../button/MyButton"
import { useContext } from "react"
import { AuthContext } from "../../../context"

export const NavBar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    
    const unSubmit = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={classes.navBar}>
            <MyButton onClick={unSubmit}>Выйти</MyButton>
            <div className={classes.navBarItems}>
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    )
}