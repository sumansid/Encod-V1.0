
![Screen Shot 2021-11-29 at 11 02 42 PM](https://user-images.githubusercontent.com/53033648/143983770-93870c77-a363-45bf-9b57-39ad8793bfb6.png)
#
Encod is an online code editor that lets you share code in real-time. Encod is built using React JS (CRA), Tailwind CSS, Websockets and Node Js. Deployed on : [https://encod.netlify.app/](https://encod.netlify.app/)

Supported programming languages : Python, Javascript, Java


## How it works
* Click on the <b> Create Room </b> button on the homepage. 🚪🚶
* Share the redirected URL with your friends. 🌎 
* Select the programming language and Start Coding ! 👨‍💻
* Download a copy of your code by clicking the <b> Download Code </b> button. 

## Running project locally

Download the <b> encod-client</b> and <b> encod-server</b> folder to your local machine. In both of the directories, run the following code :

Installing the dependencies 
```
$ npm install
```

Running the frontend on localhost or running the server
```
$ npm start
```

Change the server url in  ```line 20``` in TextEditor.js component inside ```encod-client/src/components/TextEditor.js```.
Make sure the server is running in order to see the changes in the texteditor in realtime.

## Contributing
Pull requests are welcome !

## Resources

* https://tailwindcss.com/ 
* https://socket.io/
* https://reactjs.org/
* https://codemirror.net/
