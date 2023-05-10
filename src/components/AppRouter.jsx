import { Navigate, Route, Routes } from "react-router-dom"
import { publicRoutes, privateRoutes } from "../router"
import { useContext } from "react";
import { AuthContext } from "../context";
import { Loader } from "./UI/Loader/Loader";

export const AppRouter = () => {

    const {isAuth,isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader></Loader>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path}
                        element={<route.component />}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path='/*' element={<Navigate to='/posts' replace/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path}
                        element={<route.component />}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path='/*' element={<Navigate to='/login' replace/>}/>
            </Routes>
    )
}