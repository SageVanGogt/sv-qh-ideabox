//variables
var $cardTitle = $('.input__title');

var $cardBody = $('.input__body');

var $saveButton = $('.button__save')

$saveButton.on('click', createNewIdea);

$('.section__ideas').on('click', '.button__delete', deleteCard)

//generating prepend card
function createNewIdea(e) {
  e.preventDefault();
  newIdeaCard = new IdeaCard($cardTitle.val(), $cardBody.val());
  $('.section__ideas').prepend(newIdeaCard.cardFormat());
}

function IdeaCard(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

IdeaCard.prototype.cardFormat = function() {
  return (`<article class="card__ideas">
      <div class="card--top">
      <h2>${this.title}</h2>
      <button class="button__delete"></button>
      </div>
      <p>${this.body}</p>
      <div class="card--bottom">
      <button class="button__upvote"></button>
      <button class="button__downvote"></button>
      <span class="quality--text">quality:</span><span class="quality--status">&nbsp ${this.quality}</span>
    </div>
  </article>`)
};

//deleting individual cards
function deleteCard() {
  $(this).closest('article').remove();
}