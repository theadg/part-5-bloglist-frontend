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
        <div className="blog-item" style={blogStyle}>
            <div data-testid="blogTitle">{blog.title}</div> by
            <div data-testid="blogAuthor">{blog.user?.name ?? 'No Author'}</div>
            <button
                data-testid="showButton"
                type="button"
                onClick={() => setShowDetails(!showDetails)}>
                {!showDetails ? 'View' : 'Hide'}
            </button>
            <br />
            {showDetails && (
                <div className="">
                    <div data-testid="blogUrl">{blog.url}</div>
                    <div data-testid="blogLikes">Likes: {blog.likes}</div>
                    <br />
                    <button
                        type="button"
                        data-testid="blogLikeBtn"
                        onClick={() => likeBlog(blog)}>
                        like
                    </button>
                    <br />
                    {blog?.user?.name === user?.name && (
                        <button
                            type="button"
                            data-testid="deleteBtn"
                            onClick={() => deleteBlog(blog)}>
                            delete
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
