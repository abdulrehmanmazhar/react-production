import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
// export default defineConfig({
//     plugins: [react(), tailwindcss()]
// })

type TMode = 'development' | 'production'

interface AppEnv {
    VITE_ENV: TMode
    PORT: number
    BACKEND_PROXY: string
}

const validateEnv = (mode: TMode, env: AppEnv) => {
    const requiredVars: (keyof AppEnv)[] = ['VITE_ENV', 'PORT', 'BACKEND_PROXY']

    for (const variable of requiredVars) {
        if (!(variable in env)) {
            throw new Error(`Missing required environment variable: ${variable} in .env.${mode}`)
        }
    }
}

export default defineConfig(({ mode }) => {
    const modeType = mode as TMode

    const env = loadEnv(modeType, process.cwd(), '') as unknown as AppEnv

    validateEnv(modeType, env)

    const config: ServerOptions = {
        port: env.PORT,
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_PROXY,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@hooks': path.resolve(__dirname, 'src/hooks')
            }
        },
        server: config,
        preview: config,
        build: {
            minify: true
        }
    }
})
