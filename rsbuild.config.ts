import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
	plugins: [
		pluginReact(),
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
			babelLoaderOptions: opts => void opts.plugins?.unshift('babel-plugin-react-compiler')
		})
	],
	tools: { postcss: (_, { addPlugins }) => void addPlugins(require('@tailwindcss/postcss')) }
})
