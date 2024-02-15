import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

test.only('form calls event handler with right details', async () => {
    const blog = {
        title: 'sample',
        author: 'badg',
        url: 'hello.com',
        likes: 0,
    }

    const mockHandler = jest.fn()

    render(
        <BlogForm
            createBlog={mockHandler}
            title={blog.title}
        />
    )

    const user = userEvent.setup()

    // Select Form Elements
    const title = screen.getByTestId('titleTextbox')
    const author = screen.getByTestId('authorTextbox')
    const url = screen.getByTestId('urlTextbox')
    const submitBtn = screen.getByTestId('submitBtn')

    // Set Form Details by .type
    await user.type(title, 'blogggg')
    await user.type(author, 'badg')
    await user.type(url, 'www.hello.com')

    // Submit Form
    await user.click(submitBtn)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('blogggg')
    expect(mockHandler.mock.calls[0][0].author).toBe('badg')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.hello.com')
})
