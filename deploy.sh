# this puts the current fuse code out on https://fuse.kynetx.com/
# should be run from the root repo directory.
rsync -av --exclude "docs" --exclude ".git" --exclude "README.md" --exclude "deploy.sh" --update --progress --stats . root@webhost.kynetx.com:/var/www/html/fuse_kynetx_com/
