import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'

async function getImageUrl(response: Promise<Response>, url: string): Promise<string> {
	return response.then(async (r) => {
		const file_name = await r.text()
		return url + file_name
	})
}

export const load: PageServerLoad = async ({ setHeaders, params, fetch }) => {
	console.log(params)
	const width: Number = parseInt(params.width) || 12
	const height: Number = parseInt(params.height) || 8
	const dpi: Number = parseInt(params.dpi) || 96

	const bbox: String = params.bbox || '-74.20,40.52,-73.70,41.004'

	let url = 'https://mapbox-map-image-export-ywplflbqsq-uc.a.run.app/'
	if (env.LOCAL == 'true') {
		url = 'http://localhost:3000/'
	}
	const response = fetch(url, {
		method: 'POST',
		body: JSON.stringify({ width, height, dpi, bbox }),
		headers: { 'Content-Type': 'application/json' }
	})

	// return a promise of image url,
	// this promise will be automaticly awaited already on the page
	return { url: getImageUrl(response, url) }
}
