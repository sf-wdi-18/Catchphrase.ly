// CLIENT

// on page load
$(function(){
  // get and render all the phrases
  Phrases.all();
  // set the view's behaviors
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.init = function() {
  // phrase form submit event listener
  $("#phrase-form").on("submit", function(e){
    // stop page reload
    e.preventDefault();
    // format form data into a query string
    var phraseParams = $(this).serialize();
    // send a post request to put this phrase in db
    Phrases.create(phraseParams);
    // reset the form
    $("#phrase-form")[0].reset();
    // give focus back to the phrase word input element
    // (instead of whichever was focused when submit event happened)
    $("#new-phrase").focus();
  });
}
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

// PHRASES OBJECT
function Phrases() {};
Phrases.all = function() {
  $.get("/phrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrase-ul", "phrases-template");
  });
}

Phrases.create = function(phraseParams) {
  $.post("/phrases", phraseParams).done(function(res){
    // once done, re-render all phrases
    Phrases.all();
  });
}
Phrases.delete = function(phrase) {
  var phraseId = $(phrase).data().id;
  $.ajax({
    url: '/phrases/' + phraseId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all phrases
      Phrases.all();
    }
  });
};

Phrases.update = function(e, form){
  e.preventDefault();
  // pull the values we want out of form
  var $form = $(form);
  var phraseId = $form.data().phraseid;
  var newWord = $form.find("input[name='word']").val();
  var newdefinition = $form.find("input[name='definition']").val();
  // send a POST request with the form values
  $.post("/update", {id: phraseId, word: newWord, definition: newdefinition})
  .done(function(res){
    // once done, re-render everything
    Phrases.all();
  });
}