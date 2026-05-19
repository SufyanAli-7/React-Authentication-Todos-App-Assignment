import { createContext, useContext, useReducer, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

const initialState = { isAuth : false, user: {} }

const reducer = (state, action) => {
    const { type , payload } = action
  switch (type) {
    case "SET_LOGIN":
      return { isAuth: true, user: payload };
    case "SET_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)
    const navigate = useNavigate()

    const readProfile =() => {
        try{
            const user = JSON.parse(localStorage.getItem("user"))
            if (user) {
            dispatch({ type: "SET_LOGIN", payload: user })
        }
        }catch(error){
            console.error("Error reading user profile:", error)
        }
        finally{
            setTimeout(() => {
                setIsAppLoading(false)
            }, 1000)
        }
    }

    useEffect(() => {
        readProfile()
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({ type: "SET_LOGOUT" })
        window.toastify("Logout successful", "success")
    }

  return (
    <AuthContext.Provider value={{ ...state, dispatch, readProfile, handleLogout , isAppLoading }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
export default AuthProvider