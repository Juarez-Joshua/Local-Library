const getTotalBooksCount = (books) => books.length;

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
    let counter = 0;
  books.forEach((bookObj)=>{
    const {borrows} = bookObj;
   if(borrows[0].returned === false){
    counter++;
   } 
  })
  return counter;
}

function getMostCommonGenres(books) {
  const bookGenreArray = books.map((book)=>book.genre);
  const countObj = {};
  bookGenreArray.forEach((genre)=>{
      countObj[genre] = countObj[genre] ? countObj[genre] + 1 : 1
    }
  )
  const results = []
  for(let keys in countObj){
    results.push({name: keys, count: countObj[keys]})
  }
  results.sort((objA,objB)=>{
    return objA.count > objB.count ? -1 : 1
  })

  return results.slice(0,5);
}

function getMostPopularBooks(books) {
    const popularBooks = {};
    books.forEach((bookObj)=>{
      const {borrows} = bookObj;
      popularBooks[bookObj.title] = borrows.length;
    })
    const bookNames = Object.keys(popularBooks);
    const results = bookNames.map((bookTitles)=>{
      return {name: bookTitles, count: popularBooks[bookTitles]}
    })
    results.sort((bookA, bookB)=>{
      return bookB.count - bookA.count
    })
    return results.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
    const popularAuthor = {};
    books.forEach((bookObj)=>{
      const {borrows} = bookObj;
      if(popularAuthor[bookObj.authorId] === undefined){
        popularAuthor[bookObj.authorId] = borrows.length;
      }else{
        popularAuthor[bookObj.authorId] += borrows.length;
      }
    })
    const authorIdArr = Object.keys(popularAuthor);

    const results = authorIdArr.map((authorIdNum)=>{
      return {name: formatAuthorName(authorIdNum,authors), count: popularAuthor[authorIdNum]}
    })
    results.sort((authorA, authorB)=>{
      return authorB.count - authorA.count
    })
    return results.slice(0,5);
}

function formatAuthorName(authorId = 0, authors = []){
  const authorObj = authors.find((authorObj)=>{
    return (authorObj.id - authorId === 0)
  })
    const {name} = authorObj
    return `${name.first} ${name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
