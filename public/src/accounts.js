
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id ===id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last.toUpperCase() > accountB.name.last.toUpperCase() ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account={},books=[]){
  //create counter variable
  const counter = books.reduce((acc, bookObj)=>{
    //need the borrows array
    const {borrows} = bookObj;
    //for each to go thorugh each index of the borrows array
    borrows.forEach((borrowObj) => {
      //if bookobj id matches the account id, accumulator adds one
      if(borrowObj.id === account.id){
        acc++;
      }
    })
    return acc;
  },0)
  return counter;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  //variable to hold array of reformatted books
  const result = [];
  //foreach loop to go through each book to find
  //what books the account has checked out
  books.forEach((bookObj)=>{
    //get borrows array to checking return status and 
    //user id
    const {borrows} = bookObj;
    //loop to check return and id
    borrows.forEach((borrowsObj)=>{
      if(borrowsObj.id === account.id && !borrowsObj.returned){
        const authorId = bookObj.authorId;
        bookObj.author = authors.find((authorObj) =>{
          return authorId === authorObj.id;
        })
       result.push(bookObj);
      }
    })
  })
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
