# takes the js and css build configs and outputs a fuse build.
echo "Building Fuse."
echo "Removing stale dist/ directory"
rm -rf www/dist/
echo "Building Javascript..."
r.js -o www/js/build.js
echo "Javascript built."
echo "Buidling CSS..."
r.js -o www/style/build.js
echo "CSS Built."
echo "Building for all platforms..."
cordova build
