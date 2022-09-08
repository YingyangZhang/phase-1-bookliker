fetchBook();

function fetchBook(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        for(key of data){
            createBookList(key);
        }
    })
}

function createBookList(book){
    const list = document.querySelector('#list');
    const li = document.createElement('li');

    li.textContent = book.title;
    li.style.cursor = 'pointer';

    li.addEventListener('click', e =>{
        createDetails(book);
    });

    list.append(li);
}

function createDetails(book){
    const panel = document.querySelector('#show-panel');

    removeChildren(panel);

    const ul = document.createElement('ul');
    const bookThumbnail = document.createElement('img');
    const bookTitle = document.createElement('h1');
    const subtitle = document.createElement('h3');
    const author = document.createElement('h5');
    const description = document.createElement('p');
    const likeBotton = document.createElement('button');

    bookThumbnail.setAttribute('src', book.img_url);
    bookTitle.textContent = book.title;
    subtitle.textContent = book.subtitle;
    author.textContent = book.author;
    description.textContent = book.description;
    likeBotton.textContent = 'LIKE';
    book.users.forEach(user => {
        let userList = document.createElement('li');
        userList.textContent = user.username;
        ul.append(userList);
    })

    likeBotton.addEventListener('click', e => {
        updateUserlist(book.id, book.users);
        
    })

    panel.append(bookThumbnail, bookTitle, subtitle, author, description, ul, likeBotton);
}

function removeChildren(panel){
    let child = panel.lastElementChild;

    while(child){
        child.remove();
        child = panel.lastElementChild;
    }
}

function updateUserlist(id, users){
    let me = {
       users: [
        ...users,
        {
            id: (users.length++),
            username: 'New Guy',
        }
    ]
}

    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(me)
    })
    .then(resp => resp.json())
    .then(data => createDetails(data))
}