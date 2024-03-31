import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'

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
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ width, height, dpi, bbox }),
		headers: { 'Content-Type': 'application/json' }
	})
	const file_name: string = await response.text()
	const imgUrl: string = url + file_name
	console.log(imgUrl)
	return { url: imgUrl }
}
