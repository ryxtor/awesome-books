const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const btnAdd = document.getElementById('btn-add-id');
const ul = document.querySelector('ul');

let bookCollection = JSON.parse(localStorage.getItem('book_author')) || [];

function AwesomeBooks(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

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

function assignRemoveBtn() {
  if (bookCollection.length) {
    const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));

    removeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const array = [];
        bookCollection.forEach((book) => {
          if (parseInt(btn.id, 10) !== book.id) {
            array.push(book);
          } else { refresh(); }
        });

        bookCollection = array;
        localStorage.setItem('book_author', JSON.stringify(bookCollection));
        displayBooks();
      });
    });
  }
}

displayBooks();
assignRemoveBtn();

const addBook = () => {
  const inputs = new AwesomeBooks(inputTitle.value, inputAuthor.value, bookCollection.length + 1);
  bookCollection.push(inputs);
};

btnAdd.addEventListener('click', () => {
  addBook();
  localStorage.setItem('book_author', JSON.stringify(bookCollection));
  displayBooks();
  assignRemoveBtn();
});
