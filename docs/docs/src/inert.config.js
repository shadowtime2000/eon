const config = {
    build: {
        input: "./posts",
        output: "..",
        sassEntry: './scss/index.scss',
        sassFolder: './scss',
        sassOutput: '../index.css',
        templates: {
            home: './templates/home.ejs',
            post: './templates/post.ejs'
        }
    },
    blogName: `Eon.js Docs`,
    ownerName: `Eon.js Project`,
    description: `A simple web server framework`,
    navLinks: [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: '/about',
            text: 'About'
        },
        {
            href: 'https://github.com/eon-web/eon',
            text: 'GitHub'
        },
        {
            hreg: '/contact',
            text: 'Contact'
        }
    ],
    assets: './assets',
}

module.exports = config;