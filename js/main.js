'use strict'
const JSON_SOURCE = './data.json'
const listOfJobs = document.querySelector('.job-listing')
const filterBox = document.querySelector('.filter')
const techStackButtons = document.getElementsByClassName('job__requirements--requirement')

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
		}
	} catch {
		console.error("Can't fetch data from a file")
	}
}
renderData()

function jobOffer({
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
}) {
	const newJob = document.createElement('article')
	newJob.classList.add('job')
	newJob.dataset.id = `${id}`

	let requirement = [role, level, ...languages, ...tools]

	newJob.innerHTML = `
	<div class="job__logo">
		<img src="${logo}" class="job__logo--img" alt="" aria-hidden="true">
	</div>
	<div class="job__info">
		<span class="job__info--company">${company}</span>
		${checkNewState(newjob)}
		${checkFeature(featured)}
		<p class="job__info--position">${position}</p>
		<p class="job__info--description">${postedAt}<span>&middot;</span>${contract}<span>&middot;</span>${location}</p>
	</div>
	<div class="job__requirements">
		${addTechStack(requirement)}
	</div>
	`
	listOfJobs.append(newJob)
}

function addTechStack(elements) {
	return elements
		.map(element => `<button type="button" class="job__requirements--requirement">${element}</button>`)
		.join('')
}

function checkNewState(newjob) {
	return newjob ? `<span class="job__info--new" data-new=${newjob}>new!</span>` : ''
}

function checkFeature(feature) {
	return feature ? `<span class="job__info--featured" data-featured=${feature}>featured</span>` : ''
}

function addFeaturedBorder() {
	const featuredJobsText = document.getElementsByClassName('job__info--featured')
	let text = [...featuredJobsText]
	console.log(text)
	console.log(featuredJobsText)
}
addFeaturedBorder()

function filterJobs(e) {
	return console.log(e.target)
}

// ;[...techStackButtons].forEach(btn => btn.addEventListener('click', filterJobs))

let btns = [...techStackButtons]
console.log(btns)

btns.forEach(btn =>
	btn.addEventListener('click', function () {
		console.log('lol')
	})
)
