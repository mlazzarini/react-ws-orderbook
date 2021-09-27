let socket: any

const connect = () => {
  socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
  socket.addEventListener('open', () => {
    const subscribeReq = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_XBTUSD'],
    }
    socket.send(JSON.stringify(subscribeReq))
  })
  socket.addEventListener('message', (res: any) => {
    const msg = JSON.parse(res.data)
    if (msg.feed === 'book_ui_1_snapshot') {
      console.log('SNAPSHOT')
    }
    if (msg.feed === 'book_ui_1') {
      console.log('delta')
    }
  })
  // const interval = setInterval(() => {
  // 	if (socket.readyState === WebSocket.OPEN) {
  // 		socket.send('Keepalive');
  // 	}
  // }, 30000);
  // socket.onclose = event => {
  // 	clearInterval(interval);
  // 	console.log('Closing websocket', event);
  // };
}

const close = () => {
  console.log('Closing websocket')
  socket.close()
}

// Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send({"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]});
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

export { connect, close }
