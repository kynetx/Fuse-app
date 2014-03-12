# this puts the current fuse code out on https://fuse.kynetx.com/
# should be run from the root repo directory.
ssh root@webhost.kynetx.com "cd /var/www/html/fuse_kynetx_com/; rm -rf .*; rm -rf *"
echo "Old build removed from fuse.kynetx.com"
rsync -av --exclude "js" --exclude "build.js" \
--exclude ".git" --exclude ".gitignore" --exclude ".DS_Store" --exclude "deploy.sh" \
--exclude "README.md" --exclude "docs" --exclude "style/*.css" \
--update --progress --stats . root@webhost.kynetx.com:/var/www/html/fuse_kynetx_com/
echo "New build deployed to fuse.kynetx.com"
