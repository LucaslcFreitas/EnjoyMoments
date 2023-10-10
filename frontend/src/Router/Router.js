import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

//Layouts
import DefaultLayout from '../Layouts/DefaultLayout'

//Pages
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import NoPage from '../Pages/NoPage'
import Profile from '../Pages/Profile'
import MyPosts from '../Pages/MyPosts'
import Post from '../Pages/Post'
import NewPost from '../Pages/NewPost'
import EditPost from '../Pages/EditPost'

const Private = ({ Item }) => {
    const { signed } = useAuth()

    return signed ? <Item /> : <Login />
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Private Item={DefaultLayout} />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="myposts" element={<MyPosts />} />
                    <Route path="post/:id" element={<Post />} />
                    <Route path="newpost" element={<NewPost />} />
                    {/* <Route path="edit/:id" element={<EditPost />} /> */}
                </Route>
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
