//variables
var $cardTitle = $('.input__title');
var $cardBody = $('.input__body');
var $saveButton = $('.button__save')
var $ideaBoard = $('.section__ideas')
// var $searchedItems = $('input__search')
// var $quality = $('.quality--status')
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

function decodeIdea(key){
  var getIdea = localStorage.getItem(key);
  var parseIdea = JSON.parse(getIdea);
  return parseIdea
}

function encodeIdea(key, idea){
  localStorage.setItem(key, JSON.stringify(idea))
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
   for (var i = 0; i < localStorage.length; i++) { //.forEach
    var getIdeas = localStorage.getItem(localStorage.key(i)); 
    var parseIdeas = JSON.parse(getIdeas);
      $('.section__ideas').prepend(cardFormat(parseIdeas)); //not this
    }
  }

//search system
//loop function to grab ideas. then if it matches input from user, prepend and hide the non matched other stuff. 
//can we use array prototype filter() to search?
//!!!indexOf prototype will serve as our search.
// var searchedItems = localStorage.filter(function (search) {
//   if (search.body.indexof($searchedItems) !== -1) {
//     //hide these
//   } else {
//   return search.body.indexof($searchedItems) !== -1;
//   }
// })
// $('.section__ideas').prepend(cardFormat(searchedItem));



//upvote system
function upvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var idea = decodeIdea(key)
  if (idea.quality === 'swill') {
    idea.quality = 'plausible';
    encodeIdea(key, idea);
    $('.quality--status').html('&nbsp plausible');
  } else if (idea.quality === 'plausible') {
    idea.quality = 'genius';
    encodeIdea(key, idea);
    $('.quality--status').html('&nbsp genius');
  }
}

//downvote system. Can a global this variable become local if called in a function?
function downvoteIdea() {
  var key = $(this).parent().parent().attr('id');
  var idea = decodeIdea(key)// encode and decode functions called here should be convention
  if (idea.quality === 'genius') {
    idea.quality = 'plausible';
    encodeIdea(key, idea);
    $('.quality--status').html('&nbsp plausible');
  } else if (idea.quality === 'plausible') {
    idea.quality = 'swill';
    encodeIdea(key, idea);
    $('.quality--status').html('&nbsp swill');
  }
}

