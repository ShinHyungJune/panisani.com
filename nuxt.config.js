let baseUrl = process.env.NODE_ENV === "production" ? "https://api.panisani.com" : "http://localhost";

export default {
    target: "static",
    ssr: true,
    head: {
        title: '파니사니',
        htmlAttrs: {
            lang: 'ko'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        script: [
            {src: "//code.jquery.com/jquery-1.12.4.min.js"},
            {src: "//cdn.iamport.kr/js/iamport.payment-1.1.5.js"},
            {src: "//cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"},
            {src: "//unpkg.com/aos@2.3.1/dist/aos.js"},
            {src: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"},
            {src: "/js/swiper.js"},
            {src: "/js/common.js"},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', type: 'text/css', href: 'cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//uicdn.toast.com/editor/latest/toastui-editor.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/swiper.min.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/base.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
            {rel: 'stylesheet', type: 'text/css', href: '//unpkg.com/aos@2.3.1/dist/aos.css'},
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: '//cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
            },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: "~plugins/toast-editor.js",
            ssr: false,
        },
        {
            src: "~plugins/axios.js"
        },
    ],

    middlewares: [""],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
    ],

    axios: {
        baseUrl: baseUrl,
        credentials: true,
        /* proxy: true, */
    },
    /* proxy: {
        '/laravel': {
            target: baseUrl,
            pathRewrite: { '^/laravel': '/' }
        }
    }, */
    auth: {
        redirect: false,
        /*redirect: {
            login: '/login',
            logout: '/logout',
            callback: '/login',
            home: '/'
        },
        */
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: baseUrl,
                endpoints: {
                    login: {
                        url: '/api/login',
                        method: 'post'
                    },
                    logout: {
                        url: "/api/logout",
                        method: "post"
                    },
                }
            },
        },

    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
            'defu',
        ]
    }
}
