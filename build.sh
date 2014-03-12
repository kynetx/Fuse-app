# takes the js and css build configs and outputs a fuse build.
echo "Building Fuse."
echo "Building Javascript..."
r.js -o js/build.js
echo "Javascript built."
echo "Buidling CSS..."
r.js -o style/build.js
echo "CSS Built."
echo "Fuse now ready to be deployed. Yay!"