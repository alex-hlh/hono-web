import { loadEnv } from "vite"
import { viteMockServe } from "vite-plugin-mock"
import react from "@vitejs/plugin-react"
import * as path from "path"
import type { UserConfig, ConfigEnv } from "vite"

const CWD = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_IS_MOCK } = loadEnv(mode, CWD)
	return {
		plugins: [
			react(),
			// viteMockServe({
			// 	ignore: /^_/,
			// 	mockPath: "mock",
			// 	enable: VITE_IS_MOCK === "true",
			// 	logger: true
			// })
		],
		resolve: {
			alias: {
				"@": path.join(__dirname, "./src")
			}
		},
		css: {
			preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/global.less";`
        }
			}
		},
		build: {
			outDir: "dist",
			minify: 'esbuild',
			rollupOptions: {
				output: {
					assetFileNames: "[ext]/[name].[hash].[ext]",
					chunkFileNames: "js/[name].[hash].js",
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString()
						}
					}
				}
			},
			// terserOptions: {
			// 	compress: {
			// 		keep_infinity: Boolean(VITE_DROP_CONSOLE),
			// 		drop_console: Boolean(VITE_DROP_CONSOLE),
			// 		drop_debugger: Boolean(VITE_DROP_CONSOLE)
			// 	}
			// }
		}
	}
}
