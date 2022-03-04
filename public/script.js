const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3005',
});
const myVideo = document.createElement('video');

// mute our mic for ourselves
myVideo.muted = true;

const peers = {};

// WebRTC (covers mediaDevices and peer connections)
// for cameras and microphones we use navigator.mediaDevices.getDisplayMedia()
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    // listen to when someone tries to call us on this mypeer obj
    myPeer.on('call', (call) => {
      call.answer(stream);

      // add first person's stream to the view of the second person
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    // new user has joined our room, so we have to send our video stream to them
    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream);
    });
  });

// when a different user leaves my room, show me their id, so I can eventually kick them from my screen
socket.on('user-disconnected', (userId) => {
  // console.log(userId);
  if (peers[userId]) peers[userId].close();
});

myPeer.on('open', (id) => {
  socket.emit('join-room', ROOM_ID, id);
});

//test code
// socket.on('user-connected', (userId) => {
//   console.log('User connected: ' + userId);
// });

function connectToNewUser(userId, stream) {
  //calling this user and sending them my stream
  const call = myPeer.call(userId, stream);
  // when stream is called..
  const video = document.createElement('video');
  call.on('stream', (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });

  // save their id so we can get rid of their dom element once they've left.
  peers[userId] = call;
}

function addVideoStream(video, stream) {
  // allows us to play the video
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}
