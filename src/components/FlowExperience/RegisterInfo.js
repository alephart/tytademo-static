import { useContext, useState } from 'react';
import {
  Input,
  Button,
  Switch,
  Checkbox,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { VideoLoading } from '@/components/Anims';
import { PROCESS_ENUM } from '@/utils/globals';
import { PROCESS_ENUM } from '@/helpers/globals';
import ExperienceContext from '@/context/ExperienceContext';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const RegisterInfo = () => {
  const { t } = useTranslation();
  const { setProcess } = useContext(ExperienceContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='formVideo'>
      <VideoLoading />
      <div className='copyTitleForm'>{t("registerInfo.copyTitleForm")}</div>
      <div className='copySubtitleForm'>{t("registerInfo.copySubtitleForm")}</div>
      {errors.nameRequired &&
        errors.lastNameRequired &&
        errors.emailRequired &&
        errors.zipRequired && (
          <span className='errorsField center'>
            {t("registerInfo.errorsField")}
          </span>
        )}
      <form noValidate autoComplete='off'>
        <Input
          {...register('nameRequired', { required: false })}
          placeholder='Nombre'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.nameRequired && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          {...register('lastNameRequired', { required: false })}
          placeholder='Apellido'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.lastNameRequired && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          {...register('emailRequired', { required: false })}
          placeholder='Correo electrónico'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.emailRequired && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <Input
          type='number'
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 5);
          }}
          {...register('zipRequired', { required: false })}
          placeholder='Código postal'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.zipRequired && (
          <span className='errorsField'>{t("registerInfo.errorsFieldGeneral")}</span>
        )}

        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbo1")}
          </div>
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name='checkedA'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            {t("registerInfo.copyCheckbo1")}
          </div>
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name='checkedB'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
        {/* <div className="boxCheckbox">
            <div className="copyCheckbox special">
                <Link href="/termsP" color="inherit"> Acepto Políticas de tratamiento de datos</Link>
            </div>
            <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div> */}
        <Button
          className='yesContinue'
          variant='contained'
          onClick={() => setProcess(PROCESS_ENUM.share)}
        >
          {t("registerInfo.yesContinue")}
        </Button>
      </form>
    </div>
  );
};

export default RegisterInfo;
