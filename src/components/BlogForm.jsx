import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = () => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url
        })

        // setTitle('')
        // setAuthor('')
        // setUrl('')
    }
    // const handleSubmit = async () => {
    //     event.preventDefault()
    //     addBlogFormRef.current.toggleVisibility()

    //     try {
    //         const newBlog = await blogService.store({
    //             title,
    //             author,
    //             url,
    //         })

    //         setBlogs((prevBlogs) => [...prevBlogs, newBlog])
    //         handleSetMessage(
    //             `a new blog ${newBlog.title} by ${newBlog.author} was added`,
    //             true
    //         )
    //     } catch (err) {
    //         console.log(err)
    //         handleSetMessage(
    //             `An Error has occurred: ${err.response.data.error} `,
    //             false
    //         )
    //     }
    // }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    data-testid="titleTextbox"
                    id="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    data-testid="authorTextbox"
                    id="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label htmlFor="url">Url</label>
                <input
                    data-testid="urlTextbox"
                    id="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button data-testid="submitBtn">Create</button>
        </form>
    )
}

export default BlogForm
