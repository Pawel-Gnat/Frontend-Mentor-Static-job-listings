const listOfJobs = document.querySelector('.job-listing')

export function jobOffer({
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
		<h2 class="job__info--position">${position}</h2>
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
		.map(element => `<button type="button" data-stack="${element}" class="job__requirements--requirement">${element}</button>`)
		.join('')
}

function checkNewState(newjob) {
	return newjob ? `<span class="job__info--new" data-new=${newjob}>new!</span>` : ''
}

function checkFeature(feature) {
	return feature ? `<span class="job__info--featured" data-featured=${feature}>featured</span>` : ''
}

export function addFeaturedBorder() {
	const featuredJobsText = Array.from(document.getElementsByClassName('job__info--featured'))

	featuredJobsText.forEach(el => {
		let featuredJob = el.closest('article')
		featuredJob.classList.add('featured')
	})
}
