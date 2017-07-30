import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} from 'graphql';
import db from './db';

const articleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    excerpt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    articles: {
      type: new GraphQLList(articleType),
      resolve(p) {
        return db.Article.find({});
      },
    },
    article: {
      type: articleType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue,args) {
        console.log(args.id);
        return db.Article.find({_id: args.id});
      },
    },
  },
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
