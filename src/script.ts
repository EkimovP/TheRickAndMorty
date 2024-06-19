// Interfaces
interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	gender: string;
	image: string;
}

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const cardsContainer = document.getElementById('cardsContainer');
const paginationContainer = document.getElementById('pagination');
let characters: Character[] = [];

// Functions
async function fetchCharacters(page: number = 1) {
	try {
		const response = await fetch(`${apiUrl}?page=${page}`);
		const data = await response.json();
		characters = data.results;
		displayCharacters();
		setupPagination(data.info.pages, page);
	} catch (error) {
		console.error('Error fetching characters:', error);
	}
}

function displayCharacters() {
	if (!cardsContainer) return;
	cardsContainer.innerHTML = '';
	characters.forEach((character) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <a href="#" onclick="showDetails(${character.id})">View details</a>
        `;
		cardsContainer.appendChild(card);
	});
}

function setupPagination(totalPages: number, currentPage: number) {
	if (!paginationContainer) return;
	paginationContainer.innerHTML = '';
	for (let i = 1; i <= totalPages; i++) {
		const button = document.createElement('button');
		button.innerText = `${i}`;
		button.addEventListener('click', () => {
			fetchCharacters(i);
		});
		if (i === currentPage) {
			button.disabled = true;
		}
		paginationContainer.appendChild(button);
	}
}

async function searchCharacters() {
	const searchInput = document.getElementById('searchInput') as HTMLInputElement;
	const searchQuery = searchInput.value.trim();

	let apiUrlWithParams = `${apiUrl}?`;

	if (searchQuery !== '') {
		apiUrlWithParams += `name=${searchQuery}&`;
	}

	const statusFilter = (document.getElementById('statusFilter') as HTMLSelectElement).value;
	if (statusFilter) {
		apiUrlWithParams += `status=${statusFilter}&`;
	}

	const speciesFilter = (document.getElementById('speciesFilter') as HTMLSelectElement).value;
	if (speciesFilter) {
		apiUrlWithParams += `species=${speciesFilter}&`;
	}

	try {
		const response = await fetch(apiUrlWithParams);
		const data = await response.json();
		characters = data.results;
		displayCharacters();
		if (paginationContainer) {
			paginationContainer.innerHTML = '';
		}
	} catch (error) {
		console.error('Error searching characters:', error);
	}
}

async function showDetails(characterId: number) {
	const character = characters.find(char => char.id === characterId);
	if (!character) return;
	// Redirect to character.html with character details
	window.location.href = `character.html?id=${character.id}&name=${encodeURIComponent(character.name)}`;
}

// Initial fetch
fetchCharacters();
