export async function handler(event) {
  const category = event.queryStringParameters?.category || "general";
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Missing NEWS_API_KEY env var" }),
    };
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(
    category
  )}&apiKey=${apiKey}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    return {
      statusCode: resp.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: "Proxy fetch failed",
        details: String(err),
      }),
    };
  }
}
