#!/bin/sh

echo "$(dirname "$BASH_SOURCE")"

ZIP_FILE=footage.zip

TEMP_PATH=./temp1/

NEW_PATH=./

LOCAL_PATH=./temp1/footage/
{
    if [[ ! -f "$TEMP_PATH" ]]; then
        echo "Directory $TEMP_PATH was making"
        mkdir $TEMP_PATH
    fi

    if [[ ! -f "$LOCAL_PATH" ]]; then
        echo "Directory $LOCAL_PATH was making"
        mkdir $LOCAL_PATH
    fi

    if [[ -f "$NEW_PATH$ZIP_FILE" ]]; then
        echo "$ZIP_FILE exists."

        if [[ -f "$TEMP_PATH$ZIP_FILE" ]]; then
            STATUS="$(cmp --silent $NEW_PATH$ZIP_FILE $TEMP_PATH$ZIP_FILE; echo $?)"
            
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