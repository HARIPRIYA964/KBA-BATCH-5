import readline from  'readline'

//create interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
    // rl.question('Enter your number: ', (a)=>{
    //     console.log(a);
    //     rl.close();
    // })

rl.question ('Enter your number: ', (a)=>{
    rl.question('Enter your number: ', (b)=>{
        console.log(`Sum is : ${parseInt(a)+parseInt(b)}`);
        rl.close();
        })
        })
