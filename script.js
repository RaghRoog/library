let myLibrary = [];
let booksContainer = document.querySelector('.books-container')
let checkbox = document.querySelector('.checkbox')
let books = 0;
function book(title, author, pages, read){ 
    let book = {
        title: title,
        author: author,
        pages: pages,
        read: read
    }
    myLibrary.push(book)

    let div = document.createElement('div')
    div.classList.add('book')
    div.dataset.order = books
    div.innerHTML = `${myLibrary[books].title}<br>
    ${myLibrary[books].author}<br>
    ${myLibrary[books].pages} pages<br>`
    booksContainer.appendChild(div)
    
    let readButton = document.createElement('button')
    readButton.classList.add('read-button')
    readButton.innerHTML = myLibrary[books].read
    div.appendChild(readButton)
    
    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete book'
    deleteButton.classList.add('delete-button')
    div.appendChild(deleteButton)   
    deleteButton.addEventListener('click', removingBook)
    function removingBook(){
        let bookToRemove = div.dataset.order
        delete myLibrary[div.dataset.order]
        booksContainer.removeChild(div)
    }
    function changingReadStatus(){
        if(readButton.innerHTML=='Read'){
            readButton.innerHTML='Not read yet'
            readButton.style.backgroundColor = 'red'
        }else if(readButton.innerHTML=='Not read yet'){
            readButton.innerHTML='Read'
            readButton.style.backgroundColor = 'green'
        }
    }
    readButton.addEventListener('click', changingReadStatus)
    if(read=='Read'){
        readButton.style.backgroundColor = 'green'
    }else if(read=='Not read yet'){
        readButton.style.backgroundColor = 'red'
    }
}
let formContainer = document.querySelector('.form-container')
function addBookToLibrary(){  
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let read = ''
    title = titleCapitalize(title)
    author = authorCapitalize(author)
    if(checkbox.checked){
        read = 'Read'
    }else{
        read = 'Not read yet'
    }
    book(title, author, pages, read)
    books +=1; 
    formContainer.style.display = 'none' 
}
let add = document.querySelector('.add-book')
add.addEventListener('click', displayForm)

function displayForm(){
    formContainer.style.display = 'block'
    title.value = ''
    author.value = ''
    pages.value = ''
    checkbox.checked = false
}

let addBook = document.querySelector('.add-new-book')
addBook.addEventListener('click', addBookToLibrary)

function titleCapitalize(title){
    let returnedTitle = ''
    if(title.includes('"')==true){
        firstCharacter = title.charAt(1)
        firstCharacter = firstCharacter.toUpperCase()
        let rest = title.slice(2)
        returnedTitle = '"' +firstCharacter +rest
    }else if(title.includes("'")==true){
        firstCharacter = title.charAt(1)
        firstCharacter = firstCharacter.toUpperCase()
        let rest = title.slice(2, -1)
        returnedTitle = '"' +firstCharacter +rest +'"'
    }
    else{
        let firstCharacter = title.charAt(0)
        firstCharacter = firstCharacter.toUpperCase()
        let rest = title.slice(1)
        returnedTitle = '"' +firstCharacter +rest +'"'
    }
    return returnedTitle
}

function authorCapitalize(author){
    let authorFullName = author.split(' ')
    let newArray = []
    function Capitalize(item){
        let first = item.charAt(0)
        let rest = item.slice(1)
        first = first.toUpperCase()
        newArray.push(first +rest)
    }
    authorFullName = authorFullName.forEach(Capitalize)
    newArray = newArray.join(' ')
    return newArray
}
