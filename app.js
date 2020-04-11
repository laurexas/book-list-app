// Listen on form submit

let form = document.querySelector("#form");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let priceInput = document.querySelector("#price");
let container = document.querySelector(".container");
let tbody = document.querySelector(".tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = new Book(titleInput.value, authorInput.value, priceInput.value);
  const app = new application();
  // Validation
  if (
    titleInput.value.length < 1 ||
    authorInput.value.length < 1 ||
    priceInput.value.length < 1
  ) {
    app.showModal("Please fill all values inside a form", "error");
  } else {
    app.addBookToList(book);
    app.showModal("Book added successfully!", "success");
    app.clearInputs();
  }
});

tbody.addEventListener("click", (e) => {
  e.preventDefault();
  const app = new application();
  app.deleteRow(e.target);
});

// Book class

class Book {
  constructor(title, author, price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }
}

// class for app methods

class application {
  showModal(message, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);
    setTimeout(() => {
      div.remove();
    }, 1000);
  }
  addBookToList(book) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td class="delete-cell"><a href="" class="delete">X</a></td>
    `;
    tbody.appendChild(row);
  }
  clearInputs() {
    titleInput.value = "";
    authorInput.value = "";
    priceInput.value = "";
  }

  deleteRow(target) {
    target.parentNode.parentNode.remove();
  }
}
