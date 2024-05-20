document.addEventListener('DOMContentLoaded', () => {
    const recipe = JSON.parse(decodeURIComponent(localStorage.getItem('selectedRecipe')));
    if (recipe) {
        document.getElementById('recipe-title').textContent = recipe.label;
        document.getElementById('recipe-image').src = recipe.image;
        document.getElementById('recipe-ingredients').innerHTML = recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('');
        document.getElementById('recipe-url').href = recipe.url;
        document.getElementById('recipe-id').value = recipe.uri;

        loadComments(recipe.uri);
        
        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addComment(recipe.uri);
        });
    } else {
        document.getElementById('recipe-title').textContent = 'No recipe selected';
    }
});

async function loadComments(recipeId) {
    try {
        const response = await fetch(`http://localhost/chefapp/get_comments.php?recipe_id=${encodeURIComponent(recipeId)}`);
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

function displayComments(comments) {
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = comments.map(comment => `
        <div class="comment">
            <p><strong>${comment.username}</strong> (${new Date(comment.created_at).toLocaleString()}):</p>
            <p>${comment.comment}</p>
        </div>
    `).join('');
}

async function addComment(recipeId) {
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    const formData = new FormData();
    formData.append('recipe_id', recipeId);
    formData.append('username', username);
    formData.append('comment', comment);

    try {
        const response = await fetch('http://localhost/chefapp/add_comment.php', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const newComment = await response.json();
            loadComments(recipeId);
            document.getElementById('comment-form').reset();
        } else {
            console.error('Error adding comment:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}
