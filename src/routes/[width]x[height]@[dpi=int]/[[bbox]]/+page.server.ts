import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'
import { styleStore } from '$lib/stores/style'
import { get } from 'svelte/store'

async function getImageUrl(response: Promise<Response>, url: string): Promise<string> {
	return response.then(async (r) => {
		const file_name = await r.text()
		return url + file_name
	})
}

export const load: PageServerLoad = async ({ setHeaders, params, url, fetch }) => {
	const width: Number = parseFloat(params.width) || 12
	const height: Number = parseFloat(params.height) || 8
	const dpi: Number = parseFloat(params.dpi) || 96
	const bbox: String = params.bbox || '-74.20,40.52,-73.70,41.004'

	const waterCol: String = url.searchParams.get('waterCol') ?? ''

	console.log('Fetch map params: ', { width, height, dpi, bbox, waterCol })

	let apiUrl = 'https://mapbox-map-image-export-ywplflbqsq-uc.a.run.app/'
	if (env.LOCAL == 'true') {
		apiUrl = 'http://localhost:3000/'
	}
	const response = fetch(apiUrl, {
		method: 'POST',
		body: JSON.stringify({ width, height, dpi, bbox, waterCol }),
		headers: { 'Content-Type': 'application/json' }
	})

	// return a promise of image url,
	// this promise will be automaticly awaited already on the page
	return { url: getImageUrl(response, apiUrl) }
}
