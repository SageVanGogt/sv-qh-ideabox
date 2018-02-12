//variables
var $cardTitle = $('.input__title');
var $cardBody = $('.input__body');
var $saveButton = $('.button__save')
var $ideaBoard = $('.section__ideas')
$saveButton.on('click', createNewIdea);
$ideaBoard.on('click', '.button__delete', deleteCard);
$ideaBoard.on('click', '.button__upvote', upvoteIdea);
$ideaBoard.on('click', '.button__downvote', downvoteIdea);

//generating prepend card
function createNewIdea(e) {
  e.preventDefault();
  newIdeaCard = new IdeaCard($cardTitle.val(), $cardBody.val());
  $('.section__ideas').prepend(cardFormat(newIdeaCard));
  localStorage.setItem(newIdeaCard.id, JSON.stringify(newIdeaCard));
  resetFields();
}

//resettting fields
function resetFields() {
  $cardTitle.val('');
  $cardBody.val('');
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

//Load Ideas from local storage
window.onload = function() {
   for (var i = 0; i < localStorage.length; i++) {
    var getIdeas = localStorage.getItem(localStorage.key(i));
    var parseIdeas = JSON.parse(getIdeas);
      $('.section__ideas').prepend(cardFormat(parseIdeas));
    }
  }

//upvote system
function upvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var getIdea = localStorage.getItem(key);
  var parseIdea = JSON.parse(getIdea)
  if (parseIdea.quality === 'swill') {
    parseIdea.quality = 'plausible';
    localStorage.setItem(key, JSON.stringify(parseIdea));
  } else if (parseIdea.quality === 'plausible') {
    parseIdea.quality = 'genius';
    localStorage.setItem(key, JSON.stringify(parseIdea));
  }
}

//downvote system
function downvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var getIdea = localStorage.getItem(key);
  var parseIdea = JSON.parse(getIdea)
  if (parseIdea.quality === 'genius') {
    parseIdea.quality = 'plausible';
    localStorage.setItem(key, JSON.stringify(parseIdea));
  } else if (parseIdea.quality === 'plausible') {
    parseIdea.quality = 'swill';
    localStorage.setItem(key, JSON.stringify(parseIdea));
  }
}

