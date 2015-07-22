#!/bin/bash


git add ./;
echo "Enter COMMIT message: ";
read commit_message;
git commit -m "$commit_message";
git push origin master;
ssh emanuel@ghost.projectcodex.co 'cd ReleaseOneNarrative; git pull origin master; pm2 restart app;'
exit;
