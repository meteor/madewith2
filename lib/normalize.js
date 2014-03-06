// canonicalize a URL or bare hostname into a FQDN
normalizeAppURL = function (name) {
  var match = name.match('(.*:\/\/)?([a-zA-Z0-9\._\-]+/?.*$)');
  var host = match && match[2];

  if (!host) {
    return null;
  } else {
    // remove trailing slash
    var submatch;
    if (submatch = host.match('(.*)/$')) {
      host = submatch[1];
    }
    return 'http://' + host;
  }
};

// Converts "http://foo.com/path" into a modified hostname eg
// "foo.com--path", for sake of URLs to madewith eg /app/foo.com_blog
toUrlName = function (url) {
  return url.replace(/^http:\/\//, '').replace(/\//g, '--');
};
