# galaxy-video-chat

A galaxy themed video chat app.

## Current State

So far you can have a video conference with yourself, locally.

Functional, mostly. Sometimes I need to refresh multiple times for it to work. - I just restarted my peerjs --port 3001 and that seemed to fix it.

I plan to add more.

## How to run it currently

Some git commands you need to run this locally

- npm run devStart
- npm i -g peer (if you dont have that yet)
- peerjs --port 3001

Then go to your browser and put in http://localhost:3000/

Allow your browser to use video and your mic.

It'll give a url of something like http://localhost:3000/0ca855ca-0835-4f34-b455-1d6a1b31a3ee
Copy this long link it gives, and open it in three more tabs.

Boom! Now you have what looks like 4 person synchronized swimming, but it's from your webcam, and it's only you.

## Why

For me to learn some node.js and socket.io.

At this point, I'm not too experienced with socket.io so I started this out with a tutorial from [DevSimplified.](https://www.youtube.com/watch?v=DvlyzDZDEq4) but I plan to add some front-end fun onto it to practice some of that, maybe style each video element by what each user wants, maybe throw them outside of a grid, make them draggable. I haven't decided fully yet, more interaction between users sounds interesting.

## To Do:

- Figure out how to get this working so I can video chat with someone from another location.
- Style the background like a galaxy.
- Figure out why it's not updating when people leave or join sometimes.
- See if I can get user input to display over each respective video frame, start with each userId
- Think about crazy ideas like 'in 5 seconds make a silly face' and then it takes a picture of everyone and allows you to download it - and see if these ideas are feasible.

## Dependencies

- uuid
- peerJs
- express
- ejs
- socket.io

## Learned so far

- You can't really host this on github pages in order to have a video chat with people.
- I might need to host this somewhere else in order for it to work. Something like Heroku probably.
- ejs stands for Embedded JavaScript Templating - it's used by Node.js and it's kind of like a .html file but with more functionality.
