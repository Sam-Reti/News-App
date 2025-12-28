const articleContainer = document.getElementById("article-container");

const url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=us&" +
  "sortBy=popularity&" +
  "apiKey=80e6eb2f12e143ae9dfd444ce893d580";

const req = new Request(url);

fetch(req)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log("API response:", data);

    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "news-card";

      const title = document.createElement("h3");
      title.textContent = article.title || "Untitled";

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

      inner.append(title, content, author);
      card.append(newsImg, inner);
      articleContainer.append(card);
    });
  });
