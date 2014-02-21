# this puts the current fuse code out on https://fuse.kynetx.com/
# should be run from the root repo directory.
ssh root@webhost.kynetx.com "cd /var/www/html/fuse_kynetx_com/; rm -rf *"
rsync -av --exclude "docs" --exclude ".git" --exclude "README.md" --exclude "deploy.sh" --exclude "build.js" --exclude "builds" --exclude ".gitignore" --update --progress --stats . root@webhost.kynetx.com:/var/www/html/fuse_kynetx_com/
