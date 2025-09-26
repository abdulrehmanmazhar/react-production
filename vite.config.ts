import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
// export default defineConfig({
//     plugins: [react(), tailwindcss()]
// })

type TMode = 'development' | 'production'

interface AppEnv {
    VITE_ENV: TMode
    PORT: number
}

const validateEnv = (mode: TMode, env: AppEnv) => {
    const requiredVars: (keyof AppEnv)[] = ['VITE_ENV', 'PORT']

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
        open: true
    }
    return {
        plugins: [react(), tailwindcss()],
        server: config,
        preview: config,
        build: {
            minify: true
        }
    }
})
