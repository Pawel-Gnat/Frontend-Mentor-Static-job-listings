'use strict'
const JSON_SOURCE = './data.json'
const listOfJobs = document.querySelector('.job-listing')

async function renderData() {
	try {
		const res = await fetch(JSON_SOURCE)
		const data = await res.json()
		// console.log(...data)
		// console.log(object.entries(...data))

		for (let job of data) {
			// console.log(job)
			let id = job.id

			console.log(id)
		}
	} catch {
		console.error("Can't fetch data from a file")
	}
}
renderData()

function jobOffer({ id, images, company, role, postedAt, contract, location, requirement }) {
	const newJob = document.createElement('article')
	newJob.classList.add('job')
	newJob.dataset.id = `${id}`

	newJob.innerHTML = `
	<div class="job__logo">
		<img src="${images}" class="job__logo--img" alt="" aria-hidden="true">
	</div>
	<div class="job__info">
		<span class="job__info--company">${company}</span>
		<span class="job__info--new">new!</span>
		<span class="job__info--featured">featured</span>
		<p class="job__info--role">${role}</p>
		<p class="job__info--description">${postedAt}<span>&middot;</span>${contract}<span>&middot;</span>${location}</p>
	</div>
	<div class="job__requirements">
		<button type="button" class="job__requirements--requirement">${requirement}</button>
	</div>
	`

	listOfJobs.append(newJob)
}
