const path = require("path");
const cuid = require("cuid");
const {
  concatVideosTxtFluent,
  changeTrackFluent,
} = require("./lib/ffmpegActions");
const {
  writeFileSync,
  loadFileSync,
  removeFileSync,
  createDirSync,
} = require("./lib/fileActions");
const { buildFileVideos } = require("./lib/refaceActions");
const { videoListAll } = require("./lib/dataVideos");

const fetch = require("node-fetch");
const { configAdmin } = require("./lib/config");

const DIR_TEMP = "./temp1";
const DIR_TEMP_A = "./temp1";
createDirSync(DIR_TEMP_A);

const NAME_TRACK_AUDIO = "footage/TodoONada_Final_Audio.m4a";
const url = process.env.NEXT_PUBLIC_URL_SITE;

// replace videos name
// here get video according to character and save to disk

const videosListCharacter = (character, videoId, videoListAll) => {
  let allVideos = [];

  videoListAll.forEach((video, index) => {
    if (video.character === character || video.character === "mix") {
      // new name
      const name = `${videoId}-${index}.mp4`;

      // get video
      const getVideo = loadFileSync(path.join(DIR_TEMP, video.name));

      // save video
      const pathName = path.join(DIR_TEMP_A, name);
      writeFileSync(pathName, getVideo);

      allVideos.push(name);
    }
  });

  // return new array videos
  return allVideos;
};

export default async (req, res) => {
  const userId = cuid();
  const locales = ["en", "es"];
  const locale = locales[(locales.length * Math.random()) | 0];

  // generate male or female ramdom
  const characters = ["female", "male"];
  const character = characters[(characters.length * Math.random()) | 0];

  try {
    console.time("videosListCharacter_" + userId);
    /********************************************************************************************************************
     * SWAP VIDEOS PROCESS
     * Each process here depends on the completion of the other. In the specific case of refase,
     * the faceId is required first to process the swaps, and it is required to have the swap videos
     * to go on to concat the entire final video.
     ********************************************************************************************************************/
    // Step 3. Swap videos and get ids
    // Here we do not swap, but if we call the videos according to character and save them to disk to use
    const adjustVideos = videosListCharacter(character, userId, videoListAll);
    console.timeEnd("videosListCharacter_" + userId);

    console.time("writeFileSync_" + userId);
    // 5. write file .txt with info videos
    const nameFileVideos = `videos-${userId}.txt`;
    writeFileSync(
      path.join(DIR_TEMP_A, nameFileVideos),
      buildFileVideos(adjustVideos, videoListAll, character)
    );
    console.timeEnd("writeFileSync_" + userId);

    console.time("concatVideosTxtFluent_" + userId);
    // 6. Merge videos (get final video)
    const dataFinal = {
      output: `${DIR_TEMP_A}/video-${userId}.mp4`,
      fileVideos: `${DIR_TEMP_A}/${nameFileVideos}`,
    };

    await concatVideosTxtFluent(dataFinal);
    console.timeEnd("concatVideosTxtFluent_" + userId);

    console.time("changeTrackFluent");
    // 6.1 chage track in final video
    const nameFinalVideo = `video-${userId}_final.mp4`;

    const dataTrack = {
      input: dataFinal.output,
      output: `${DIR_TEMP_A}/${nameFinalVideo}`,
      track: path.join(DIR_TEMP, NAME_TRACK_AUDIO),
    };

    await changeTrackFluent(dataTrack);
    console.timeEnd("changeTrackFluent_" + userId);

    console.time("removeFileSync_" + userId);
    let removeSubVideos = [];
    const allSubVideos = adjustVideos.map((video, index) => {
      const pathFile = path.join(DIR_TEMP_A, video);
      removeSubVideos[index] = pathFile;
    });

    removeFileSync(dataFinal.output);
    //removeFileSync(dataTrack.output);
    removeFileSync(removeSubVideos);
    removeFileSync(dataFinal.fileVideos);
    console.timeEnd("removeFileSync_" + userId);

    console.time("callAdminEndpoint_" + userId);
    const pathLocale = locale === "es" ? "/es/" : "/";

    const data = {
      userId,
      urlShare: `${url}${pathLocale}share-experience/${userId}`,
      urlJoin: `${url}${pathLocale}join-experience/${userId}`,
    };

    const dataAdmin = {
      participant_id: userId,
      firstname: `test ${userId}`,
      lastname: `test ${userId}`,
      email: `test-${userId}@email.com`,
      zipcode: "01234",
      character,
      url_photo: `urlPhoto/${userId}`,
      url_video: `urlVideo/${userId}`,
      productnews: 1,
      testdrive: 1,
      footage: data,
    };

    let jsonAdmin;

    try {
      const resAdmin = await fetch(`${configAdmin.url_api}/participant`, {
        method: "POST",
        body: JSON.stringify(dataAdmin),
        headers: { "Content-Type": "application/json" },
      });

      jsonAdmin = await resAdmin.json();

      if (!jsonAdmin.participant) {
        // return
        res.status(200).send({
          success: false,
          action: "saveParticipant",
          userExist: jsonAdmin.participant,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ success: false, action: "saveParticipant", error });
    }
    console.timeEnd("removeFileSync_" + userId);
    return res.status(200).send({ success: true, dataAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
