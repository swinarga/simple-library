let myLibrary = [
    {
        author: 'F. Scott Fitzgerald',
        title: 'The Great Gatsby',
        pages: '300',
        read: true
    },
    {
        author: 'Harper Lee',
        title: 'To Kill a Mockingbird',
        pages: '256',
        read: true
    },
    {
        author: 'Jane Austen',
        title: 'Pride and Prejudice',
        pages: '312',
        read: true
    }
];
const form = document.querySelector('#bookForm')
const tbody = document.querySelector('.table tbody')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.elements['title'].value
    const author = form.elements['author'].value
    const pages = form.elements['pages'].value
    let read
    if (document.querySelector('#read').checked) {
        read = true
    } else read = false
    console.log(read)

    let book = new Book(author, title, pages, read)
    addBookToLibrary(book)
    displayBooks()

})


function Book(author, title, pages, read) {
  // the constructor...
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book)
}
function displayBooks() {
    tbody.innerHTML = ''
    myLibrary.forEach((book, index) => {
        let row = document.createElement('tr')
        let readHTML = ''
        if (book.read) {
            readHTML = `<button class="btn btn-success" data-read="${book.title}">
                            Read
                        </button>`

        } else readHTML = `<button class="btn btn-danger" data-read="${book.title}">
                            Not Read
                            </button>`
        

        row.innerHTML = `<th scope="row">${index + 1}</th>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${readHTML}</td>
        <td>
            <button class="btn btn-danger" id="delete" data-title="${book.title}"}">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
        `
        tbody.appendChild(row)

        // toggle read Button
        const toggleReadBtn = document.querySelector(`button[data-read="${book.title}"]`)
        toggleReadBtn.addEventListener('click', toggleRead)


        // delete Button
        const delButton = document.querySelector(`button[data-title="${book.title}"]`)
        delButton.addEventListener('click', deleteBook)
    })
}

function deleteBook() {
    const index = myLibrary.indexOf(findBook(this.dataset.title))
    myLibrary.splice(index, 1)
    // redisplay books
    displayBooks()

}

function findBook(title) {
    for (let book of myLibrary) {
        if (book.title == title) return book
    }
    
    return alert('book not found')

 
}

function toggleRead() {
    const book = findBook(this.dataset.read)
    console.log(book)
    book.read = !book.read
    // redisplay books
    displayBooks()
}


displayBooks()



