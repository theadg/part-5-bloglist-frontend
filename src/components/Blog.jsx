import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: '1rem',
    }

    return (
        <div style={blogStyle}>
            {blog.title}
            <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}>
                {!showDetails ? 'View' : 'Hide'}
            </button>
            <br />
            {showDetails && (
                <div className="">
                    {blog.url}
                    <br />
                    Likes: {blog.likes}
                    <button
                        type="button"
                        onClick={() => likeBlog(blog)}
                    >
                        like
                    </button>
                    <br />
                    {blog.user?.name ?? 'No Author'}
                    {blog?.user?.name === user.name &&
                        <button
                            type="button"
                            onClick={() => deleteBlog(blog)}
                        >
                            delete
                        </button>
                    }
                </div>
            )}
        </div>
    )
}

export default Blog
