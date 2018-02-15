//variables
var $cardTitle = $('.input__title');
var $cardBody = $('.input__body');
var $saveButton = $('.button__save');
var $ideaBoard = $('.section__ideas');
var $searchedItems = $('.input__search');
$saveButton.on('click', createNewIdea);
$ideaBoard.on('click', '.button__delete', deleteCard);
$ideaBoard.on('click', '.button__upvote', upvoteIdea);
$ideaBoard.on('click', '.button__downvote', downvoteIdea);
$searchedItems.on('keyup', searchIdeas);
$ideaBoard.on('blur', 'h2', editIdeaTitle);
$ideaBoard.on('blur', 'p', editIdeaBody);
$cardBody.on('keyup', saveActivate)
$cardTitle.on('keyup', saveActivate)

function saveActivate() {
  if ($cardBody.val() !== '' && $cardTitle.val() !== '') {
    $saveButton.attr('disabled', false);
  }
}

//Generating prepend card
function createNewIdea(e) {
  e.preventDefault();
  newIdeaCard = new IdeaCard($cardTitle.val(), $cardBody.val());
  $('.section__ideas').prepend(cardFormat(newIdeaCard));
  encodeIdea(newIdeaCard.id, newIdeaCard);
  resetFields();
}

function decodeIdea(key){
  var getIdea = localStorage.getItem(key);
  var parseIdea = JSON.parse(getIdea);
  return parseIdea
}

function encodeIdea(key, idea){
  localStorage.setItem(key, JSON.stringify(idea))
}

//Resetting fields
function resetFields() {
  $cardTitle.val('');
  $cardBody.val('');
  $saveButton.attr('disabled', true);
  $cardTitle.focus();
}

function IdeaCard(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function cardFormat(idea) {
  return (`<article class="card__ideas" id="${idea.id}" aria-label="this is an idea card">
    <div class="card--top">
    <h2 aria-label="idea title" contenteditable>${idea.title}</h2>
    <button class="button__delete" aria-label="delete button"></button>
    </div>
    <p aria-label="idea content" contenteditable>${idea.body}</p>
    <div class="card--bottom">
    <button class="button__upvote" aria-label="upvote idea button"></button>
    <button class="button__downvote" aria-label="downvote idea button"></button>
    <span class="quality--text">quality:</span><span class="quality--status" aria-live="true" aria-label="idea quality">&nbsp ${idea.quality}</span>
    </div>
    </article>`)
};

//Deleting individual cards and removing from local storage
function deleteCard() {
  var key = $(this).parent().parent().attr('id');
  localStorage.removeItem(key);
  $(this).closest('article').remove();
}

//Load Ideas from local storage
window.onload = function() {
  for (var i = 0; i < localStorage.length; i++) { //.forEach
    var getIdeas = localStorage.getItem(localStorage.key(i)); 
    var parseIdeas = JSON.parse(getIdeas);
    $('.section__ideas').prepend(cardFormat(parseIdeas)); //not this
  }
}

//Search through idea cards by title
function searchIdeas() {
  var search = $(this).val();
  $("h2:contains('" + search + "')").closest(".card__ideas").show();
  $("h2:not(:contains('" + search + "'))").closest(".card__ideas").hide();
  $("p:contains('" + search + "')").closest(".card__ideas").show();
}


//Upvote and downvote system display and save to local storage
function upvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var idea = decodeIdea(key);
  if (idea.quality === 'swill') {
    idea.quality = 'plausible';
    encodeIdea(key, idea);
    $(this).siblings('.quality--status').html('&nbsp plausible');
  } else if (idea.quality === 'plausible') {
    idea.quality = 'genius';
    encodeIdea(key, idea);
    $(this).siblings('.quality--status').html('&nbsp genius');
  }
}

function downvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var idea = decodeIdea(key)
  if (idea.quality === 'genius') {
    idea.quality = 'plausible';
    encodeIdea(key, idea);
    $(this).siblings('.quality--status').html('&nbsp plausible');
  } else if (idea.quality === 'plausible') {
    idea.quality = 'swill';
    encodeIdea(key, idea);
    $(this).siblings('.quality--status').html('&nbsp swill');
  }
}

//Saving editable content to local storage
function editIdeaTitle() {
  var newTitle = $(this).text();
  var key = $(this).parent().parent().attr('id');
  var idea = decodeIdea(key);
  idea.title = newTitle;
  encodeIdea(key, idea);
}

function editIdeaBody() {
  var newBody = $(this).text();
  var key = $(this).siblings().parent().attr('id');
  var idea = decodeIdea(key);
  idea.body = newBody;
  encodeIdea(key, idea);
}

// textarea submits on enterkey
$cardBody.on('keyup', function(e) {
  if (e.keyCode === 13) {
    $saveButton.click()
  }
});





