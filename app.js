console.log("JS Loaded!");
// Book object constructor 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

// function that returns all the data from a book object for example book2.prototype.info
Book.prototype.info = function() {
    return `${this.title} by ${this.author}. ${this.pages} pages. You have ${this.read ? "" : "not "}read this book.`
}

// Toggle between read and not read 
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

const myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

// adding 2 books as objects to the constructor 
addBookToLibrary(new Book("the Hobbit", "J.R.R Tolkien", 295, false));
addBookToLibrary(new Book ("American Gods", "Neil Gaiman", 545, true));

function renderLibrary() {
    const bookList = document.querySelector('#book-list');
    bookList.innerHTML = "";
    // Go through each array item and trigger createBookCard for that array item.
    const books = myLibrary.map((book, index) => createBookCard(book, index));
    // For each book item appendChild 
    books.forEach(book => bookList.appendChild(book));
}

function createBookCard(book, index) {
    // add classlist to each div created 
    const card = document.createElement("div");
    card.classList.add("card");
    // sets the dataset index of the div to be equal to the book's index. 
    card.dataset.index = index;
    // sets the card content to use the Book.prototype.info function
    card.textContent = book.info();
    // create a div element and then a class="buttons" to that element. 
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // create a button 
    const deleteButton = document.createElement("button");
    // Set button value as DELETE 
    deleteButton.textContent = "DELETE";
    // Add button to class 
    deleteButton.classList.add("red");
    // add listener to delete button 
    deleteButton.onclick = () => {
        // run function removeBookFromLibrary
        // run renderLibrary function 
        removeBookFromLibrary(index);
        renderLibrary();
    };
    buttons.appendChild(deleteButton);

    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "I didn't read it!" : "I Read it!";
    readButton.onclick = () => {
        book.toggleRead();
        renderLibrary();
    };
    buttons.appendChild(readButton);

    card.appendChild(buttons);

    return card;
}

// handling form inputs 
const form = document.querySelector("#newbook");
form.onsubmit = function(e) {
    console.log(e);
    e.preventDefault();
    const { title, author, pages, read } = form;
    console.log(read.value);
    addBookToLibrary(
        new Book(
            title.value,
            author.value,
            pages.value,
            read.value === "true" ? true : false
        )
    );
    renderLibrary();
    toggleNewBookForm();
};

// Function that toggles the form when add book is clicked 
function showform() {
    var x = document.getElementById("form");
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
  }
}

renderLibrary();