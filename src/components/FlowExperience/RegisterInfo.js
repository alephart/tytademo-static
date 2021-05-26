import React from 'react';
import {
  Input,
  Button,
  Switch,
  Checkbox,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { VideoLoading } from '@/components/Anims';
import { PROCESS_ENUM } from '@/utils/globals';

const RegisterInfo = ({ setProcess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='formVideo'>
      <VideoLoading />
      <div className='copyTitleForm'>¡YA CASI!</div>
      <div className='copySubtitleForm'>Regístrate para obtener tu video.</div>
      {errors.nameRequired &&
        errors.lastNameRequired &&
        errors.emailRequired &&
        errors.zipRequired && (
          <span className='errorsField center'>
            Por favor completa todos los campos
          </span>
        )}
      <form noValidate autoComplete='off'>
        <Input
          {...register('nameRequired', { required: false })}
          placeholder='Nombre'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.nameRequired && (
          <span className='errorsField'>Por favor completa el campo</span>
        )}

        <Input
          {...register('lastNameRequired', { required: false })}
          placeholder='Apellido'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.lastNameRequired && (
          <span className='errorsField'>Por favor completa el campo</span>
        )}

        <Input
          {...register('emailRequired', { required: false })}
          placeholder='Correo electrónico'
          inputProps={{ 'aria-label': 'description' }}
        />
        {errors.emailRequired && (
          <span className='errorsField'>Por favor completa el campo</span>
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
          <span className='errorsField'>Por favor completa el campo</span>
        )}

        <div className='boxCheckbox'>
          <div className='copyCheckbox'>
            Me gustaría recibir noticias sobre productos y eventos de Toyota.
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
            Me gustaría que mi concesionario local Toyota me contactara para una
            prueba de manejo y para darme más información sobre la compra o
            arrendamiento de un vehículo Toyota nuevo.
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
          VER VIDEO
        </Button>
      </form>
    </div>
  );
};

export default RegisterInfo;
