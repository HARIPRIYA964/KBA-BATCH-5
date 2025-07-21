
// const args = process.argv;  //.slice(2)                 //Get commant-line arguments
// // const name =  args[0]
// const name = args[2]
// console.log(args)

// console.log(`Hello, ${name}!`);

// const args = process.argv.slice(2);                  //Get input from terminal

// const arg = process.argv;
// const num1 = arg[2];
// const num2 = arg[3];

// const sum = parseInt(num1) + parseInt(num2);
// console.log(`sum is: ${sum}`);  


//Task 
const args = process.argv.slice(2);
const add = args[0]
const task = []

if(add == 'add'){
    const arr = args[1]
    task.push(arr)
    console.log(`task added :  ${arr}`);
    console.log (`task : ${task}`)
    
}
else{
    console.log('not added the task')
}