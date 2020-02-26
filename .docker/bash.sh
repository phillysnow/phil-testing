#!/bin/bash
PROJECT="/var/www/app/"
NODE="/var/www/app/node_modules"
cd $PROJECT
# check if node_modules is filled
if [ -d "$NODE" ]; then
    echo "Packages are there!"
    # check if force build is true
    if [ "$NPM_FORCE_REBUILD" == "true" ]; then
        echo "Did you want to rebuild? whatever you say boss man"
        echo "Execute order 66"
        rm -rf $NODE
        yarn
    fi
else
    echo "Hmmm, no node_modules!"
    echo "Execute order 66"
    yarn
fi
# check if dev is active
 if [ "$NPM_DEV" == "true" ]; then
        echo "Beep Boop, running the dev server"
        yarn dev
    else
        if [ "$NPM_GENERATE" == "true" ]; then
            echo "Going for a build? Good job finishing the project!"
            yarn generate
        else
            echo "Going for a build? Good job finishing the project!"
            yarn build
        fi
fi
