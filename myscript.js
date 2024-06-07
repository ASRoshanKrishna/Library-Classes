let index = 0;

const form = document.querySelector('#fo');
const cards = document.querySelector('.cards');

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#addnew");
const closeButton = document.querySelector("#close");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    event.preventDefault();
    form.reset();
    dialog.close();
});

class Book{
    constructor(index, title, author, pages, read){
        this.index = index;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    togBook(){
        this.read = !(this.read);
    }
}

class Lib{
    constructor(){
        this.bookArr = [];
    }

    update(){
        while(cards.firstChild){
            cards.removeChild(cards.firstChild);
        }
        for(let o of this.bookArr){
            console.log(o);
            const n = document.createElement("div");
            n.className = "card";
            let complete = `Not Read`;
            if(o.read == true) complete =  `Read`;
            let inhtml = 
            `<p><h3>${o.title}</h3></p>
            <p>by - ${o.author}</p>
            <p>pages - ${o.pages}</p>
            <div>
                <button id="switch" type="button" onclick="toggle(${o.index})">${complete}</button>
            </div>
            <div>
                <button id="del" type="button" onclick="removeCard(${o.index})">Remove</button>
            </div>`;
            n.innerHTML = inhtml;
            cards.appendChild(n);
        }
    }

    add(index, title, author, pages, read){
        const b = new Book(index, title, author, pages, read);
        this.bookArr.push(b);
        this.update();
    }

    rm(i){
        let a = 0;
        let rc = this.bookArr[i];
        this.bookArr = this.bookArr.filter(function(item) {
            if(item !== rc){
                item.index = a++; 
                return item;
            }
        })
        index = a;
        this.update();
    }

    tog(i){
        let ab = this.bookArr[i];
        ab.togBook();
        this.update();
        // console.log(ab);
    }
}
const l = new Lib();
l.add(index++, 'The Hobbit', 'J.R.R. Tolkien', 295, true);
l.add(index++, 'Harry Potter', 'J. K. Rowling', 223, true);
l.add(index++, 'Da Vinci Code', 'Dan Brown', 689, false);


const toggle = function(ival){
     l.tog(ival);
}

const New = function() {
    const getTitle = document.querySelector("#val");
    const getAuthor = document.querySelector('#author');
    const getPages = document.querySelector('#pages');
    const getRead = document.querySelector('#read').checked;

    if(getTitle.value && getAuthor.value && getPages.value > 0){
        // console.log(title.value);
        l.add(index++, getTitle.value, getAuthor.value, getPages.value, getRead);
        event.preventDefault();
        form.reset();
        dialog.close();
    }
}

const removeCard = function(ival) {
    l.rm(ival);
}