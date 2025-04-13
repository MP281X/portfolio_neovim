import { removeNullKeys } from '@lib/utils.ts'
import { useMemo } from 'react'
import { useLocation, useSearch } from 'wouter'

/**
 * typed object to read and update the query params
 */
export const useQueryParams = <Path extends keyof Routes>(_path_: Path, defaultValues: Partial<Routes[Path]> = {}) => {
	const [baseUrl, setLocation] = useLocation()
	const rawQueryParams = useSearch()

	const queryParams = useMemo(() => {
		const parsedQueryParams = new URLSearchParams(rawQueryParams)

		return { ...defaultValues, ...Object.fromEntries(parsedQueryParams) }
	}, [rawQueryParams, defaultValues])

	const setQueryParams = (params: Partial<Routes[Path]>) => {
		const mergedParams = removeNullKeys({ ...queryParams, ...params })
		const queryParamsStr = new URLSearchParams(mergedParams).toString().trim()
		const fullUrl = queryParamsStr ? `${baseUrl}?${queryParamsStr}` : baseUrl
		setLocation(fullUrl)
	}

	return [queryParams as any as Routes[Path], setQueryParams] as const
}
