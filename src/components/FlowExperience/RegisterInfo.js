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
import { Loading } from '@/components/Anims';

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
  const [contact, setContact] = useState({
    productNews: false,
    testDrive: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  /******** EFFECT ACTIONS ********/

  // effect to init DOM
  useEffect(() => {
    const initSwap = async (payload) => {
      try {
        const response = await fetch('/api/photo_swap', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        
        const json = await response.json();
        
        if(json.success) {
          setSwap(json.data);
        } else {
          //
        }
        
      } catch (error) {
        console.error(error);
      };
    };
    
    if(data) {
      initSwap({ ...data, locale });
    }
  }, []);

  // effect when swap change state
  useEffect(() => {
    if(swap) {
      setDataRegister({
        ...dataRegister,
        ...swap,
      });
    }
  }, [swap]);

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

      if(response.status !== 200) {
        // server error 
      }
      
      if(json.success) {
        setCookie(dataRegister.email);

        // when save json, then change to share
        setProcess(PROCESS_ENUM.share);
        
      } else {
        setSubmitting(false);
        
        if(json.userExist) {
          setUserExists(json.userExist);
        }
      }
    };

    if(swap && isSubmitting) {
      sendData();
    }
  }, [dataRegister]);

  // effect to progress
  useEffect(() => {
    setIsDisabled(progress >= 100 ? false : true);
  }, [progress]);
  
  // effect when values change
  useEffect(() => {
    const items = Object.values(values);
    const count = items.reduce((count, item) => {
      return item ? count + 1 : count;
    }, 0);
  
    setProgress( (count * 100) / items.length );
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
    const { name, value } = event.target;

    const valid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
    
    setValidZipCode(valid);
    setValues({...values, [name]: value});
  }
  
  const handleChangeLetters = (event) => {
    const { name, value } = event.target;
    let text = '';
    
    text = value.replace(/[^A-Za-z/\W|_ ]+/ig, '').replace(/[.@!#$%&*()/><∆+]/g, '');
    
    setValues({...values, [name]: text});
  };

  const handleChangeCheck = (event) => {
    setAgreeTerms(event.target.checked);
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
      textOpenBrowser: t('mailing.openWithBrowser'),
      textTitle: t('meta.tags.title'),
      imgTitle: t('mailing.title.youMadeIt'),
      textMessage: t('mailing.watchYouFullVideo'),
      imgButton: t('mailing.btn.watchVideo'),
      textTerms: t('mailing.terms'),
    });    
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

      <form id='formRegister' onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
          type='email'
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
        <div className="boxCheckbox">
            <div className="copyCheckbox special">
            {t("registerInfo.Legal")}{' '}<a href={t("registerInfo.link")} target="_blank">{t("registerInfo.linkLegal")}</a>
            {t("registerInfo.Legal2")}{' '}<a href={t("registerInfo.link2")} target="_blank">{t("registerInfo.linkLegal2")}</a>
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
          {t("registerInfo.yesContinue")}
        </Button>
      </form>

      <Help isOpen={userExists} setIsOpen={setUserExists} message={MESSAGE_DIALOG.emailRegistered} />

    </div>
  );
};

export default RegisterInfo;
