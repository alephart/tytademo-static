#!/bin/sh

ZIP_FILE=footage.zip

TEMP_PATH=/var/app/current/temp

NEW_PATH=/var/app/current/

LOCAL_ZIP_FILE=/var/app/current/temp/footage/
{
    if [[ ! -f "$LOCAL_ZIP_FILE" ]] then
        echo "Directory $LOCAL_ZIP_FILE was making"
        mkdir $LOCAL_ZIP_FILE
    if

    STATUS="$(cmp --silent $NEW_PATH$ZIP_FILE $LOCAL_PATH$ZIP_FILE; echo $?)"

    if [[ -f "$NEW_PATH$ZIP_FILE" ]]; then
        echo "$ZIP_FILE exists."

        if [[ -f "$TEMP_PATH$ZIP_FILE" ]]; then
            if [[ $STATUS -ne 0 ]]; then
                unzip -d $LOCAL_PATH $NEW_PATH$ZIP_FILE
                cp $NEW_PATH$ZIP_FILE $TEMP_PATH
                echo "files aren't equals"

            else
                unzip -d $LOCAL_PATH $NEW_PATH$ZIP_FILE
                cp $NEW_PATH$ZIP_FILE $TEMP_PATH
                echo "files copied"
            fi
        fi
    fi
} || {
    set -e
}