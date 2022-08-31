This is an app with a metronome, a todo list and a countdown. So you can dive deep into the music and practice.
# Getting Started
## install dependencies
Before running this app, make sure you run the following command to install all dependencies.
    
    npm install

## run the app
After installing dependencies, type in this instruction to run the app locally.
    
    npm run dev

this app is set to run on port localhost:3000, with a base path **metronome**, So the url is going to be
    
    localhost:3000/metronome

# Deploy
If you want to deploy this app on your website. make sure you have these things installed.

    node 16
    docker
    docker-compose

give permission to the shell script.

    chmod u+x ./update.sh

fire up the docker finally

    ./update.sh ./docker-compose.production.yml

you may also need to configure **nginx** and **firewall** to make the service reachable from the outside network.

    
# Demo
To see what this app looks like, open my [demo website](http://doggyspace.fun/metronome)
