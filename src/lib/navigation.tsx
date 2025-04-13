import { removeNullKeys } from '@lib/utils.ts'
import { Link as WouterLink } from 'wouter'

/**
 * Full page refresh
 */
export const navigateTo = <Path extends keyof Routes>(path: Path, queryParams: Routes[Path]) => {
	const queryParamsStr = new URLSearchParams(removeNullKeys(queryParams as Record<any, any>)).toString().trim()
	const fullPath = queryParamsStr ? `${path}?${queryParamsStr}` : path
	window.location.replace(fullPath)
}

export namespace Link {
	export type QueryParams<Path extends keyof Routes> = Record<never, never> extends Routes[Path]
		? Record<never, never>
		: { queryParams: Routes[Path] }

	export type Props<Path extends keyof Routes> = {
		path: Path
		children: React.ReactNode
		className?: string
	} & QueryParams<Path>
}

/**
 * Client side navigation
 */
export function Link<Path extends keyof Routes>(props: Link.Props<Path>) {
	const queryParams = 'queryParams' in props ? props.queryParams : {}
	const queryParamsStr = new URLSearchParams(removeNullKeys(queryParams)).toString().trim()
	const fullPath = queryParamsStr ? `${props.path}?${queryParamsStr}` : props.path
	return (
		<WouterLink className={props.className} to={fullPath}>
			{props.children}
		</WouterLink>
	)
}
