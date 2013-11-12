/*var appsData = [
  {
    title: 'State of the art, out of the box Meteor Pagination',
    author: 'alethes',
    url: 'http://pages2.meteor.com',
    source: 'https://github.com/alethes/meteor-pages'
  }, 
  {
    title: 'Balance is an open-source tool to keep track of shared finances for groups.',
    author: 'Alex Jarrett',
    url: 'http://balance.sharett.org/',
    source: 'https://github.com/sharett/balance'
  }, 
  {
    title: 'Easy to understand contracts for freelancers.',
    author: 'Ryan Glover',
    url: 'http://properapp.com'
  },
  {
    title: 'Telescope',
    author: 'Tom Coleman',
    url: 'http://telesc.pe',
    source: 'https://github.com/SachaG/Telescope'
  }, 
];*/

Template.appsList.helpers({
  apps: function() {
    return Apps.find();
  }
});

