const path = require('path');

module.exports = options => {
    return {
        plugins: [
            {
                resolve: `gatsby-plugin-page-creator`,
                options: {
                  path: path.join(__dirname, `src`, `pages`),
                },
            },
            {
                resolve: 'gatsby-source-wordpress',
                options: {
                    baseUrl: `localhost:8000/${options.language || ''}`,
                    protocol: 'http',
                    hostingWPCOM: false,
                    useACF: false,
                    includedRoutes: [
                        '**/posts',
                        '**/pages',
                        '**/media',
                        '**/categories',
                        '**/tags',
                        '**/taxonomies',
                        '**/users',
                    ],
                },
            },
            'gatsby-plugin-styled-components',
        ]
    }
}
