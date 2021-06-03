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
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';

const RegisterInfo = () => {
  const { t } = useTranslation('common');
  const { setProcess, data, character, setMessage, swap, setSwap } = useContext(ExperienceContext);
  const [progress, setProgress] = useState(0);
  const [items, seItems] = useState({
    firstname: false,
    lastname: false,
    email: false,
    zipcode: false,
  });
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
 
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

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

  const handleChangeContact = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.checked });
  };

  const calcProgress = () => {
    const values = Object.values(getValues());
    const count = values.reduce((count, item) => {
      return item ? count + 1 : count;
    }, 0);

    return (count * 100) / values.length;
  }

  const handleBlurField = (event) => {
    const { name, value } = event.target;
    let next = true;

    if(name === 'email') {
      const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      next = valid.test(value);
    }

    if(next) {
      const check = value ? true : false;
      seItems({...items, [name]: check});
      setProgress(calcProgress());
    }
  };

  const handleChangeCheck = (event) => {
    setAgreeTerms(event.target.checked);
  };

  return (
    <div className='formVideo'>
      <VideoLoading progress={progress} />
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
          className={items.firstname ? 'check' : ''}
          {...register('firstname', { required: true })}
          placeholder={t("registerInfo.name")}
          inputProps={{ 'aria-label': 'nombre' }}
          onBlur={handleBlurField}
        />
        {errors.firstname && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          className={items.firstname ? 'check' : ''}
          {...register('lastname', { required: true })}
          placeholder={t("registerInfo.lastName")}
          inputProps={{ 'aria-label': 'apeliido' }}
          onBlur={handleBlurField}
        />
        {errors.lastname && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          className={items.firstname ? 'check' : ''}
          {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
          placeholder={t("registerInfo.email")}
          inputProps={{ 'aria-label': 'email' }}
          onBlur={handleBlurField}
        />
        {errors.email && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          className={items.firstname ? 'check' : ''}
          type='number'
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 5);
          }}
          {...register('zipcode', { required: true, pattern: /^[0-9]{5}(?:-[0-9]{4})?$/ })}
          placeholder={t("registerInfo.zip")}
          inputProps={{ 'aria-label': 'código postal' }}
          onBlur={handleBlurField}
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
            onChange={handleChangeContact}
            name='productNews'
            inputProps={{ 'aria-label': 'product news' }}
          />
        </div>
        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbox2")}
          </div>
          <Switch
            className="switch2"
            checked={contact.testDrive}
            onChange={handleChangeContact}
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
