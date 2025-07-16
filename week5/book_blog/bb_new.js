/* -------------------------------------------------------------
   book_blog.js – builds every review card from a data array
   Last updated: July 15 2025
---------------------------------------------------------------- */

/* 1.  -------- DATA: add or remove objects to change reviews --- */
const reviews = [
  {
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    ageRange: "10–14",
    genre: "Fantasy",
    rating: 5,                 // 0‑to‑5
    img: "Magkycover.jpg",
    alt: "Book cover of Septimus Heap",
    blurb:
      "If you enjoy stories about seventh sons of seventh sons and magyk, this book is for you.",
    linkLabel: "Read More…"
  },
  {
    title: "Magnus Chase Book One: The Sword of Summer",
    date: "December 12, 2021",
    ageRange: "12–14",
    genre: "Fantasy",
    rating: 4,
    img: "magnus.jpg",
    alt: "Book cover for Magnus Chase Book One",
    blurb:
      "If you enjoy humorous Norse‑mythology adventures, Rick Riordan delivers another page‑turner.",
    linkLabel: "Read More…"
  }
];

/* 2.  -------- HELPERS ---------------------------------------- */
/** Return a string of inline SVG stars equal to `count`. */
function makeStars(count) {
  const star =
    '<svg aria-hidden="true" class="bi bi-star-fill" width="16" height="16" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
  return Array.from({ length: count }, () => star).join("");
}

/* 3.  -------- RENDER ----------------------------------------- */
function renderReviews(list) {
  const main = document.getElementById("reviews");

  list.forEach(
    (
      { title, date, ageRange, genre, rating, img, alt, blurb, linkLabel },
      i
    ) => {
      const rowClass = `row${(i % 2) + 1}`; // keeps your zebra‑striped rows

      /* --- meta: ALWAYS left side --- */
      const meta = document.createElement("section");
      meta.className = `${rowClass} column1`;
      meta.innerHTML = `
        ${date}<br>${ageRange}<br>${genre}<br>
        ${makeStars(rating)}
      `;

      /* --- content: ALWAYS right side --- */
      const content = document.createElement("section");
      content.className = `${rowClass} column2`;
      content.innerHTML = `
        <h2>${title}</h2>
        <img src="${img}" alt="${alt}">
        <p>${blurb} <a href="#" aria-label="Read more about ${title}">${linkLabel}</a></p>
      `;

      /* append in order so flex/grid CSS flows naturally */
      main.appendChild(meta);
      main.appendChild(content);
    }
  );
}

/* 4.  -------- INIT ------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => renderReviews(reviews));
