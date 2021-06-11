import { useState, useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Switch,
  Checkbox,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { VideoLoading } from '@/components/Anims';
import { PROCESS_ENUM, MESSAGE_DIALOG } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';
import { Help } from '@/components/DialogsTyta';

const setCookie = (email) => {
  //cookie.set('email', email, { expires: 1 / 24 });
  fetch('api/set_cookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};


const RegisterInfo = ({ userEmail }) => {
  const { t } = useTranslation('common');
  const { setProcess, data, character, setMessage, swap, setSwap } = useContext(ExperienceContext);
  const [progress, setProgress] = useState(0);
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    zipcode: '',
  });
  const [userExists, setUserExists] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validZipCode, setValidZipCode] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [contact, setContact] = useState({
    productNews: false,
    testDrive: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setMessage('');
    console.log("data in register", data);

    const url = process.env.NEXT_PUBLIC__URL_SITE;
    
    setSwap({
      success: true,
      urlVideo: 'https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4',
      urlShare: `${url}/share-experience/ckow41n6g0000bdnxgrzb6wsv`,
      urlJoin: `${url}/join-experience/ckow41n6g0000bdnxgrzb6wsv`,
      userId: 'ckow41n6g0000bdnxgrzb6wsv',
    });
  }, []);

  useEffect(() => {
    setIsDisabled(progress >= 100 ? false : true);
  }, [progress]);
  
  useEffect(() => {
    const items = Object.values(values);
    const count = items.reduce((count, item) => {
      return item ? count + 1 : count;
    }, 0);
  
    setProgress( (count * 100) / items.length );
  }, [values]);

  /* handle actions */
  const handleChangeContact = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.checked });
  };

  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    
    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    
    setValidEmail(valid);
    setValues({...values, [name]: value});

    // check user exist
    if(value === userEmail) {
      console.log('This user exist!!!!');
      setUserExists(true);
    }
  };
  
  const handleChangeZip = (event) => {
    const { name, value } = event.target;

    const valid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
    
    setValidZipCode(valid);
    setValues({...values, [name]: value});
  }
  
  const handleChangeLetters = (event) => {
    const { name, value } = event.target;
    let text = '';
    
    text = value.replace(/[^A-Za-z/\W|_ ]+$/ig, '');
    
    setValues({...values, [name]: text});
  };

  const handleChangeCheck = (event) => {
    setAgreeTerms(event.target.checked);
  };

  const onSubmit = async (dataForm) => {
    setSubmitting(true);

    console.log(dataForm);

    // check user exist
    if(dataForm.email === userEmail) {
      setUserExists(true);
      return;
    }

    const dataRegister = { 
      ...dataForm, 
      ...contact,  
      ...data,
      character,
      ...swap,
    };
    
    // console.log('swap in register', swap);
    // console.log(dataRegister);
    
    const response = await fetch('api/set_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRegister),
    });
    
    const data = await response.json();
    console.log('response data:::', data);
    
    if(data.errors) {
      console.log('data errors::');
    } else {
      //setCookie(dataForm.email);
      console.log('success!!!', data.success);
      console.log('data Body!!!', data.dataBody);
      // when save data, then change to share
      if(data.success) {
        setProcess(PROCESS_ENUM.share);
      }
    }
  };
  return (
    <div className='formVideo'>
      <VideoLoading progress={progress} />
      <div className='copyTitleForm'>{t("registerInfo.copyTitleForm")}</div>
      <div className='copySubtitleForm'>{t("registerInfo.copySubtitleForm")}</div>
      
      {(errors.firtsname || errors.lastname || errors.email || errors.zipcode) && (
          <span className='errorsField center'>
            {t("registerInfo.errorsField")}
          </span>
        )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Input
          className={`
            ${values.firstname ? 'check' : ''}
            ${errors.firstname ? 'error' : ''}
          `}
          name='firstname'
          {...register('firstname', { required: true })}
          placeholder={t("registerInfo.name")}
          inputProps={{ 'aria-label': t("registerInfo.name") }}
          value={values.firstname}
          onChange={handleChangeLetters}
          inputProps={{
            autoComplete: "disabled", // disable autocomplete and autofill
          }}
        />
        <Input
          className={`
            ${values.lastname ? 'check' : ''}
            ${errors.lastname ? 'error' : ''}
          `}
          name='lastname'
          {...register('lastname', { required: true })}
          placeholder={t("registerInfo.lastName")}
          inputProps={{ 'aria-label': t("registerInfo.lastName") }}
          value={values.lastname}
          onChange={handleChangeLetters}
          inputProps={{
            autoComplete: "disabled", // disable autocomplete and autofill
          }}
        />

        <Input
          className={`
            ${validEmail ? 'check' : ''}
            ${errors.email ? 'error' : ''}
          `}
          name='email'
          {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
          placeholder={t("registerInfo.email")}
          inputProps={{ 'aria-label': t("registerInfo.email") }}
          value={values.email}
          onChange={handleChangeEmail}
          inputProps={{
            autoComplete: "disabled", // disable autocomplete and autofill
          }}
        />
        <Input
          className={`
            ${validZipCode ? 'check' : ''}
            ${errors.zipcode ? 'error' : ''}
          `}
          name='zipcode'
          type='number'
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 5);
          }}
          {...register('zipcode', { required: true, pattern: /^[0-9]{5}(?:-[0-9]{4})?$/ })}
          placeholder={t("registerInfo.zip")}
          inputProps={{ 'aria-label': t("registerInfo.zip") }}
          value={values.zipcode}
          onChange={handleChangeZip}
          inputProps={{
            autoComplete: "disabled", // disable autocomplete and autofill
          }}
        />

        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbox1")}
          </div>
          <Switch
            checked={contact.productNews}
            onChange={handleChangeContact}
            name='productNews'
            inputProps={{ 'aria-label': t("registerInfo.copyCheckbox1") }}
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
            inputProps={{ 'aria-label': t("registerInfo.copyCheckbox2") }}
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
          className='button-send-form'
          variant='contained'
          type="submit"
          disabled={isDisabled}
        >
          {t("registerInfo.yesContinue")}
        </Button>
      </form>

      <Help isOpen={userExists} setIsOpen={setUserExists} message={MESSAGE_DIALOG.emailRegistered} />

    </div>
  );
};

export default RegisterInfo;
