export namespace StatusIcon {
	export type Status = 'error' | 'warning' | 'info' | 'loading' | 'success'
	export type Props = { status: StatusIcon.Status | undefined }
}
export function StatusIcon(props: StatusIcon.Props) {
	switch (props.status) {
		case 'error':
			return <span className="select-none font-family-icons text-error">report</span>
		case 'warning':
			return <span className="select-none font-family-icons text-warning">warning</span>
		case 'info':
			return <span className="select-none font-family-icons text-text-secondary">info</span>
		case 'success':
			return <span className="select-none font-family-icons text-text-secondary">check_circle</span>
		case 'loading':
			return <span className="animate-spin select-none font-family-icons text-text-secondary">sync</span>
		default:
			return <></>
	}
}
