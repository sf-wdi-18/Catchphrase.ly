// on page load
$(function(){
  // get and render the food
  Phrase.all();
  View.init();
});

// View object
function View() {};

View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

View.init = function() {
  $('#new_phrase_form').on('submit', function(event) {
    event.preventDefault();
    $.post('/phrases', $(this).serialize()).done(function() { Phrase.all(); });
  });
};

// Phrase object
function Phrase() {};

Phrase.all = function() {
  $.get('/phrases', function(res) {
    var phrases = JSON.parse(res);
    View.render(phrases, "phrase-ul", "phrases-template");
  });
};

Phrase.delete = function(phrase) {
  var phraseId = $(phrase).data().id;
  $.ajax({
    url: '/phrases/' + phraseId,
    type: 'DELETE',
    success: function(res) {
      // re-render
      Phrase.all();
    }
  });
};