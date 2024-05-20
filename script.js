const searchForm = document.querySelector('#search-bar');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=1d1b4a15&app_key=abe9266c7a96568a634a4a9fa60ce323&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div class="recipe-card" onclick="viewRecipe('${encodeURIComponent(JSON.stringify(recipe.recipe))}')">
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
        </div>
        `;
    });
    resultsList.innerHTML = html;
}

function viewRecipe(recipe) {
    localStorage.setItem('selectedRecipe', recipe);
    window.location.href = 'recipe.html';
}
