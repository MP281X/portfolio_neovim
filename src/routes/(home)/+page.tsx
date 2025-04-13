declare global {
	interface Routes {
		'/': Record<never, never>
	}
}

export default function () {
	return <div>home</div>
}
