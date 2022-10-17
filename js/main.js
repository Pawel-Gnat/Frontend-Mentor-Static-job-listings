const JSON_SOURCE = './data.json'

async function renderData() {
	try {
		const res = await fetch(JSON_SOURCE)
		const data = await res.json()
		console.log(data)
	} catch {
		console.error("Can't fetch data from a file")
	}
}
// renderData()