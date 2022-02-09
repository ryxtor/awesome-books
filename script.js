const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const btnAdd = document.getElementById('btn-add-id');
const ul = document.querySelector('ul');

function refresh() {
  setTimeout(() => {
    window.location.reload();
  },
  100);
}

class BookCollection {
  constructor(title, author, id) {
    this.books = JSON.parse(localStorage.getItem('book_author')) || [];
    this.title = title;
    this.author = author;
    this.id = id;
  }

  displayBooks() {
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
      bookAuthor.textContent = `"${book.title}" by ${book.author}`;
      li.appendChild(bookAuthor);
      li.appendChild(deletebtn);
      ul.appendChild(li);
    });
  }

  assignRemoveBtn() {
    if (this.books.length) {
      const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));
      this.array = [];

      removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.books.forEach((book) => {
            if (parseInt(btn.id, 10) !== book.id) {
              this.array.push(book);
            } else { refresh(); }
          });

          this.books = this.array;
          localStorage.setItem('book_author', JSON.stringify(this.books));
          this.displayBooks();
        });
      });
    }
  }

  addBooks() {
    this.books.push(new BookCollection(this.title = inputTitle.value,
      this.author = inputAuthor.value, this.id = this.books.length + 1));
  }

  setbooks() {
    localStorage.setItem('book_author', JSON.stringify(this.books));
  }
}

const runClass = new BookCollection();
runClass.displayBooks();
runClass.assignRemoveBtn();

btnAdd.addEventListener('click', () => {
  runClass.addBooks();
  runClass.setbooks();
  runClass.displayBooks();
  runClass.assignRemoveBtn();
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
