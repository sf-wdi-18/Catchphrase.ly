// following is shorthand for $(document).ready()
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
    $.post('/phrases', $(this).serialize()).done(function() {
      Phrase.all();
      // below: we need to grab the zero-th element from the
      // jquery objects because both .reset() and .focus() are
      // javascript methods (NOT jquery) that must be called on
      // the HTML element itself - not a jquery object containing
      // the HTML element
      $('#new_phrase_form')[0].reset();
      $('input.form-control')[0].focus();
    });
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