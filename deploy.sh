# this puts the current fuse code out on https://fuse.kynetx.com/
# should be run from the root repo directory.

# if the dist directory doesnt exist, just die as it doesnt make sense
# do depoy when theres nothing there to deploy
if [ ! -d "dist" ]; then
	echo "No dist directory! Cannot deploy fuse. Aborting."
	exit 1
fi

# remove stale build
echo "Removing old build from fuse.kynetx.com"
ssh root@webhost.kynetx.com "cd /var/www/html/fuse_kynetx_com/; rm -rf *"
echo "Old build removed from fuse.kynetx.com"

# put current build out on production
echo "Deploying new build to fuse.kynetx.com"
rsync -av --exclude "js" --exclude "build.js" \
--exclude ".git" --exclude ".gitignore" --exclude ".DS_Store" --exclude "deploy.sh" \
--exclude "README.md" --exclude "docs" --exclude "style/*.css" \
--update --progress --stats . root@webhost.kynetx.com:/var/www/html/fuse_kynetx_com/
echo "New build deployed to fuse.kynetx.com"
