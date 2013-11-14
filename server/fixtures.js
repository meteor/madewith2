if (Apps.find().count() === 0) {
  var now = new Date().getTime();

  // create 4 users
  var danyId = Meteor.users.insert({
    profile: { name: 'Daenerys Targaryen' }
  });
  var dany = Meteor.users.findOne(danyId);

  var olennaId = Meteor.users.insert({
    profile: { name: 'Olenna Redwyne' }
  });
  var olenna = Meteor.users.findOne(olennaId);

  var halId = Meteor.users.insert({
    profile: { name: 'Hallyne the Pyromancer' }
  });
  var hal = Meteor.users.findOne(halId);

  var samId = Meteor.users.insert({
    profile: { name: 'Samwell Tarley' }
  });
  var sam = Meteor.users.findOne(samId);

  // create 3 apps
  Apps.insert({
    title: 'Wildfire: Pyromancy straight out of the jar',
    userId: hal._id,
    author: hal.profile.name,
    url: 'http://pages2.meteor.com',
    source: 'https://github.com/alethes/meteor-pages',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0, votecache: 0, score: 0
  });

  Apps.insert({
    title: "Dragonglass: easy to understand obsidian for the Night's Watch",
    userId: sam._id,
    author: sam.profile.name,
    url: 'http://balance.sharett.org/',
    source: 'https://github.com/sharett/balance',
    commentsCount: 0,
    submitted: now - 7 * 3600 * 1000,
    upvoters: [], votes: 0, votecache: 0, score: 0
  });

  for (var i = 0; i < 30; i++) {
    Apps.insert({
      title: 'Test App #' + i,
      author: dany.profile.name,
      userId: dany._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: now - i * 3600 * 1000,
      commentsCount: 0,
      upvoters: [], votes: 0, votecache: 0, score: 0
    });
  }

  var statecraftID = Apps.insert({
    title: 'Statecraft: data and analytics for multi-player cyvasse.',
    userId: olenna._id,
    author: olenna.profile.name,
    url: 'http://properapp.com',
    commentsCount: 2,
    upvoters: [], votes: 0, votecache: 0, score: 0
  });

  Comments.insert({
    appId: statecraftID,
    userId: dany._id,
    author: dany.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'That sounds useful! Would you be interested in advising my campaign?'
  });

  Comments.insert({
    appId: statecraftID,
    userId: olenna._id,
    author: olenna.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'Let\'s take this discussion offline.'
  });
}
