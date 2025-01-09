import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase";
import useAxiosPublic from '../Hooks/useAxiosPublic'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
    // create the user useing firebase authentication
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user 
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // sign in the user using firebase authentication
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // singin with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // logout the user using firebase authentication
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })
            } else {
                // todo : remove cookies
                localStorage.removeItem('access-token')
            }
            setUser(currentUser)

        })
        return () => {
            return unSubscribe()
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        signOutUser,
        updateUserProfile,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;