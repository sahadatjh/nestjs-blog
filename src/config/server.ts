export default {
    name: process.env.SERVER_NAME,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 3000,
    baseUrl: process.env.SERVER_BASE_URL,
    siteName: process.env.SITE_NAME,
}