window.FriendsCollection = Backbone.Collection.extend({
    model:      Friend
  , from:       0
  , offset:     6
  , initialize: function(opts){
    console.log('Friends:initialize'); 
  }
  , url: function(){
    //console.log('Friends:url');  
    return 'https://graph.facebook.com/me/friends?access_token='+this.access_token;
  }
  , parse: function(res) {
    //console.log('Friends:parse');
    res.data.sort(function(a,b){
      return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
    });
    return res.data;
  }
  , next: function(){
    console.log('from',this.from);
    this.from += this.offset;
    this.trigger('changePage');
  }
  , prev: function(){
    console.log('from',this.from);
    this.from -= this.offset;
    this.trigger('changePage');
  }
});
