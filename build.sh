# takes the js and css build configs and outputs a fuse build.
echo "Building Fuse."
echo "Building Javascript..."
r.js -o www/js/build.js
echo "Javascript built."
echo "Buidling CSS..."
r.js -o www/style/build.js
echo "CSS Built."
echo "Building for all platforms..."
cordova build
echo "Fuse is almost ready to be deployed. Just make sure the css and include references in index.html are updated and then run deploy.sh. Yay!"
