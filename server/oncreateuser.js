Accounts.onCreateUser(function (options, user) {
	if (options.profile)
		user.profile = options.profile;

	if (!user.profile.name)
		user.profile.name = user.services.github.username;

	return user;
});