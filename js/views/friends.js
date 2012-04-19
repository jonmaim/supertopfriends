window.FriendsView = Backbone.View.extend({
    el  : '#view_entry'
  , initialize  : function(){
    console.log('FriendsView:initialize');
    _.bindAll(this, 'render');
    this.template = _.template( $('#friends_view_template').html() );
    /* Event bindings. */
    this.model.bind('change',     this.render);
    this.collection.bind('reset', this.render);
  } 
  , events : {
      'click input[type=checkbox]'  : 'clickChoice'
    , 'click #publish_btn'          : 'clickPublish' 
    , 'click #prev'                 : 'clickPrev'
    , 'click #next'                 : 'clickNext'
  },
  render : function(){
    console.log('FriendsView:render');
    this.$el.html( this.template({
        winners:  this.model.toJSON()
      , friends:  this.collection.toJSON()
      , from:     this.collection.from
      , offset:   this.collection.offset
    }) );
    this.$('#publish_btn').toggle( this.model.full );
    return this;
  }
  , clickChoice: function(e){
    console.log('FriendsView:clickChoice');
    var checked   = e.target.checked;
    var rank      = parseInt(e.target.value, 10);
    var id        = $(e.target).data('id');
    var firstname = $(e.target).data('firstname');
    this.model.setWinner( checked, rank, id, firstname );
    return true;
  } 
  , clickPublish: function(){
    console.log('FriendsView:clickPublish');
    var friendsName = _.reduce( 
      _.map(this.model.toJSON(), function(v){ return v.firstname}), 
      function(l,r){ return l+', '+r} 
    );
    var params = {
      method:       'feed',
      link:         'http://jonmaim.github.com/supertopfriends',
      name:         'Super Top Friends',
      caption:      'My best friends are: '+friendsName,
      description:  'Oh yeah!'
    };
    FB.ui(params, function(res){ 
      //console.log(res);
    });
    return false;
  }
  , clickPrev: function(){
    console.log('FriendsView:clickPrev');
    this.collection.prev();         
    return false;
  }
  , clickNext: function(){
    console.log('FriendsView:clickNext');
    this.collection.next();         
    return false;
  }
});
