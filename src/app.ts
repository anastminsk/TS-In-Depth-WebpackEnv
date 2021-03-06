import { Category } from './NamespaceDemo/enums';
import { Author, Book, Librarian, Logger, Magazine } from './NamespaceDemo/interfaces';
import { ReferenceItem, UniversityLibrarian, Shelf } from './classes';
import RefBook from './classes/encyclopedia';
import {
  purge,
  getAllBooks,
  getBooksByCategory,
  logCategorySearch,
  getBooksByCategoryPromise,
  logSearchResults
} from './lib/utility-functions';
import Encyclopedia from './classes/encyclopedia';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

// -------------------------------------------------------------------------------------

function logFirstAvailable(books: any[] = getAllBooks()): void {
  const numberOfBooks: number = books.length;
  let titleFirstAvailable: string = '';

  for (const book of books) {
    if (book.available) {
      titleFirstAvailable = book.title;
      break;
    }
  }

  console.log(`Total Books: ${numberOfBooks}`);
  console.log(`Title of First Available Book: ${titleFirstAvailable}`);

}

function logBookTitles(titles: string[]): void {
  for (const title of titles) {
    console.log(title);
  }
}

function getBookByID(id: number): Book {
  const books = getAllBooks();
  return books.find(book => book.id === id);
}

function createCustomerID(name: string, id: number): string {
  return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Customer name: ${name}`);

  if (age) {
    console.log(`Age: ${age}`);
  }

  if (city) {
    console.log(`City: ${city}`);
  }
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log(`Customer name: ${customer}`);
  const titles: string[] = [];

  bookIDs.forEach(id => {
    const book = getBookByID(id);
    if (book && book.available) {
      titles.push(book.title);
    }
  });

  return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(prop: string | boolean): string[] {
  const books = getAllBooks();
  switch (typeof prop) {
    case 'string': {
      return books
        .filter(book => book.author === prop)
        .map(book => book.title);
    }
    case 'boolean': {
      return books
        .filter(book => book.available === prop)
        .map(book => book.title);
    }
  }
}

const printBook = (book: Book): void => {
  console.log(`${book.title} by ${book.author}`);
};

// =======================================================================================================

// Task 01
// logFirstAvailable(getAllBooks());

// Task 02
// const titles: string[] = getBookTitlesByCategory(Category.JavaScript);
// logBookTitles(titles);

// Task 03
// const titles: string[] = getBookTitlesByCategory(Category.JavaScript);
// titles.forEach((title: string, idx: number) => console.log(`${idx} - ${title}`));

// const book = getBookByID(1);
// console.log(book);

// Task 04
// let myID = createCustomerID('Ann', 10);
// console.log(myID);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number) => `${name}${id}`;

// idGenerator = createCustomerID;
// myID = idGenerator('Boris', 20);
// console.log(myID);

// Task 05
// createCustomer('Anna');
// createCustomer('Boris', 30);
// createCustomer('Clara', 35, 'Kiev');

// const titles = getBookTitlesByCategory();
// console.log(titles);

// const titles1 = getBookTitlesByCategory(Category.CSS);
// console.log(titles1);

// logFirstAvailable();

// const myBooks: string[] = checkoutBooks('Anna', 1, 2, 4);
// console.log(myBooks);

// Task 06
// const checkedOutBooks: string[] = getTitles(true);
// checkedOutBooks.forEach(book => console.log(book));
// console.log(getTitles(true));
// console.log(getTitles("Lea Verou"));

// Task 07
// const myBook: Book = {
//   id: 5,
//   title: "Colors, Backgrounds, and Gradients",
//   author: "Eric A. Meyer",
//   available: true,
//   category: Category.CSS,
//   pages: 200,
//   markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };

// printBook(myBook);
// myBook.markDamaged('Missing back cover');

// Task 08
// const logDamage: Logger = (reason: string) => console.log(`Damage reported: ${reason}`);
// logDamage('stain');

// Task 09
// const favoriteAuthor: Author = {
//   name: 'Anna',
//   email: 'anna@gmail.com',
//   numBooksPublished: 10
// }

// const favoriteLibrarian: Librarian = {
//   name: 'Boris',
//   email: 'boris@tut.by',
//   department: 'Classical Literature',
//   assistCustomer: name => console.log(name),
// }

// Task 10, 21
// const favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris');
// console.log(favoriteLibrarian);
// favoriteLibrarian['printLibrarian']();

// Task 11
// const ref: ReferenceItem = new ReferenceItem('ReferenceItem Title', 2019);
// ref.printItem();
// ref.publisher = 'Rendom Publisher'; // setter works
// console.log(ref.publisher); // getter works

// Task 12-13
// const refBook: RefBook = new RefBook('WordPress', 2000, 10);
// refBook.printItem();
// console.log(refBook);
// refBook.printCitation();

// Task 18
// const inventory: Array<Book> = [
//   {
//     id: 10,
//     title: 'The C Programming Language',
//     author: 'K & R',
//     available: true,
//     category: Category.Software
//   },
//   {
//     id: 11,
//     title: 'Code Complete',
//     author: 'Steve McConnell',
//     available: true,
//     category: Category.Software
//   },
//   {
//     id: 12,
//     title: '8-Bit Graphics with Cobol',
//     author: 'A. B.',
//     available: true,
//     category: Category.Software
//   },
//   {
//     id: 13,
//     title: 'Cool autoexec.bat Scripts!',
//     author: 'C. D.',
//     available: true,
//     category: Category.Software
//   }
// ];

// const books: Array<Book> = purge<Book>(inventory);
// console.log(books);

// const nums: number[] = purge<number>([1, 2, 3, 4]);
// console.log(nums);

// Task 19
// const bookShelf: Shelf<Book> = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// const firstBook: Book = bookShelf.getFirst();
// console.log(firstBook);

// const magazines: Array<Magazine> = [
//   { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//   { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//   { title: 'Five Points', publisher: 'GSU' }
// ];

// const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
// magazines.forEach(mag => magazineShelf.add(mag));
// const firstMagazine: Magazine = magazineShelf.getFirst();
// console.log(firstMagazine);

// Task 20
// magazineShelf.printTitles();
// const mag: Magazine = magazineShelf.find('Five Points');
// console.log(mag);

// Task 23
// const favoriteLibrarian: UniversityLibrarian = new UniversityLibrarian();
// favoriteLibrarian.assistFaculty = () => console.log('123');
// favoriteLibrarian.teachCommunity = () => console.log('000');

// Task 24
// const enc = new Encyclopedia('Title', 2019, 10);
// enc.printItem();

// Task 25, 26
// const l = new UniversityLibrarian();
// l.name = 'Anna';
// l.assistCustomer('Boris');
// console.log(l.name);

// Task 27
// const enc = new Encyclopedia('Title', 2019, 10);
// enc.copies = -10;

// Task 28
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);

// Task 29
// getBooksByCategoryPromise(Category.JavaScript)
//   .then(titles => console.log(titles))
//   .catch(err => console.log(err));

// getBooksByCategoryPromise(Category.Software)
//   .then(titles => console.log(titles))
//   .catch(err => console.log(err));

// Task 30
console.log('Beginning search...');
logSearchResults(Category.JavaScript)
    .catch(reason => console.log(reason));
console.log('Search submitted...');


console.log('Beginning search...');
logSearchResults(Category.Software)
    .catch(reason => console.log(reason));
console.log('Search submitted...');
