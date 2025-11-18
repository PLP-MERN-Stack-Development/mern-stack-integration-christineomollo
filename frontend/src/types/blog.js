/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [role]
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} name
 * @property {string} [description]
 * @property {string} slug
 */

/**
 * @typedef {Object} Comment
 * @property {string} _id
 * @property {string} content
 * @property {Object} author
 * @property {string} author.id
 * @property {string} author.name
 * @property {string} post
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Post
 * @property {string} _id
 * @property {string} title
 * @property {string} content
 * @property {string} author
 * @property {string} [featuredImage]
 * @property {Category} [category]
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} published
 * @property {Comment[]} [comments]
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {string|null} token
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {(name: string, email: string, password: string) => Promise<void>} register
 * @property {() => void} logout
 * @property {boolean} loading
 */

/**
 * @typedef {Object} PaginationData
 * @property {number} total
 * @property {number} page
 * @property {number} pages
 * @property {number} limit
 */

/**
 * @typedef {Object} PostsResponse
 * @property {Post[]} posts
 * @property {PaginationData} pagination
 */
