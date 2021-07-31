import { useState, useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Switch,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { VideoLoading } from '@/components/Anims';
import { PROCESS_ENUM, MESSAGE_DIALOG } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import useTranslation from 'next-translate/useTranslation';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { useRouter } from 'next/router';

const setCookie = (email) => {
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
  const { setProcess, data, character, swap, setSwap, locale } = useContext(ExperienceContext);
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
  const [dataRegister, setDataRegister] = useState({});
  const [startSwap, setStartSwap] = useState(false);

  const [contact, setContact] = useState({
    productNews: false,
    testDrive: false,
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const router = useRouter();

  /******** EFFECT ACTIONS ********/

  // effect when startSwap = true
  useEffect(() => {
    const initSwap = async (payload) => {
      try {
        const response = await fetch('/api/photo_swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        const json = await response.json();
        //const status = await response.status;
        
        if(json.success) {
          // all good!, goto share!
          //setSwap(json.data);
          setProcess(PROCESS_ENUM.share);

          router.replace({
            pathname: '/share-experience/[id]',
            query: { id: data.userId },
          });

        } else {
          // error reface then continue and go to STOP PAGE
          setProcess(PROCESS_ENUM.waitProcess);
          router.replace('/process_you_video');
        }
        
      } catch (error) {
        console.error(error);
      };
    };
    
    if(startSwap) {
      initSwap({ ...data, ...dataRegister, locale });
    }
  }, [startSwap]);

  // effect when dataRegister change state
  useEffect(() => {
    const sendData = async () => {
      const response = await fetch('api/set_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataRegister),
      });

      const json = await response.json();
      
      if(json.success) {
        setCookie(dataRegister.email);

        // when save json, then: swap proccess
        setStartSwap(true);
        
      } else {
        setSubmitting(false);
        
        if(json.userExist) {
          setUserExists(json.userExist);
        }
      }
    };

    if(isSubmitting) {
      sendData();
    }
  }, [dataRegister]);
  
  // effect when values change
  useEffect(() => {
    const items = Object.values(values);
    const count = items.reduce((count, item) => {
      return item ? count + 1 : count;
    }, 0);
  
    setProgress( (count * 80) / items.length );
  }, [values]);

  /******** HANDLES ACTIONS ********/
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
      setUserExists(true);
    }
  };
  
  const handleChangeZip = (event) => {
    let { name, value } = event.target;
    value = value.substring(0,5);
    const valid = /^\d{5}?$/.test(value); // 5digits
    //const valid = /^\d{5}(?:-\d{4})?$/.test(value); // 5digits-4digits
    setValidZipCode(valid);
    setValues({...values, [name]: value});
  }
  
  const handleChangeLetters = (event) => {
    const { name, value } = event.target;
    let text = '';
    
    text = value.replace(/[^A-Za-z/\W|_ ]+/ig, '').replace(/[.@!#$%&*()/><∆+]/g, '');
    
    setValues({...values, [name]: text});
  };

    /******** ON SUBMIT PROCESS ********/
  const onSubmit = (dataForm) => {
    setSubmitting(true);
        
    // check user exist
    if(dataForm.email === userEmail) {
      setUserExists(true);
      setSubmitting(false);
      return;
    }
    
    setDataRegister({
      ...dataRegister,
      ...dataForm,
      ...contact,
      ...data,
      character,
      locale,
      textOpenBrowser: t('mailing_openWithBrowser'),
      imgTitle: t('mailing_title_youMadeIt'),
      textTitle: t('mailing_title_youMadeIt_text'),
      textMessage: t('mailing_watchYouFullVideo'),
      imgButton: t('mailing_btn_watchVideo'),
      textButton: t('mailing_btn_watchVideo_text'),
      metaTitle: t('meta_tags_title'),
    });    
  };

  return (
    <div className='formVideo'>
      <VideoLoading progress={progress} />
      <div className='copyTitleForm'>{t("registerInfo_copyTitleForm")}</div>
      <div className='copySubtitleForm'>{t("registerInfo_copySubtitleForm")}</div>
      
      {(errors.firtsname || errors.lastname || errors.email || errors.zipcode) && (
          <span className='errorsField center'>
            {t("registerInfo_errorsField")}
          </span>
        )}

      <form id='formRegister' onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Input
          className={`
            ${values.firstname ? 'check' : ''}
            ${errors.firstname ? 'error' : ''}
          `}
          name='firstname'
          {...register('firstname', { required: true })}
          placeholder={t("registerInfo_name")}
          inputProps={{ 'aria-label': t("registerInfo_name") }}
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
          placeholder={t("registerInfo_lastName")}
          inputProps={{ 'aria-label': t("registerInfo_lastName") }}
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
          type='email'
          {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
          placeholder={t("registerInfo_email")}
          inputProps={{ 'aria-label': t("registerInfo_email") }}
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
          {...register('zipcode', { required: true, pattern: /^[0-9]{5}(?:-[0-9]{4})?$/ })}
          placeholder={t("registerInfo_zip")}
          inputProps={{ 'aria-label': t("registerInfo_zip") }}
          value={values.zipcode}
          onChange={handleChangeZip}
          inputProps={{
            maxLength: 5,
            autoComplete: "disabled", // disable autocomplete and autofill
          }}
        />

        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo_copyCheckbox1")}
          </div>
          <Switch
            checked={contact.productNews}
            onChange={handleChangeContact}
            id='productNews'
            name='productNews'
            inputProps={{ 'aria-label': t("registerInfo_copyCheckbox1") }}
          />
        </div>
        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo_copyCheckbox2")}
          </div>
          <Switch
            className="switch2"
            checked={contact.testDrive}
            onChange={handleChangeContact}
            id='testDrive'
            name='testDrive'
            inputProps={{ 'aria-label': t("registerInfo_copyCheckbox2") }}
          />
        </div>
        <div className="boxCheckbox">
            <div className="copyCheckbox special">
            {t("registerInfo_Legal")}{' '}<a href={t("registerInfo_link")} target="_blank">{t("registerInfo_linkLegal")}</a>
            {t("registerInfo_Legal2")}{' '}<a href={t("registerInfo_link2")} target="_blank">{t("registerInfo_linkLegal2")}</a>
            </div>
        </div>
        {isSubmitting && (
          <Loading />
        )}
        <Button
          className='button-send-form'
          variant='contained'
          type="submit"
          disabled={isSubmitting}
        >
          {t("registerInfo_yesContinue")}
        </Button>
      </form>

      <Help id="emailExist" isOpen={userExists} setIsOpen={setUserExists} message={MESSAGE_DIALOG.emailRegistered} />

    </div>
  );
};

export default RegisterInfo;
