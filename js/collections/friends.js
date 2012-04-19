window.FriendsCollection = Backbone.Collection.extend({
    model:        FriendModel
  , from:         0
  , offset:       6
  , access_token: null
  , initialize: function(){
    console.log('FriendsCollection:initialize'); 
  }
  , url: function(){
    return 'https://graph.facebook.com/me/friends?access_token='+this.access_token;
  }
  , parse: function(res) {
    res.data.sort(function(a,b){
      return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
    });
    return res.data;
  }
  , next: function(){
    this.from += this.offset;
    this.trigger('changePage');
  }
  , prev: function(){
    this.from -= this.offset;
    this.trigger('changePage');
  }
});
