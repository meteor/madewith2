// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {
	Errors.insert({message: message})
}

Template.errorTemplate.helpers({
	errors:function(){
		return Errors.find();
	}
});