# Electron-based Library App

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/latest/tutorial/quick-start) within the Electron documentation.

A pdf-viewer application is created for the use to preview research papers retrieved from a postgres database. 
The application does not completely fulfil the test requirements, since the search function has not been implemented due to time limit.
However, the function can be achieved by altering the preexisting Node.js fetch handshakes to the server, which will be an intuitive exercise if time allows. 

The application consists the following scripts to provide the functionalities required: 
- `main.js`, `rendere.js`, `preload.js` serves as the scripts to provide the front-end functionality
- `docker-compose.yml` is to compose the backend services in docker containers
- `ca.pem` is genereated using cfssl tool as a self-signed certificate for handling fetch request communications. 
- `PDF_example` have stored some of the demo example pdf for the frontend user to preview. 



## To Use

To clone and run this repository you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/), [Docker](https://docs.docker.com/engine/install/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/LuluYui/D2V_Capabilities_Test.git
# Go into the repository
cd D2V_Capabilities_Test
# Use docker-compose.yml to compose the backend services (flask app, postgres db, portainer...etc)
sudo docker compose up --build -d
# Install dependencies
npm install
# Run the app
npm start
```

To access Portainer, click the link [Portainer](https://localhost:8001)  or go to *https://localhost:8001*

If you find any trouble setting up the app during the review process, please feel free to contact Chris through *choyui.yip@connect.polyu.hk*. 
Thank you for your patience and considerations.

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## License
[CC0 1.0 (Public Domain)](LICENSE.md)
