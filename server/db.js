import _ from 'lodash';
import Faker from 'faker';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

mongoose.connect('mongodb://localhost/billin');
mongoose.set('debug', true);

const Article = mongoose.model('Article', {
  author: String,
  content: String,
  excerpt: String,
  published: Boolean,
  tags: [String],
  title: String
});

Article.remove({}, (err) => {
  if (!err) {
    _.times(10, () => {
      const content = `
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
${Faker.lorem.paragraphs()}
`;
console.log('paso');
      return Article.create({
        author: Faker.name.findName(),
        content,
        excerpt: content.slice(0, 350),
        published: Faker.random.boolean(),
        tags: [Faker.random.words(), Faker.random.words()],
        title: Faker.name.title()
      });
    });
  }
});

export default { Article };
