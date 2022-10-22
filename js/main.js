'use strict'

import { jobOffer, addFeaturedBorder } from './displayJobs.js'
import * as filterJobs from './filterJobs.js'

const JSON_SOURCE = './data.json'

async function renderData() {
	try {
		const res = await fetch(JSON_SOURCE)
		const data = await res.json()

		for (let job of data) {
			const {
				id,
				company,
				logo,
				['new']: newjob,
				featured,
				position,
				role,
				level,
				postedAt,
				contract,
				location,
				languages,
				tools,
			} = job

			jobOffer(job)
			addFeaturedBorder()
		}
	} catch {
		console.error("Can't fetch data from a file")
	}
}
renderData()
