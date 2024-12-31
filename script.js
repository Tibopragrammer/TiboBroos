document.addEventListener('DOMContentLoaded', function () {
    const bookNotes = document.querySelectorAll('.book-note');
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const searchFilter = document.getElementById('searchFilter');
    const genreFilter = document.getElementById('genreFilter');

    bookNotes.forEach(bookNote => {
        bookNote.addEventListener('click', () => {
            modalContent.innerHTML = bookNote.querySelector('.note-content').innerHTML;
            modal.classList.add('active');
        });
    });

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        bookNotes.forEach(bookNote => {
            const title = bookNote.querySelector('h2').textContent.toLowerCase();
            const author = bookNote.querySelector('p:nth-child(2)').textContent.toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                bookNote.style.display = 'block';
            } else {
                bookNote.style.display = 'none';
            }
        });
    });

    sortSelect.addEventListener('change', function () {
        const selectedValue = sortSelect.value;

        if (selectedValue === 'default') {
            bookNotes.forEach((note, index) => {
                note.style.order = index + 1;
            });
        } else if (selectedValue === 'titleAsc') {
            sortNotesByField(bookNotes, 'h2', 'textContent', 'asc');
        } else if (selectedValue === 'titleDesc') {
            sortNotesByField(bookNotes, 'h2', 'textContent', 'desc');
        } else if (selectedValue === 'authorAsc') {
            sortNotesByField(bookNotes, 'p:nth-child(2)', 'textContent', 'asc');
        } else if (selectedValue === 'authorDesc') {
            sortNotesByField(bookNotes, 'p:nth-child(2)', 'textContent', 'desc');
        }
    });

    searchFilter.addEventListener('change', filterNotes);
    genreFilter.addEventListener('change', filterNotes);

    function filterNotes() {
        const selectedRating = searchFilter.value;
        const selectedGenre = genreFilter.value;

        bookNotes.forEach(note => {
            const rating = note.querySelector('.note-content p:nth-child(4)').textContent.trim();
            const genre = note.querySelector('.note-content p:nth-child(3)').textContent.trim();

            const ratingMatch = selectedRating === 'all' || rating === selectedRating;
            const genreMatch = selectedGenre === 'all' || genre === selectedGenre;

            if (ratingMatch && genreMatch) {
                note.style.display = 'block';
            } else {
                note.style.display = 'none';
            }
        });
    }

    function sortNotesByField(notes, selector, property, order) {
        const sortedNotes = [...notes].sort((a, b) => {
            const aValue = a.querySelector(selector)[property].toLowerCase();
            const bValue = b.querySelector(selector)[property].toLowerCase();

            if (order === 'asc') {
                return aValue.localeCompare(bValue);
            } else if (order === 'desc') {
                return bValue.localeCompare(aValue);
            }
        });

        sortedNotes.forEach((note, index) => {
            note.style.order = index + 1;
        });
    }

    // ... (rest of your code)
});
document.addEventListener('DOMContentLoaded', function () {
    // ... bestaande code ...

    bookNotes.forEach((bookNote, index) => {
        const readMoreButton = bookNote.querySelector('.read-more-button');
        readMoreButton.addEventListener('click', (event) => {
            event.stopPropagation();
            openBookDetailsPage(index);
        });
    });

    // ... rest van de code ...

    function openBookDetailsPage(index) {
        const selectedBook = bookNotes[index];
        const title = selectedBook.querySelector('h2').textContent;
        const author = selectedBook.querySelector('p:nth-child(2)').textContent;
        const genre = selectedBook.querySelector('p:nth-child(3)').textContent;
        const rating = selectedBook.querySelector('.note-content p:nth-child(4)').textContent;
        const completed = selectedBook.querySelector('.note-content p:nth-child(5)').textContent;
        const summary = selectedBook.querySelector('.note-content h3 + p').textContent;
        const notes = selectedBook.querySelector('.note-content h3 + p + h3 + p').textContent;

        const bookDetails = `
            <h2>${title}</h2>
            <p>Author: ${author}</p>
            <p>Genre: ${genre}</p>
            <p>Rating: ${rating}</p>
            <p>Completed: ${completed}</p>
            <h3>Summary</h3>
            <p>${summary}</p>
            <h3>Notes</h3>
            <p>${notes}</p>
        `;

        // Open een nieuwe pagina en vul deze met de boekdetails
        const newWindow = window.open();
        newWindow.document.write(bookDetails);
    }

    // ... rest van de code ...
});




function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }

function toggleNav() {
            const sidenav = document.getElementById("mySidenav");
            sidenav.style.width = sidenav.style.width === "250px" ? "0" : "250px";
        }