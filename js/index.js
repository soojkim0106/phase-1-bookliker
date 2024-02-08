
const booksUrl = 'http://localhost:3000/books'
const usersUrl = 'http://localhost:3000/users'
const list = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')


const displayDetails = (bookObj) => {
    
    showPanel.innerHTML = ''

    const bookTitle = document.createElement('h1')
    const bookImg = document.createElement('img')
    const bookDescription = document.createElement('p')
    const usersLike = document.createElement('ul')
    const likeButton = document.createElement('btn')

    bookTitle.innerText = bookObj.title
    bookImg.src = bookObj.img_url
    bookImg.alt = bookObj.title
    bookDescription.innerText = bookObj.description
    bookObj.users.forEach(user => {
        const userList = document.createElement('li')
        userList.innerText = user.username
        usersLike.append(userList)
    })
    likeButton.addEventListener('click', () => {
        let username = window.prompt('username')
        fetch(`${booksUrl}/${bookObj.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users: [...bookObj.users, {id: bookObj.users.length + 1, username}]
            })
        })
        .then(() => {
        const userList = document.createElement('li')
        userList.innerText = username
        usersLike.append(userList)})

        .catch(err => console.log(err))
    })

    likeButton.setAttribute('id', 'button')
    likeButton.innerText = 'Like ❤️'

    showPanel.append(bookImg, bookTitle, bookDescription, usersLike, likeButton)

}

const displayBook = (bookObj) => {
    const bookTitle = document.createElement('li')
    bookTitle.innerText = bookObj.title
    bookTitle.addEventListener('click', () => displayDetails(bookObj))
    list.appendChild(bookTitle)
}

const getBooks = () => {
    return fetch(booksUrl)
    .then(resp => resp.json())
    .then((booksData) => {
        booksData.forEach(bookData => displayBook(bookData))
    })
    .catch(err => console.log(err))
}

getBooks()