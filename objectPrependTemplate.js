$('.button__save').on('click', createCard);
// $('.button__save').on('click', Idea);
 // have a global array to push 
 // date thing to individualize each card and change the local storage. this should be an ID for local storage
// console.log(title)
//loop to search for card qualities and topics
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.rating = 'swill'
}

Idea.prototype.makeHTML = function() {
  return (
    `<article class="card__ideas">
      <div class="card--top">
      <h2>${this.title}</h2>
      <button class="button__delete"></button>
      </div>
      <p>${this.body}</p>
      <div class="card--bottom">
      <button class="button__upvote"></button>
      <button class="button__downvote"></button>
      <span class="quality--text">quality:</span><span class="quality--status">&nbsp ${this.rating}</span>
    </div>
  </article>`
  )
}

function createCard(e) {
  e.preventDefault();
  console.log('here?');
  var newTitle = $('.input__title').val();
  var newBody = $('.input__body').val();
  ideaNew = new Idea(newTitle, newBody);
console.log('showup?')
  // push newIdea to an array here?
  $('.section__ideas').prepend(ideaNew.makeHTML());
  }

// Bookmark.prototype.prependBookmark = function(){
//   e.preventDefault();
//   $('#section-bookmark-list').prepend(formatMark())
// } 

prototypes used for changing the qualities
/* 