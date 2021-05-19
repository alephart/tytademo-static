/**
 * Esta función procesa un markup MTML valido (tag video), que se va a inyectar como componente por React con dangerouslySetInnerHTML.
 * @param {strin} _id El id que identifica el tag en el DOM element.
 * @param {string} name nombre el video que se va a cargar [Importante: el video se ubica en el folder /public]
 * @param {boolean} loop Un valor boleano que determina si se ghace loop en el video.
 * @returns Un objeto javascript con la info html para cargar en React. Aqui únicamente carga el tag video. 
 */
const videoBg = (_id, name, loop) => {
  const markup = { __html: `
    <video playsinline="" autoplay="" ${loop && 'loop=""'} muted=""  id=${_id}>
        <source
            src=${name}
            type="video/mp4"
        />
    </video>,` };

  return markup;
};

export default videoBg;