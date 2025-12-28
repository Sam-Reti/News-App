const articleContainer = document.getElementById("article-container");

function fetchNews(category = "general") {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=80e6eb2f12e143ae9dfd444ce893d580`;

  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      renderArticles(data.articles);
    });
}

document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    fetchNews(category);
  });
});

fetchNews();

function renderArticles(articles) {
  articleContainer.innerHTML = "";

  console.log("API response:", articles);

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";

    const title = document.createElement("h3");
    title.textContent = article.title
      ? article.title.slice(0, 50) + " ..."
      : "No preview available.";

    const content = document.createElement("p");
    content.textContent = article.content
      ? article.content.slice(0, 100) + "..."
      : "No preview available.";

    const author = document.createElement("span");
    author.textContent = article.author || "Unkown Authur";

    const newsImg = document.createElement("img");
    newsImg.className = "newsImg";
    if (article.urlToImage) {
      newsImg.src = article.urlToImage;
      newsImg.alt = article.title;
    } else {
      newsImg.src = "Images/news img.jpeg";
    }

    const inner = document.createElement("div");
    inner.className = "inner";

    const newsLink = document.createElement("a");
    newsLink.href = article.url;
    newsLink.textContent = "Read More";
    newsLink.className = "newsLink";

    inner.append(title, content, newsLink);
    card.append(newsImg, inner);
    articleContainer.append(card);
  });
}
