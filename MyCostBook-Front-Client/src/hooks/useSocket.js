// import io from 'socket.io-client';

// const BaseUrl = 'http://47.102.117.116:7001/'

// const socketOption = {
//     query: {
//         room: 'de1mo',
//         userId: 7,
//     },
//     // transports: ['websocket', 'polling'],
//     // timeout: 5000,
// }

// function useSocket(handlerConnect, handlerRes) {
//     const socket = io(BaseUrl, socketOption)
//     /**
//      * 系统事件
//      */
//     socket.on('disconnect', (msg) => {
//         console.log('#disconnect', msg);
//     });

//     socket.on('disconnecting', () => {
//         console.log('#disconnecting');
//     });

//     socket.on('error', () => {
//         console.log('#error');
//     });

//     /**
//      *
//      */
//     // 接收在线用户信息
//     socket.on('online', (msg) => {
//         console.log('#online,', msg);
//     });
//     // 中间层
//     socket.on('middle-res', (data) => {
//         console.log('#middle-res,', data,)
//     });



//     /**
//      *
//      */
//     socket.on('connect', handlerConnect)
//     socket.on('res', handlerRes)
//     /**
//      *
//      */
//     return socket

// }


// export default useSocket