//variables
var $cardTitle = $('.input__title');
var $cardBody = $('.input__body');
var $saveButton = $('.button__save')
$saveButton.on('click', createNewIdea);
$('.section__ideas').on('click', '.button__delete', deleteCard);
// var ideaArray = [];

//generating prepend card
function createNewIdea(e) {
  e.preventDefault();
  newIdeaCard = new IdeaCard($cardTitle.val(), $cardBody.val());
  $('.section__ideas').prepend(cardFormat(newIdeaCard));
  localStorage.setItem(newIdeaCard.id, JSON.stringify(newIdeaCard));
}

function IdeaCard(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function cardFormat(idea) {
  return (`<article class="card__ideas" id="${idea.id}">
      <div class="card--top">
      <h2>${idea.title}</h2>
      <button class="button__delete"></button>
      </div>
      <p>${idea.body}</p>
      <div class="card--bottom">
      <button class="button__upvote"></button>
      <button class="button__downvote"></button>
      <span class="quality--text">quality:</span><span class="quality--status">&nbsp ${idea.quality}</span>
    </div>
  </article>`)
};

//deleting individual cards
function deleteCard() {
  var key = $(this).parent().parent().attr('id');
  localStorage.removeItem(key);
  $(this).closest('article').remove();
}

//Load Ideas
window.onload = function() {
   for (var i = 0; i < localStorage.length; i++) {
    var getIdeas = localStorage.getItem(localStorage.key(i));
    var parseIdeas = JSON.parse(getIdeas);
      $('.section__ideas').prepend(cardFormat(parseIdeas));
    }
  }


