#!/bin/sh

sudo su webapp

ZIP_FILE=/var/app/current/footage.zip

LOCAL_ZIP_FILE=/var/app/current/temp/footage.zip

if [[ -f "$ZIP_FILE" ]]; then
    echo "$FILE exists."
fi

