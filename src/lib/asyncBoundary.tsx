import { ErrorBoundary } from '@lib/errorBoundary.tsx'
import { ErrorPage, LoadingPage } from '@routes/+layout.tsx'
import { Suspense } from 'react'

export namespace AsyncBoundary {
	export type Props = {
		className?: string
		children: React.ReactNode
	}
}
/**
 * Wrapper for the Suspense and ErrorBoundary api to simplify the
 * management of components that handle async data
 */
export const AsyncBoundary = (props: AsyncBoundary.Props) => {
	if (props.className) {
		return (
			<div className={props.className}>
				<ErrorBoundary fallback={({ message }) => <ErrorPage message={message} />}>
					<Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
				</ErrorBoundary>
			</div>
		)
	}

	return (
		<ErrorBoundary fallback={({ message }) => <ErrorPage message={message} />}>
			<Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
		</ErrorBoundary>
	)
}
