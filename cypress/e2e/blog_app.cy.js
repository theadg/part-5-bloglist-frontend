describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'badg',
            username: 'badg',
            password: 'password',
        }
        
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('Login form is shown', function () {
        // Contains checks text content
        cy.contains('Login').click()

        // Get works like querySelector
        cy.get('#username')
        cy.get('#password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.login({ username: 'badg', password: 'password' })
        })

        it('fails with wrong credentials', function () {
            cy.contains('Login').click()

            cy.get('#username').type('badg')
            cy.get('#password').type('wrongPassword')

            cy.get('#login-button').click()
            cy.get('.message').should('contain', 'Invalid username or password')
            cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'badg logged in')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'badg', password: 'password' })

            cy.createBlog({
                title: 'blogTitle',
                author: 'blogAuthor',
                url: 'blogUrl',
            })
        })

        it('A blog can be created', function () {
            // cy.createBlog({
            //     title: 'blogTitle',
            //     author: 'badg',
            //     url: 'blogUrl',
            // })
            // cy.contains('Add Blog').click()

            // cy.get('#title').type('blogTitle')
            // cy.get('#author').type('blogAuthor')
            // cy.get('#url').type('blogUrl')

            // cy.contains('Create').click()
            cy.get('.blog-item').as('blogItem')
            cy.get('@blogItem').should('contain', 'blogTitle by')
            cy.get('@blogItem').should('contain', 'badg')
        })

        it.only('Users can like a blog', function () {
            // cy.createBlog({
            //     title: 'blogTitle',
            //     author: 'blogAuthor',
            //     url: 'blogUrl',
            // })

            cy.get('[data-testid="showButton"]').click()
            cy.get('[data-testid="blogLikeBtn"]').click()
            cy.get('[data-testid="showButton"]').click()
            cy.get('[data-testid="blogLikes"]').should('contain', 'Likes: 1')
        })

        it.only('blog can only be deleted by author', function () {
            cy.get('[data-testid="showButton"]').click()
            cy.get('[data-testid="deleteBtn"').should('contain', 'delete')
        })

        it.only('creator can only see the delete button of a blog', function() {
            // Log Out
            cy.contains('logout').click()

            // Create New User
            const user = {
                name: 'badg2',
                username: 'badg2',
                password: 'password2',
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
            cy.login({ username: 'badg2', password: 'password2' })

            // Check if delete button exists
            cy.get('[data-testid="showButton"]').click()
            cy.get('html').should('not.contain', 'delete')
        })

        it.only('blogs are ordered by likes', function() {
            cy.createBlog({
                title: 'least',
                author: 'blogAuthor',
                url: 'blogUrl',
                likes: 5
            })

            cy.createBlog({
                title: 'most',
                author: 'blogAuthor',
                url: 'blogUrl',
                likes: 555
            })

            cy.createBlog({
                title: 'mid',
                author: 'blogAuthor',
                url: 'blogUrl',
                likes: 55
            })

            cy.get('.blog-item').eq(0).should('contain', 'most')
            cy.get('.blog-item').eq(1).should('contain', 'mid')
            cy.get('.blog-item').eq(2).should('contain', 'least')

        })
    })
})
