export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    title
  }
}`;

export const ARTICLE_QUERY = `{
  article(id: "#") {
    author
    excerpt
    id
    title
  }
}`;