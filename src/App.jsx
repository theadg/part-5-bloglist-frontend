import { useState, useEffect, createContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'
import { Message } from './components/Message'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)

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
                />
            ))}
        </>
    )

    const AddBlogForm = () => {
        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')

        const handleSubmit = async () => {
            event.preventDefault()

            try {
                const newBlog = await blogService.store({
                    title,
                    author,
                    url
                })

                setBlogs(prevBlogs => [...prevBlogs, newBlog])  
                handleSetMessage(`a new blog ${newBlog.title} by ${newBlog.author} was added`, true)              
            } catch (err) {
                console.log(err)
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={({target}) => setTitle(target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        value={author}
                        onChange={({target}) => setAuthor(target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input
                        id="url"
                        value={url}
                        onChange={({target}) => setUrl(target.value) }
                    />
                </div>
                <button>Create</button>
            </form>
        )
    }

    return (
        <div>
            {message && <Message message={message} isSuccess={isSuccess}/>}
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
                    <AddBlogForm />
                    <Blogs blogs={blogs} />
                </>
            ) : (
                <Login 
                    setUser={setUser} 
                    setToken={blogService.setToken}
                    handleSetMessage={handleSetMessage}
                />
            )}
        </div>
    )
}

export default App
