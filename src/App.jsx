import { useState, useEffect, createContext, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'
import { Message } from './components/Message'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)

    const addBlogFormRef = useRef()

    const handleSetMessage = (message, isReqSuccess = true) => {
        setMessage(message)
        setIsSuccess(isReqSuccess)

        setTimeout(() => {
            setMessage(null)
            setIsSuccess(null)
        }, 3000)
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))

        // GET THE USER
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedBlogAppUser')
        )
        if (loggedInUser) {
            blogService.setToken(loggedInUser.token)
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
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                />
            ))}
        </>
    )

    const addBlog = async (blogObject) => {
        try {
            addBlogFormRef.current.toggleVisibility()
            const newBlog = await blogService.store(blogObject)
            setBlogs((prevBlogs) => [...prevBlogs, newBlog])
            handleSetMessage(
                `a new blog ${newBlog.title} by ${newBlog.author} was added`,
                true
            )
        } catch (err) {
            console.log(err)
            handleSetMessage(`An Error has occurred: ${err} `, false)
        }
    }

    const likeBlog = async (blogObject) => {
        try {
            blogObject.likes += 1

            const likedBlog = await blogService.update(blogObject)

            setBlogs((prevBlogs) => {
                const updatedBlogs = prevBlogs.map((blog) =>
                    blog.id === blogObject.id ? likedBlog : blog
                )
                return [...updatedBlogs]
            })
        } catch (err) {
            console.log(err)
        }
    }

    const deleteBlog = async (blogObject) => {
        try {
            if (window.confirm('Delete Blog')){
                const deletedBlog = await blogService.deleteBlog(blogObject)

                setBlogs((prevBlogs) => {
                    const updatedBlogs = prevBlogs.filter(
                        (blog) => blog.id !== deletedBlog.id
                    )
                    return [...updatedBlogs]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {message && (
                <Message
                    message={message}
                    isSuccess={isSuccess}
                />
            )}
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
                    <Toggleable
                        buttonLabel={'Add Blog'}
                        ref={addBlogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Toggleable>
                    <Blogs blogs={blogs} />
                </>
            ) : (
                <Toggleable buttonLabel={'Login'}>
                    <Login
                        setUser={setUser}
                        setToken={blogService.setToken}
                        handleSetMessage={handleSetMessage}
                    />
                </Toggleable>
            )}
        </div>
    )
}

export default App
