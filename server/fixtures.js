if (Apps.find().count() === 0) {
  Apps.insert({
    title: 'State of the art, out of the box Meteor Pagination',
    author: 'alethes',
    url: 'http://pages2.meteor.com',
    source: 'https://github.com/alethes/meteor-pages'
  });

  Apps.insert({
    title: 'Balance is an open-source tool to keep track of shared finances for groups.',
    author: 'Alex Jarrett',
    url: 'http://balance.sharett.org/',
    source: 'https://github.com/sharett/balance'
  });

  Apps.insert({
    title: 'Easy to understand contracts for freelancers.',
    author: 'Ryan Glover',
    url: 'http://properapp.com'
  });
}
