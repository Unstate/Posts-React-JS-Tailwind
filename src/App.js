import { BrowserRouter} from "react-router-dom"
import { NavBar } from "./components/UI/NavBAr/NavBar"
import { AppRouter } from "./components/AppRouter"
import { AuthContext } from "./context"
import { useEffect, useState } from "react"

export const App = () => {

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoding] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoding(false)
    },[])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <NavBar></NavBar>
                <AppRouter></AppRouter>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}