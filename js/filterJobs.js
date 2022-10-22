const filterBox = document.querySelector('.filter-box')
const filteredStacksContainer = filterBox.querySelector('.filter')
const listOfJobs = document.querySelector('.job-listing')
let currentFilteredStacks = []

function displayFilterBox(box) {
	const chosenTechStack = Array.from(document.getElementsByClassName('filter__stack'))

	if (chosenTechStack.length > 0) {
		box.classList.add('display')
	} else {
		box.classList.remove('display')
	}
}

function addStackToFilter(e) {
	let target = e.target.closest('button')

	if (target && !currentFilteredStacks.includes(target.textContent)) {
		selectTechStack(target.textContent)
		displayFilterBox(filterBox)
		currentFilteredStacks.push(target.textContent)
		filterJobs()
	}
}

function selectTechStack(stack) {
	const techStack = document.createElement('div')
	techStack.className = 'filter__stack'

	techStack.innerHTML = `
        <span class="filter__stack--text">${stack}</span>
        <button class="filter__stack--icon">
            <img src="./images/icon-remove.svg" alt="Remove this filtered option">
        </button>
    `

	filteredStacksContainer.append(techStack)
}

function deleteStack(e) {
	if (e.target.closest('button').className == 'filter__stack--icon') {
		let selectedStack = e.target.closest('div')
		let stackName = selectedStack.children[0].textContent

		selectedStack.remove()
		displayFilterBox(filterBox)
		removeStackFromArray(currentFilteredStacks, stackName)
		filterJobs()
	}

	if (e.target.closest('button').className == 'clear__btn') {
		let filteredStacks = Array.from(document.getElementsByClassName('filter__stack'))
		let allJobs = Array.from(document.getElementsByClassName('job'))

		allJobs.forEach(job => job.classList.remove('hidden'))
		filteredStacks.forEach(el => el.remove())

		displayFilterBox(filterBox)
		currentFilteredStacks = []
	}
}

function removeStackFromArray(array, value) {
	const index = array.indexOf(value)
	return array.splice(index, 1)
}

function filterJobs() {
	const allRequirements = Array.from(document.getElementsByClassName('job__requirements'))
	let jobStacks = []

	allRequirements.forEach(jobRequirement => {
		const parentContainer = jobRequirement.parentElement
		const requirements = [...jobRequirement.children]

		requirements.forEach(el => jobStacks.push(el.textContent))

		parentContainer.classList.add('hidden')

		if (currentFilteredStacks.every(stack => jobStacks.includes(stack))) {
			parentContainer.classList.remove('hidden')
		}

		jobStacks = []
	})
}

displayFilterBox(filterBox)
listOfJobs.addEventListener('click', addStackToFilter)
filterBox.addEventListener('click', deleteStack)
