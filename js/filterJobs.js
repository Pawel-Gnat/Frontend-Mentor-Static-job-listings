const filterBox = document.querySelector('.filter-box')
const filteredStacksContainer = filterBox.querySelector('.filter')
const listOfJobs = document.querySelector('.job-listing')
const clearBox = document.querySelector('.clear')
let currentFilteredStacks = []

function displayFilterBox(box) {
	const chosenTechStack = Array.from(document.getElementsByClassName('filter__stack'))

	if (chosenTechStack.length > 0) {
		box.classList.add('display')
	} else {
		box.classList.remove('display')
	}
}

function filterJobs(e) {
	let target = e.target.closest('button')

	if (target && !currentFilteredStacks.includes(target.textContent)) {
		selectTechStack(target.textContent)
		filter(target.textContent)
		displayFilterBox(filterBox)
		currentFilteredStacks.push(target.textContent)
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

function deleteTechStack(e) {
	if (e.target.closest('button')) {
		let selectedStack = e.target.closest('div')
		let stackName = selectedStack.children[0].textContent
		selectedStack.remove()
		displayFilterBox(filterBox)
		removeStackFromArray(currentFilteredStacks, stackName)
	}
}

function removeStackFromArray(array, value) {
	const index = array.indexOf(value)
	return array.splice(index, 1)
}

displayFilterBox(filterBox)
listOfJobs.addEventListener('click', filterJobs)
filteredStacksContainer.addEventListener('click', deleteTechStack)

/* implement filter function here */

function filter(requirement) {
	const allRequirements = Array.from(document.getElementsByClassName('job__requirements'))

	allRequirements.forEach(el => {
		const parentContainer = el.parentElement
		const requirements = [...el.children]
		parentContainer.classList.add('hidden')

		const filteredJobs = requirements.filter(stack => {
			if (stack.dataset.stack == requirement) {
				parentContainer.classList.remove('hidden')
			}
		})
	})
}
