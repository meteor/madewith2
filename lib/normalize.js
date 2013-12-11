// canonicalize a URL or bare hostname into a FQDN
normalizeAppURL = function (name) {
  var match = name.match('(.*:\/\/)?([a-zA-Z0-9\._\-]+/?.*$)');
  var host = match && match[2];

  if (!host)
    return null;
  else
    return 'http://' + host;
};