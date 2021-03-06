import CharacterChoose from './CharacterChoose';
import PhotoTake from './PhotoTake';
import PictureConfirm from './PictureConfirm';
import RegisterInfo from './RegisterInfo';
import ShareExperience from './ShareExperience';

export { 
  CharacterChoose, 
  PhotoTake, 
  PictureConfirm, 
  RegisterInfo,
  ShareExperience,
};

// In this section all flow experience
// 1.  Choose Character
// 2.  Select camera
// 3.  Take Photo
// 4.  Confirm Photo
// 5.  Not valid Photo - Take again -> (3) [swap]
// 6.  Email Confirm [laravel]
// 7.  Email aleady exist [laravel]
// 8.  Email not exist then process Reface [swap]
// 9.  Complete other form fields -> 12 [laravel]
// 10. End Swap process [swap]
// 11. Return data final video
// 12. Save data form [laravel]
// 13. Save data video [laravel]
// 14. Show video to share
// 15. Send email

// state:
// - character: string = ['male' | 'female']
// - process: obj.freeze = { character, cameraSelect, photoTake, photoConfirm, photoValid, register, share }