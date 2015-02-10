(function() {

  return {
    events: {
      'app.created':'getTicketRequesterID',
      'userGetRequest.done': 'this.checkForAndDisplayAlert',
      'userGetRequest.fail': 'this.showError',
    },

    requests: {
      //Get the profile of the current ticket's requester
      userGetRequest: function(id) {
        return {
          url: '/api/v2/users/' + id + '.json',
          type:'GET',
          dataType: 'json'
        };
      },
    },

    //Get the ID of the Ticket's requester
    getTicketRequesterID: function() {
      var id = this.ticket().requester().id();
      this.ajax('userGetRequest', id);

    },

    checkForAndDisplayAlert: function(data) {
      var userData = data.user.user_fields.update_info;
      var userID = data.user.id;
       if (userData == "yes_update") {
        services.notify("You should update this user's data.", 'alert');
      } else {}

    },

    showError: function() {
      services.notify("NotifyApp: Unable to gather user data. You may want to check to see if an update is needed.", 'alert');

    }
  };
}());
