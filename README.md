# Fuse Mobile Application v0.0.7
You'll need cordova installed. In order to get cordova, you'll need npm, node package manager.
I'm going to assume you know how to get node/npm.
After you have node & npm installed, run:
`npm install cordova -g`
Afterwards `cordova` should be avaliable at the command line.

For most development purposes, simply `cd www/` from the project root and then run `cordova serve`. You can then
develop the applciation and see your changes reflected on `localhost:8000`.

## Build Process
Navigate to the project root and run `cordova build`.
You should eventually see `** BUILD SUCCEEDED **` outputted to the console. 

## Platform Specific Build Processes
At this time, iOS is the only platform included. Cordova manages most of the process
but there are some extra steps you need to take, including code signing and provisioning. 
In order to provision iOS applications for distribution, Ad Hoc or otherwise,
you'll need a paid Apple Developer Account. [Alex](https://github.com/alexkolson) has one and
manages the iOS build, but should you be curious to learn more simply ask him or read 
about it on the Apple Developer Documentation.

## Development process
Simply navigate to the `www/` directory and run `cordova serve`. This will serve the web application on `localhost:8000`. 
You can develop as you would on any other web application.


# Note
This application is under heavy development at any given time. Should you need stable code please use one of our [releases](https://github.com/kynetx/Fuse-app/releases).