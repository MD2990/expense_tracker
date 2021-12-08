import useSWR from 'swr';

export default function useAPI(api, options) {
	const { data, error } = useSWR(api, options);

	return {
		data,
		isLoading: !error && !data,
		error,
	};
}
