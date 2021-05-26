/**
 * Esta función procesa un markup HTML valido (tag video), que se va a inyectar como componente por React con dangerouslySetInnerHTML.
 * @param {strin} _id El id que identifica el tag en el DOM element.
 * @param {string} name nombre del video que se va a cargar [Importante: el video se ubica en el folder /public]
 * @param {boolean} loop     Un valor boleano que determina si se hace loop en el video.
 * @param {string} className nombre de clase
 * @returns Un objeto javascript con la info html para cargar en React. Aqui únicamente carga el tag video. 
 */
const VideoBg = (_id, name, loop, className = "") => {
  const markup = { 
    __html: `
    <video class=${className} playsinline="" autoplay="" ${loop && 'loop=""'} muted=""  id=${_id}>
        <source
            src=${name}
            type="video/mp4"
        />
    </video>` }

  return markup;
};

export default VideoBg;