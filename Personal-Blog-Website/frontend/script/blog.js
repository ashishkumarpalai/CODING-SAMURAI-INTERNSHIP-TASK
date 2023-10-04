// Function to fetch and display articles
async function fetchAndDisplayArticles() {
    try {
        const response = await fetch('https://coading-samurai-internship-blog-app.onrender.com/blog'); // Replace with your API URL
        console.log(response);
        if (!response.ok) {
            alert("you data is not fetched correctly")
        }

        const data = await response.json();
        console.log(data);
        const articleListContainer = document.getElementById('article-list');

        // Create article listings
        data.forEach((article) => {
            const articleItem = document.createElement('div');
            articleItem.classList.add('article-item');
            articleItem.innerHTML = `
                <div class="article-image">
                    <img src="${article.image}" alt="Article Image">
                </div>
                <div class="article-details">
                    <h2>Article: ${article.title}</h2>
                    <p>Author: ${article.author}</p>
                    <p>Publication Date: ${formatDate(article.publicationDate)}</p>
                    <a href="article.html?id=${article._id}">Read More</a>
                </div>
            `;
            articleListContainer.appendChild(articleItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to fetch and display an individual article
async function fetchAndDisplayArticle() {
    const queryParams = new URLSearchParams(window.location.search);
    const articleId = queryParams.get('id');

    try {
        const response = await fetch(`https://coading-samurai-internship-blog-app.onrender.com/blog/${articleId}`); // Replace with your API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const article = await response.json();
        const articleContentContainer = document.getElementById('article-content');

        // Create an individual article page
        const articlePage = document.createElement('div');
        articlePage.innerHTML = `
            <h1>Title:- ${article.title}</h1>
            <img src="${article.image}" alt="Article Image">
            <h2>Author: ${article.author}</h2>
            <h3>Publication Date: ${formatDate(article.publicationDate)}</h3>
            <p>Content:- ${article.content}</p>
        `;
        articleContentContainer.appendChild(articlePage);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchAndDisplayArticles()
fetchAndDisplayArticle();
// Check if the page is the article listing page or individual article page

{/* <div><img src="${article.image}" alt="Article Image"></div>
            <div><h2>${article.title}</h2>
            <p>Author: ${article.author}</p>
            <p>Publication Date: ${formatDate(article.publicationDate)}</p>
            <p>${article.content}</p></div> */}