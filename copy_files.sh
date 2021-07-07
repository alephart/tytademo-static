#!/bin/sh

ZIP_FILE=footage.zip

TEMP_PATH=/var/app/current/temp

NEW_PATH=/var/app/current/

LOCAL_ZIP_FILE=/var/app/current/temp/footage/

if [[ ! -f "$LOCAL_ZIP_FILE" ]] then
    mkdir $LOCAL_ZIP_FILE
if

STATUS="$(cmp --silent $NEW_PATH$ZIP_FILE $LOCAL_PATH$ZIP_FILE; echo $?)"

if [[ -f "$NEW_PATH$ZIP_FILE" ]]; then
    echo "$ZIP_FILE exists."

    if [[ -f "$TEMP_PATH$ZIP_FILE" ]]; then
        if [[ $STATUS -ne 0 ]]; then
            unzip -d $LOCAL_PATH$ZIP_FILE $NEW_PATH$ZIP_FILE
            cp $NEW_PATH$ZIP_FILE $TEMP_PATH$ZIP_FILE
            echo "files aren't equals"
            
        else
            unzip -d $LOCAL_PATH$ZIP_FILE $NEW_PATH$ZIP_FILE
            cp $LOCAL_PATH$ZIP_FILE $NEW_PATH$ZIP_FILE
            echo "files copied"
        fi
    fi
fi