import React, { useEffect, useState } from 'react'

export namespace ErrorBoundary {
	export type Props = {
		fallback: React.FC<{ message: string | undefined }>
		children: React.ReactNode
	}
}
/**
 * Render the fallback if there is an error
 */
export class ErrorBoundary extends React.Component<ErrorBoundary.Props, { error: unknown }> {
	constructor(props: ErrorBoundary.Props) {
		super(props)
		this.state = { error: undefined }
	}

	override componentDidCatch(error: unknown) {
		this.setState({ error: error })
	}

	override componentDidUpdate(prevProps: ErrorBoundary.Props) {
		if (prevProps.children !== this.props.children) {
			this.setState({ error: undefined })
		}
	}

	override render() {
		if (this.state.error === undefined) return this.props.children
		return <ErrorHandler fallback={this.props.fallback} error={this.state.error} />
	}
}

namespace ErrorHandler {
	export type Props = {
		fallback: React.FC<{ message: string | undefined }>
		error: unknown
	}
}
const ErrorHandler = ({ error, fallback }: ErrorHandler.Props) => {
	const [message, setMessage] = useState<string>()

	useEffect(() => {
		let message
		if (error instanceof Error) message = error.message
		else if (typeof error === 'string') message = error

		setMessage(message)
	}, [error])

	return fallback({ message })
}
