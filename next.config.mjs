/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    async headers() {
        return [
            {
                source: "/games/:path*\\.js\\.gz",
                headers: [
                    { key: "Content-Encoding", value: "gzip" },
                    { key: "Content-Type", value: "application/javascript" },
                ],
            },
            {
                source: "/games/:path*\\.wasm\\.gz",
                headers: [
                    { key: "Content-Encoding", value: "gzip" },
                    { key: "Content-Type", value: "application/wasm" },
                ],
            },
            {
                source: "/games/:path*\\.data\\.gz",
                headers: [
                    { key: "Content-Encoding", value: "gzip" },
                    { key: "Content-Type", value: "application/octet-stream" },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            // This rule ensures that website.com/sama-sama/ will serve public/games/sama-sama/index.html
            {
                source: "/samasama",
                destination: "/games/sama-sama/index.html",
            },
            // This rule ensures that all other assets (CSS, JS, images, etc.) within the game
            // are correctly mapped from /sama-sama/ to public/games/sama-sama/
            {
                source: "/samasama/:path*",
                destination: "/games/sama-sama/:path*",
            },
        ];
    },
};

export default nextConfig;
