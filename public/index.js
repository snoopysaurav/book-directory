const formDOM = document.querySelector("form");
const booksDOM = document.querySelector(".show-all-books");
const bookDataDOM = document.querySelector(".book-data");
const bookContainer = document.querySelector(".book-container");
const updateFormDOM = document.querySelector(".update-form");

// Add Book & Update Book form container
const addContainer = document.querySelector(".add-container");
const updateContainer = document.querySelector(".update-container");

const submitBtn = document.querySelector("#submit-book");

// Show Books
const showAllBooks = async () => {
  try {
    const {
      data: { books },
    } = await axios.get("/api/v1/books");
    if (books.length < 1) {
      booksDOM.innerHTML = '<h5 class="empty-list">No Books in your DB.</h5>';
      return;
    }
    const allBooks = books
      .map((book) => {
        const { _id, title, author, rating, description } = book;
        return `
        <div class="book-data">
        <h4>Title: ${title}</h4>
        <h5>Author: ${author}</h5>
        <h6>Rating: ${rating}</h6>
        <button class="update-btn" data-id="${_id}"> 📝 Edit</button>
        <button class="delete-btn" data-id="${_id}">⚔ Delete</button>
        </div>
        `;
      })
      .join("");
    booksDOM.innerHTML = allBooks;
  } catch (error) {
    booksDOM.innerHTML = `<h3>No Books to Show</h3>`;
  }
};

showAllBooks();

// Add Book
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const rating = document.querySelector("#rating").value;
  const description = document.querySelector("#description").value;
  try {
    await axios.post("/api/v1/books", {
      title: title,
      author: author,
      rating: rating,
      description: description,
    });
    showAllBooks();
    formDOM.reset();
  } catch (error) {
    console.log("Error Occured");
  }
});

// Delete Book
// delete task /api/tasks/:id

booksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.classList.contains("delete-btn")) {
    const id = el.dataset.id;
    try {
      await axios.delete(`/api/v1/books/${id}`);
      showAllBooks();
    } catch (error) {
      console.log(error);
    }
  }
  if (el.classList.contains("update-btn")) {
    const id = el.dataset.id;
    el.parentElement.style.background = "blue";
    el.parentElement.style.color = "white";
    updateContainer.style.color = "blue";
    // Edit Book
    updateFormDOM.addEventListener("submit", async (e) => {
      e.preventDefault();
      const updateTitle = document.querySelector("#updateTitle").value;
      const updateAuthor = document.querySelector("#updateAuthor").value;
      const updateRating = document.querySelector("#updateRating").value;
      const updateDescription =
        document.querySelector("#updateDescription").value;
      try {
        await axios.patch(`/api/v1/books/${id}`, {
          title: updateTitle,
          author: updateAuthor,
          rating: updateRating,
          description: updateDescription,
        });
        showAllBooks();
        updateFormDOM.reset();
        updateContainer.style.color = "black";
      } catch (error) {
        console.log(error);
      }
    });
  }
});
