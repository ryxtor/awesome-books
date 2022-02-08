const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const btnAdd = document.getElementById('btn-add-id');
const ul = document.querySelector('ul');

let bookCollection = JSON.parse(localStorage.getItem('book_author')) || [];

function displayBooks() {
  if (ul.querySelectorAll('li')) {
    Array.from(ul.querySelectorAll('li')).forEach((bookContainer) => {
      ul.removeChild(bookContainer);
    });
  }

  bookCollection.forEach((book) => {
    const li = document.createElement('li');
    li.className = 'book';
    const bookAuthor = document.createElement('p');
    bookAuthor.className = 'book-author';
    const bookTitle = document.createElement('p');
    bookTitle.className = 'book-title';
    const deletebtn = document.createElement('button');
    deletebtn.id = book.id;
    deletebtn.className = 'remove-btn';
    deletebtn.textContent = 'Remove';
    bookAuthor.textContent = book.author;
    bookTitle.textContent = book.title;
    li.appendChild(bookTitle);
    li.appendChild(bookAuthor);
    li.appendChild(deletebtn);
    ul.appendChild(li);
    const line = document.createElement('hr');
    li.appendChild(line);
  });
}

function refresh() {
  setTimeout(() => {
    window.location.reload();
  },
  100);
}

class AwesomeBooks {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBooks() {
    bookCollection.push(new AwesomeBooks(this.title = inputTitle.value,
      this.author = inputAuthor.value, this.id = bookCollection.length + 1));
  }

  removeBook() {
    const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));
    this.array = [];

    removeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        bookCollection.forEach((book) => {
          if (parseInt(btn.id, 10) !== book.id) {
            this.array.push(book);
          } else { refresh(); }
        });

        bookCollection = this.array;
        localStorage.setItem('book_author', JSON.stringify(bookCollection));
        displayBooks();
      });
    });
  }
}

function assignRemoveBtn() {
  if (bookCollection.length) {
    const remove = new AwesomeBooks();
    remove.removeBook();
  }
}

displayBooks();
assignRemoveBtn();

btnAdd.addEventListener('click', () => {
  const add = new AwesomeBooks();
  add.addBooks();
  localStorage.setItem('book_author', JSON.stringify(bookCollection));
  displayBooks();
  assignRemoveBtn();
});
