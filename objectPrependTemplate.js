$('#form__btn-submit').on('click', createCard);
 // have a global array to push 
 // date thing to individualize each card and change the local storage. this should be an ID for local storage
// console.log(title)
//loop to search for card qualities and topics
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.rating = 'swill'
}

Idea.prototype.makeHTML () {
  return (
    `<article class="bookmark">
        <h2 class="bookmark__website-title">${this.title}</h2>
        <hr>
        <a href="" class="bookmark__website-link">${this.body}</a>
        <hr>
        <button class="bookmark__btn-read">Read</button>
        <button class="bookmark__btn-delete">Delete</button>
      </article>`
  )
}

function making a card() {
  var newTitle = $('#form__input-title')
  var newBody = $('#form__input-url')
  ideaNew = new Idea(newTitle.val(), newBody.val())

  // push newIdea to an array here?
  $('.section__ideas').prepend(ideaNew.generateHTML())
  }

// Bookmark.prototype.prependBookmark = function(){
//   e.preventDefault();
//   $('#section-bookmark-list').prepend(formatMark())
// } 

prototypes used for changing the qualities
/* 