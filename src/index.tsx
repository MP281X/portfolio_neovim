import './index.css'

import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Switch } from 'wouter'

import { AsyncBoundary } from '@lib/asyncBoundary.tsx'
import { Layout, NotFoundPage } from '@routes/+layout.tsx'

const context = import.meta.webpackContext('./routes', {
	recursive: true,
	regExp: /\+page\.tsx$/,
	mode: 'eager'
})

const imports = context.keys().map(key => {
	let path = key.trim()
	path = path.replace(/\([^)]*\)/g, '') // transform /(str) to /
	path = path.replaceAll('./routes', '') // remove folder name
	path = path.replaceAll('+page.tsx', '') // remove file name
	path = path.replace('./', '/').replace('.', '/') // replace . and ./ with /
	path = path.replaceAll(/\/+/g, '/') // transform / sequences to a single /
	if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1) // remove trailing /

	const dynamicImport = context(key) as Promise<{ default: () => React.JSX.Element }>

	return {
		path: path,
		component: lazy(() => dynamicImport)
	}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Layout>
			<AsyncBoundary>
				<Switch>
					{imports.map(props => (
						<Route key={props.path} {...props} />
					))}
					<Route path={'*'} children={<NotFoundPage />} />
				</Switch>
			</AsyncBoundary>
		</Layout>
	</React.StrictMode>
)
