import { StatusIcon } from '@components/icons'

export const Layout: React.FC<{ children: React.ReactNode }> = props => {
	return (
		<div className="font-semibold text-2xl text-text">
			<div className="flex min-h-svh flex-col items-center justify-center">{props.children}</div>
		</div>
	)
}

export const LoadingPage = () => {
	return (
		<main className="col-span-full row-span-full flex flex-initial items-center justify-center gap-2 text-4xl">
			<StatusIcon status="loading" />
		</main>
	)
}

export const ErrorPage: React.FC<{ message: string | undefined }> = props => {
	return (
		<main className="col-span-full row-span-full flex flex-initial items-center justify-center gap-2 text-4xl">
			<StatusIcon status="error" />
			<div>{props.message}</div>
			<StatusIcon status="error" />
		</main>
	)
}

export const NotFoundPage = () => {
	return (
		<main className="col-span-full row-span-full flex h-svh flex-initial items-center justify-center gap-2 text-4xl">
			<StatusIcon status="warning" />
			<div>404</div>
			<StatusIcon status="warning" />
		</main>
	)
}
