# takes the js and css build configs and outputs a fuse build.
echo "Building Fuse."
echo "Building Javascript..."
r.js -o js/build.js
echo "Javascript built."
echo "Buidling CSS..."
r.js -o style/build.js
echo "CSS Built."
echo "Removing stale source files..."
rm -rf js
rm -rf docs
rm -rf style/*.js
rm -rf style/*.css
echo "Stale source files removed."
echo "Fuse is almost ready to be deployed. Just update index.html to include the minified JS & CSS files and then run deploy.sh. Yay!"