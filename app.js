// write a constructor for creating "book" objects 
// book object needs a title, author, number of pages, and read 
let myLibrary = [];

// user input book functions
function userInput() {
    // Get the values from user input
    var title = document.querySelector('[data-name=title').value;
    var author = document.querySelector('[data-name=author').value;
    var numofpages = document.querySelector('[data-name=numofpages').value;
    var read = document.querySelector('[data-name=read').checked;

    // create a variable that will take in the values the user entered 
    let newbook = new Book(title, author, numofpages, read)

    // add the new book to library array 
    myLibrary.push(newbook);

    // display the array for testing
    console.log(myLibrary);

    // reset to blank to stop results duplicating
    document.getElementById('target-id').innerHTML = "";
    // for each item in the array perform: 
    myLibrary.forEach(book => {
        document.getElementById('target-id').innerHTML += 
        `
        <table>
        <tr>
            <td>Title: ${book.title}</td>
            <td>Author: ${book.author}</td>
            <td>Pages: ${book.numofpages}</td>
            <td>Read: ${book.read}</td>
            <td><button class="delete">Delete</button></td>
        </tr>
        </table>
        `
    });

    // clear the text inputs after each entry
    title = document.querySelector('[data-name=title').value = "";
    author = document.querySelector('[data-name=author').value = "";
    numofpages = document.querySelector('[data-name=numofpages').value;
    read = document.querySelector('[data-name=read').checked;
}

function Book(title, author, numofpages, read = true) {
    // passes the title that was passed into the function into the object as a prop.
    this.title = title ; 
    this.author = author;
    this.numofpages = numofpages;
    this.read = read ? "yes" : "no";
    this.info = function() {
        return info = `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

// New book button toggles form 
function showform() {
    var x = document.getElementById("form");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// if delete button is pressed 
document.querySelector('#target-id').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        removebook(e.target.parentElement.parentElement.children[0].textContent)
    }
});

// removebook function 
const removebook = (title) => {
    myLibrary.forEach((book, index) => {
        if (book.title == title) myLibrary.splice(index, 1);
    })
    // log objects after deletion 
    console.log(myLibrary);
}

// change read status function
const changeReadStatus = (read, title) => {
    myLibrary.forEach(book => {
        if(book.title === title) book.read = read
    })
}

// change read status
document.querySelector('#target-id').addEventListener('click', (e) => {
    if (e.target.className == "read-status"){
        if(e.target.textContent == 'yes') {
            e.target.textContent = "no"
            changeReadStatus(e.target.textContent, e.target.parentElement.children[0].textContent)
        } else {
            e.target.textContent = 'yes'
            changeReadStatus(e.target.textContent, e.target.parentElement.children[0].textContent)
        }
    }
});

// once created different books and propertys can be created 
// console.log(Book1.title, Book2.author, Book1.numofpages, Book1.Read);


// function to display array onclick for testing 
function display() {
    console.log(myLibrary);
}