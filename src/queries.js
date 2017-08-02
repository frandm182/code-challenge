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
    content
    id
    title
    tags
    published
  }
}`;

export const EDIT_QUERY = 'mutation{editArticle(id:"#id",author:"#author",excerpt:"#excerpt",content:"#content",title:"#title",published:#published,tags:#tags){author}}';
export const DELETE_QUERY = 'mutation{deleteArticle(id:"#id"){author}}';
export const CREATE_QUERY = 'mutation{addArticle(author:"#author",excerpt:"#excerpt",content:"#content",title:"#title",published:#published){author}}';
