var Movie = Backbone.Model.extend({

  defaults: {
    like: true,
  },

 

  toggleLike: function() {
    // your code here
 this.set('like', false);
//console.log(this.collection)
this.collection.sort();//
//this.render();


console.log(AppView)
//modelView.ren
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
  

  },

  comparator: 'title',

  sortByField: function(field) {
    //this.set('comparator',field)
    //field = this.comparator;
    //this.models.set({comparator: field});
    console.log(this)
    this.set('comparator', field)
    this.comparator = field

  }


});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
    //this.collection.set('comparator', field);
    console.log(this.collection)
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();

  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
  this.render();
  console.log(this)
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    this.model.toggleLike();
    


  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
