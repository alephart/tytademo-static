#!/bin/sh

sudo su webapp

ZIP_FILE=footage.zip

NEW_PATH=/var/app/current/

LOCAL_ZIP_FILE=/var/app/current/temp/footage/

STATUS="$(cmp --silent $NEW_PATH$ZIP_FILE $LOCAL_PATH$ZIP_FILE; echo $?)"

if [[ -f "$NEW_PATH$ZIP_FILE" ]]; then
    echo "$ZIP_FILE exists."
    if [[ $STATUS -ne 0 ]]; then
        unzip -d $LOCAL_PATH$ZIP_FILE $NEW_PATH$ZIP_FILE
        cp $LOCAL_PATH$ZIP_FILE $NEW_PATH$ZIP_FILE
        echo "files aren't equals"
    fi
fi