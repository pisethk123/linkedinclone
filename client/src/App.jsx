import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import toast, {Toaster} from "react-hot-toast"

import {useQuery} from '@tanstack/react-query'
import axiosInstance from './libs/axios'
import NotificationPage from './pages/NotificationPage'
import NetworkPage from './components/NetworkPage'
import PostPage from './pages/PostPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  const {data: authUser, isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
      try {
        const res = await axiosInstance.get("/user/me")
        return res.data
      } catch (error) {
        if(error.response && error.response.status === 401) return null
        toast.error(error.response.data.message || "something went wrong")
      }
    }
  })

  if(isLoading) return null

  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={authUser ? <Homepage/> : <Navigate to={"/login"}/>}/>
            <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to={"/"}/>}/>
            <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
            <Route path='/notifications' element={authUser ? <NotificationPage/> : <Navigate to={"/login"}/>}/>
            <Route path='/network' element={authUser ? <NetworkPage/> : <Navigate to={"/login"}/>}/>
            <Route path='/post/:postId' element={authUser ? <PostPage/> : <Navigate to={"/login"}/>}/>
            <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
          </Routes>
          <Toaster/>
        </Layout>
    </BrowserRouter>
  )
}

export default App
