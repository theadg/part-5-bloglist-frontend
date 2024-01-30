import { useState, useEffect, createContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))

        // GET THE USER

        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedBlogAppUser')
        )
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const Blogs = ({ blogs }) => (
        <>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </>
    )

    return (
        <div>
            {user ? (
                <>
                    <h1>
                        {user.name} logged in{' '}
                        <button
                            type="button"
                            onClick={() => logout()}>
                            logout
                        </button>
                    </h1>

                    <Blogs blogs={blogs} />
                </>
            ) : (
                <Login setUser={setUser} />
            )}
        </div>
    )
}

export default App
