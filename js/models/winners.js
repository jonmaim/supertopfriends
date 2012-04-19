window.WinnersModel = Backbone.Model.extend({
  defaults: {
      '1': { id:'0', img:'./images/dummy.png', firstname:'john doe' }
    , '2': { id:'0', img:'./images/dummy.png', firstname:'john doe' }
    , '3': { id:'0', img:'./images/dummy.png', firstname:'john doe' }
    , '4': { id:'0', img:'./images/dummy.png', firstname:'john doe' }
    , '5': { id:'0', img:'./images/dummy.png', firstname:'john doe' }
  }
  , full: false
  , initialize: function(){
    console.log('WinnersModel:initialize');            
  }
  , validate: function(attrs){
    console.log('WinnersModel.validate');
    /* All winner selected? */
    this.full = _.all(attrs, function(v){ return v.id !== '0'; }); 
  }
  , setWinner: function(checked, rank, id, firstname){
    console.log('WinnersModel:setWinner');
    if (checked){
      _.each(this.attributes, function(v,k){
        if (v.id===id){
          this.attributes[k] = this.defaults[k];
        }
      }, this);
      this.set(rank, {
          id:         id
        , img:        'https://graph.facebook.com/'+id+'/picture'
        , firstname:  firstname
      });
    } else {
      this.set(rank, this.defaults[rank] );    
    }
  }
});



