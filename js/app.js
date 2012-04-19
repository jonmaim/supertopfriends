$(function(){
  /* Router. */
  window.App = Backbone.Router.extend({
    routes: {
        ''              : 'landing'
      , 'friends'       : 'friends'
      , 'friends/:from' : 'friends'
      /* Default route. */
      , '*path'         : 'landing'
    }
    , initialize: function(){
      console.log('router:initialize');
      /* Models. */
      this.winnersModel = new WinnersModel();
      /* Collections.*/
      this.friendsCollection = new FriendsCollection();
      /* Views. */
      this.landingView  = new LandingView({ 
          collection: this.friendsCollection 
      });
      this.friendsView  = new FriendsView({ 
          model     : this.winnersModel
        , collection: this.friendsCollection 
      });
      /* Event binding. */
      this.friendsCollection.bind('changePage', _.bind(function(){
        this.navigate('friends/'+this.friendsCollection.from, {trigger:true});
      }, this));
    }
    , landing: function(){
      console.log('router:landing');
      /* Dom insertion. */
      this.landingView.render();
    }
    , friends: function(from){
      console.log('router:friends');
      this.friendsCollection.from = parseInt(from,10) || 0;
      if (this.friendsCollection.models.length){
        this.friendsView.render();
      } else if (this.friendsCollection.access_token){
        this.friendsCollection.fetch(); 
      } else {
        this.navigate('', {trigger:true});
      }
    }
  });
});
