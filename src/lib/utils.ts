/**
 * Remove the keys of an object with null values
 */
export function removeNullKeys<T extends Record<string, unknown>>(obj: T) {
	const cleanedObj: Record<string, unknown> = {}
	for (const [key, value] of Object.entries(obj)) {
		if (value == null) continue
		cleanedObj[key] = value
	}
	return cleanedObj as { [K in keyof T]: Exclude<T[K], null | undefined> }
}
