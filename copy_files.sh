#!/bin/sh

echo "$(dirname "$BASH_SOURCE")"

ZIP_FILE=footage.zip

TEMP_PATH=./temp/

NEW_PATH=./

LOCAL_ZIP_FILE=./temp/footage/
{
    if [[ ! -f "$LOCAL_ZIP_FILE" ]]; then
        echo "Directory $LOCAL_ZIP_FILE was making"
        mkdir $LOCAL_ZIP_FILE
    fi

    STATUS="$(cmp --silent $NEW_PATH$ZIP_FILE $LOCAL_PATH$ZIP_FILE; echo $?)"

    if [[ -f "$NEW_PATH$ZIP_FILE" ]]; then
        echo "$ZIP_FILE exists."

        if [[ -f "$TEMP_PATH$ZIP_FILE" ]]; then
            if [[ $STATUS -ne 0 ]]; then
                unzip -o $NEW_PATH$ZIP_FILE -d $LOCAL_PATH
                cp $NEW_PATH$ZIP_FILE $TEMP_PATH
                echo "files aren't equals"
            fi
        else
            unzip -o $NEW_PATH$ZIP_FILE -d $LOCAL_PATH
            cp $NEW_PATH$ZIP_FILE $TEMP_PATH
            echo "files copied"
        fi
    fi
} || {
    set -e
}
echo "finishing"