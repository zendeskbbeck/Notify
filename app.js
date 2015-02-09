(function() {

  return {
    events: {
      'app.created':'generateAlert',
      'userGetRequest.done': 'this.showAlert',
      'userGetRequest.fail': 'this.showError',
    },

    requests: {
      userGetRequest: function(id) {
        return {
          url: '/api/v2/users/' + id + '.json',
          type:'GET',
          dataType: 'json'
        };
      },
    },

    generateAlert: function() {
      var id = this.ticket().requester().id();
      this.ajax('userGetRequest', id);

    },

    showAlert: function(data) {
      console.log(data);
      var userData = data.user.user_fields.update_info;
      var userID = data.user.id;
       if (userData == "yes_update") {
        services.notify("You should update this user's data, they are user " + userID + ".", 'alert');
      } else {}

    },

    showError: function() {
      alert("Unable to gather user data. You may want to check to see if an update is needed.");

    }
  };
}());
