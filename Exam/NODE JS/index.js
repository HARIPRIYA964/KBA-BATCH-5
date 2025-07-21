import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    const bookMap = new Map();

    function showBook(){
        console.log(`
            1. Add books with title and author
            2. Issue book to User
            3. view issued books list 
            4. Return Books
            5. Delete
            `);
            rl.question('Enter a choice: ', handleChoice)
    }
    function handleChoice(choice){
        switch(choice.trim()){
            case '1':
                rl.question( 'Enter book name: ', (Title) => {
                    rl.question('Enter book author: ', (Author) => {
                        bookMap.set( {Title: Title, Author: Author});
                        console.log(`Book Added: Title: ${Title} Author: ${Author}`);
                        showBook();
                        });
                        });
                        break;
            case '2':
                if( bookMap.size === 0){
                    console.log('No books available');
                    showBook();
                    }else{
                        rl.question('Enter book title to issue: ', (Title) => {
                            rl.question('Enter user name: ', (user) => {
                                if (bookMap.has(Title) === Title) {
                                    const book = bookMap.get(Title);
                                    if (book.user === '') {
                                        book.user = user; 
                                        bookMap.set(Title, book); 
                                        console.log(`Book Issued to ${user}`);
                                    } else {
                                        console.log(`Book already issued to: ${book.user}`);
                                    }
                                } else {
                                    console.log(`Book Not Found`);
                                }
                                showBook();
    
    
                            });
                            });
                            break;
                    }
                    case '3':
                        if(bookMap.size === 0){
                            console.log('No books issued');
                            showBook();
                            }else{

                            }


                case '5':
                   
               if (bookMap.size === 0) {
                console.log('No books to delete');
                showBook();
                }
                rl.question( 'Enter book title to delete: ', (Title) => {
                    const book = bookMap.get(Title);
                    if (book) {
                        bookMap.delete(Title);
                        console.log('Book deleted');
                        } else {
                            console.log(`Book Not Found`);
                            }
                            showBook();
                            });
                            break;





        }
    }
    showBook()