import { useState, useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Switch,
  Checkbox,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { VideoLoading } from '@/components/Anims';
import { PROCESS_ENUM } from '@/helpers/globals';
import ExperienceContext from '@/context/ExperienceContext';
import { useTranslation } from 'react-i18next';

const RegisterInfo = () => {
  const { t } = useTranslation();
  const { setProcess, data, character, setMessage, swap, setSwap } = useContext(ExperienceContext);
  const [isSubmitting, setSubmitting] = useState(false); 
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [contact, setContact] = useState({
    productNews: false,
    testDrive: false,
  });

  useEffect(() =>{
    setMessage('');
    console.log("data in register", data);

    setSwap({
      success: true, 
      swap: ['https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4']
    });
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (dataForm) => {
    setSubmitting(true);
    console.log(dataForm);

    const dataRegister = { 
      ...dataForm, 
      ...contact,  
      ...data,
      character,
      ...swap,
    };

    console.log('swap in register', swap);
    console.log(dataRegister);

    // when save data, then change to share
    setProcess(PROCESS_ENUM.share);

  };

  const handleChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.checked });
  };

  const handleChangeCheck = (event) => {
    setAgreeTerms(event.target.checked);
  };

  return (
    <div className='formVideo'>
      <VideoLoading />
      <div className='copyTitleForm'>{t("registerInfo.copyTitleForm")}</div>
      <div className='copySubtitleForm'>{t("registerInfo.copySubtitleForm")}</div>

      {errors.firstname &&
        errors.lastname &&
        errors.email &&
        errors.zipcode && (
          <span className='errorsField center'>
            {t("registerInfo.errorsField")}
          </span>
        )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate autoComplete='off'
      >
        <Input
          {...register('firstname', { required: true })}
          placeholder='Nombre'
          inputProps={{ 'aria-label': 'nombre' }}
        />
        {errors.firstname && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          {...register('lastname', { required: true })}
          placeholder='Apellido'
          inputProps={{ 'aria-label': 'apeliido' }}
        />
        {errors.lastname && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
          placeholder='Correo electrónico'
          inputProps={{ 'aria-label': 'email' }}
        />
        {errors.email && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          type='number'
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 5);
          }}
          {...register('zipcode', { required: true, pattern: /^[0-9]{5}(?:-[0-9]{4})?$/ })}
          placeholder='Código postal'
          inputProps={{ 'aria-label': 'código postal' }}
        />
        {errors.zipcode && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbox1")}
          </div>
          <Switch
            checked={contact.productNews}
            onChange={handleChange}
            name='productNews'
            inputProps={{ 'aria-label': 'product news' }}
          />
        </div>
        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbox2")}
          </div>
          <Switch
            checked={contact.testDrive}
            onChange={handleChange}
            name='testDrive'
            inputProps={{ 'aria-label': 'test drive' }}
          />
        </div>
        {/* <div className="boxCheckbox">
            <div className="copyCheckbox special">
                <Link href="/termsP" color="inherit"> Acepto Políticas de tratamiento de datos</Link>
            </div>
            <Checkbox
                checked={agreeTerms}
                onChange={handleChangeTerms}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div> */}
        <Button
          className='yesContinue'
          variant='contained'
          type="submit"
          disabled={isSubmitting}
        >
          {t("registerInfo.yesContinue")}
        </Button>
      </form>
    </div>
  );
};

export default RegisterInfo;
