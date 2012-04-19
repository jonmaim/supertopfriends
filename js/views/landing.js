window.LandingView = Backbone.View.extend({
    el  : '#view_entry'
  , initialize  : function(){
    console.log('LandingView:initialize');
    this.template = _.template( $('#landing_view_template').html() );
    FB.init({
        appId      : '301452643259358'
      , status     : true
      , cookie     : true
      , xfbml      : true
      , oauth      : true
    });
  } 
  , events : {
    'click #login_btn'  : 'clickLoginBtn' 
  }
  , render : function(){
    console.log('LandingView:render');
    this.$el.html( this.template() );
    return this;
  }
  , clickLoginBtn  : function(e){
    console.log('LandingView:clickLoginBtn');
    var collection = this.collection;
    FB.login(function(res) {
      if (res.authResponse) {
        collection.access_token = res.authResponse.accessToken;
        window.location.href = e.target.href;
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }); 
    return false;
  }
});
