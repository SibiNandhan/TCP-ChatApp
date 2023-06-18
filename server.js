const net  = require('net');
const server = net.Server();
const client=[];
//socket is a duplex stream , both read and write
server.on('connection',(socket)=>{
    console.log('A new connection to server');
    socket.user_id=parseInt(Math.random()*10000)
    client.push(socket);
    socket.on('data',(chunk)=>{
        const buff= Buffer.from(`${socket.user_id} : `);
        let arr=[buff,chunk];
        chunk=Buffer.concat(arr);
        client.map(s=>s.write(chunk))
        console.log(chunk.toString());
    })
    socket.on('end',()=>{

        const msg=`${socket.user_id} Left the Chat`
        console.log(msg);
        client.map(s=>s.write(msg))
    })
}) 

server.listen(4000,'127.0.0.1',()=>{
    console.log('opened server on',JSON.stringify(server.address()))
});