// Query Selectors
const form = document.querySelector('form');
const submitButton = document.querySelector('.submit-btn');
const tableBody = document.querySelector('.table-body');
const tableRows = document.querySelectorAll('tr');
const deleteAllButton = document.querySelector('.delete-all-btn');
const deleteButton = document.querySelector('.delete-btn');
const year = document.querySelector('#year');

let deleteIsActive = false;

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function displayBooks() {
  myLibrary.forEach(book => {
    const newRow = tableBody.insertRow();
    const titleCell = newRow.insertCell(0);
    const authorCell = newRow.insertCell(1);
    const pagesCell = newRow.insertCell(2);
    const readCell = newRow.insertCell(3);

    titleCell.innerHTML = `${book.title}`;
    authorCell.innerHTML = `${book.author}`;
    pagesCell.innerHTML = `${book.pages}`;
    book.read === true ? readCell.innerHTML = `Yes` : readCell.innerHTML = `No`;
    toggleRead(readCell);
  })
}

function displayBook(book) {
  const newRow = tableBody.insertRow();
  const titleCell = newRow.insertCell(0);
  const authorCell = newRow.insertCell(1);
  const pagesCell = newRow.insertCell(2);
  const readCell = newRow.insertCell(3);

  titleCell.innerHTML = `${book.title}`;
  authorCell.innerHTML = `${book.author}`;
  pagesCell.innerHTML = `${book.pages}`;
  book.read === true ? readCell.innerHTML = `Yes` : readCell.innerHTML = `No`;

  toggleRead(readCell);
  newRow.addEventListener('click', () => {
    deleteBook(newRow);
  });
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}


function toggleRead(cell) {
  cell.addEventListener('click', () => {
    if (cell.innerHTML === 'Yes') {
      cell.innerHTML = `No`;
      cell.read = false;
    } else {
      cell.innerHTML = `Yes`;
      cell.read = true;
    }
  })
}

function getNewBook() {
  const titleValue = document.querySelector('#title').value;
  const authorValue = document.querySelector('#author').value;
  const pagesValue = document.querySelector('#pages').value;
  const readValue = document.querySelector('#read').checked;

  const newBook = new Book(titleValue, authorValue, pagesValue, readValue);

  addBookToLibrary(newBook);
  displayBook(newBook);
  form.reset();
}

function deleteAll() {
  tableBody.innerHTML = '';
  myLibrary = [];
}

function toggleDeleteIsActive() {
  if (deleteIsActive === true) {
    deleteIsActive = false;
    document.body.style.cursor = "";
    deleteButton.style.backgroundColor = "";
  } else {
    deleteIsActive = true;
    document.body.style.cursor = "pointer";
    deleteButton.style.backgroundColor = "red";
  }
}

function deleteBook(row) {
  if (deleteIsActive) {
    row.parentNode.removeChild(row);
  }
}


// Event Listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();
  getNewBook();
})

deleteAllButton.addEventListener('click', () => {
  deleteAll();
})

deleteButton.addEventListener('click', () => {
  toggleDeleteIsActive();
})

// Set year in the footer
function displayYear() {
  let date = new Date();
  year.innerHTML = date.getFullYear();
}

displayBooks();
displayYear();
