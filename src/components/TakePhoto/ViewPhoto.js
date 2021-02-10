import {Image, Transformation} from 'cloudinary-react';

const cloud = {
  cloudName: 'alephart-co',
  publicId: 'MDS/toyota/'
};

const ViewPhoto = (props) => {
  const {image} = props;
  console.log(image);
  return (
    <div className="zone-photo">
      <Image cloudName={cloud.cloudName} publicId={`${cloud.publicId}${image}`} className="my-image">
        <Transformation width="auto" crop ="scale" responsive />
      </Image>
      <style jsx>{`
        .zone-photo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-width: 480px;
          width: 480px;
          margin: 0 auto;
        }

      `}</style>
    </div>
  )
}

export default ViewPhoto;