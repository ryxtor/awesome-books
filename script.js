const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const btnAdd = document.getElementById('btn-add-id');
const ul = document.querySelector('ul');

class BookCollection {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.books = [];
  }

  displayBooks() {
    this.books = JSON.parse(localStorage.getItem('book_author')) || [];
    if (ul.querySelectorAll('li')) {
      Array.from(ul.querySelectorAll('li')).forEach((bookContainer) => {
        ul.removeChild(bookContainer);
      });
    }

    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.className = 'book';
      const bookAuthor = document.createElement('p');
      bookAuthor.className = 'book-author';
      const deletebtn = document.createElement('button');
      deletebtn.id = book.id;
      deletebtn.className = 'remove-btn';
      deletebtn.textContent = 'Remove';
      deletebtn.addEventListener('click', () => {
        this.removeBook(book.id);
      });
      bookAuthor.textContent = `"${book.title}" by ${book.author}`;
      li.appendChild(bookAuthor);
      li.appendChild(deletebtn);
      ul.appendChild(li);
    });
  }

  removeBook(n) {
    this.books.forEach((e, i, lib) => {
      if (e.id === n) {
        lib.splice(i, 1);
      }
    });

    localStorage.setItem('book_author', JSON.stringify(this.books));
    this.displayBooks();
  }

  addBooks() {
    let newId = 1;
    if (this.books.length) {
      newId = this.books[this.books.length - 1].id + 1;
    }
    this.books.push(new BookCollection(this.title = inputTitle.value,
      this.author = inputAuthor.value, this.id = newId));
    localStorage.setItem('book_author', JSON.stringify(this.books));
  }
}

const runClass = new BookCollection();
runClass.displayBooks();

btnAdd.addEventListener('click', () => {
  runClass.addBooks();
  runClass.displayBooks();
});

function navSection(navItem) {
  const booklist = document.getElementById('books');
  const addBook = document.getElementById('add-books');
  const contact = document.getElementById('contact');

  if (navItem === 'booklist') {
    booklist.style.display = 'block';
    addBook.style.display = 'none';
    contact.style.display = 'none';
  } else if (navItem === 'addBook') {
    booklist.style.display = 'none';
    addBook.style.display = 'block';
    contact.style.display = 'none';
  } else {
    booklist.style.display = 'none';
    addBook.style.display = 'none';
    contact.style.display = 'flex';
  }
}
navSection('booklist');
