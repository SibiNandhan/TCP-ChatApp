const net = require('net');
const readline=require('readline/promises');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const clearLine = (direction)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.clearLine(direction,()=>{
            resolve();
        })
    })
}

const moveCursor = (dx,dy)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

const socket = net.createConnection({host:'127.0.0.1',port:4000},async()=>{
    console.log('connected to server');
    
    socket.write('Joined the Chat')

    const ask=async()=>{
        
    const message=await rl.question('Enter a message > ');
    await moveCursor(0,-1); //move 1 line up
    await clearLine(0)
    socket.write(message);
    }
    ask();

    socket.on('data',(data)=>{
        console.log(data.toString());
        ask()
    })
}

)





