var App = {}

App.Input = Ractive.extend({
  template: '#input',
  init: function() {
    var self = this;

    self.observe("selectedPostcode", function(value) {
      self.fire("changed-postcode", value);
    });
  }
});

App.Decoder  = Ractive.extend({
  el: '.container',
  template: "#decoder",
  components: {
    postcode: App.Input
  },
  init: function() {
    var self = this;

    self.on("decode", function(postcode) {
      console.log("decode", postcode);
    });
  }
});

new App.Decoder();
