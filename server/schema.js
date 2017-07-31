import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNumber,
  GraphQLNonNull
} from 'graphql';
import db from './db';

const articleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    author: { type: GraphQLString },
    content: { type: GraphQLString },
    excerpt: { type: GraphQLString },
    id: { type: GraphQLID },
    published: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
    title: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    articles: {
      type: new GraphQLList(articleType),
      resolve() {
        return db.Article.find({});
      },
    },
    article: {
      type: articleType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue,{id}) {
        return db.Article.findOne({_id: id});
      },
    },
  },
});
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle: {
      type: articleType,
      args: {
        author: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        excerpt: { type: GraphQLString },
        published: { type: GraphQLBoolean },
        tags: { type: new GraphQLList(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, {author, content, excerpt, published, tags, title}) {
        return db.Article.create({ author, content, excerpt,published, tags, title });
      }
    },
    deleteArticle: {
      type: articleType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, {id}) {
        return db.Article.remove({_id: id});
      }
    },
    editArticle: {
      type: articleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        author: { type: GraphQLString },
        content: { type: GraphQLString},
        excerpt: { type: GraphQLString },
        published: { type: GraphQLBoolean },
        tags: { type: GraphQLString },
        title: { type: GraphQLString }
      },
      resolve(parentValue, {author, content, excerpt, published, tags, title, id}) {        
        return db.Article.findOneAndUpdate({_id: id},{ author, content, excerpt, published, tags, title });
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: mutation
});

export default Schema;
