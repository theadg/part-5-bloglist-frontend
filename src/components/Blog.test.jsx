import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'
import renderer from 'react-test-renderer'

test('renders content', () => {
    const blog = {
        title: 'sample',
        user: { name: 'badg' },
        url: 'hello.com',
        likes: 0,
    }

    render(<Blog blog={blog} />)

    const title = screen.getByTestId('blogTitle')
    const author = screen.getByTestId('blogAuthor')
    const url = screen.queryByTestId('blogUrl')
    const likes = screen.queryByTestId('blogLikes')

    expect(title).toHaveTextContent(blog.title)
    expect(author).toHaveTextContent(blog.user.name)
    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test('renders content (snapshot)', () => {
    const blog = {
        title: 'sample',
        user: { name: 'badg' },
        url: 'hello.com',
        likes: 0,
    }

    const tree = renderer.create(<Blog blog={blog} />).toJSON()

    expect(tree).toMatchSnapshot()
})

test('shows url and likes on click', async () => {
    const blog = {
        title: 'sample',
        user: { name: 'badg' },
        url: 'hello.com',
        likes: 0,
    }

    render(<Blog blog={blog} />)

    const showBtn = screen.getByTestId('showButton')
    const user = userEvent.setup()
    await user.click(showBtn)

    const url = screen.getByTestId('blogUrl')
    const likes = screen.queryByTestId('blogLikes')

    expect(url).toHaveTextContent(blog.url)
    expect(likes).toHaveTextContent(blog.likes)
})

test('like button is clicked twice and like fn is called twice', async () => {
    const blog = {
        title: 'sample',
        user: { name: 'badg' },
        url: 'hello.com',
        likes: 0,
    }

    const mockHandler = jest.fn()

    render(
        <Blog
            blog={blog}
            likeBlog={mockHandler}
        />
    )

    const user = userEvent.setup()
    const showBtn = screen.getByTestId('showButton')
    await user.click(showBtn)

    const likeBtn = screen.getByTestId('blogLikeBtn')
    await user.dblClick(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
    screen.debug(showBtn)
})
