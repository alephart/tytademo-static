import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { useForm } from "react-hook-form";


const FormVideo = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="formVideo">
            <div className="percentageVideo">
                <div className="boxPercentage">
                    <div className="iconPercentage"></div>
                    <div className="numberPercentage">
                        50%
                    </div>
                    <div className="linePercentage">
                        <div className="percentage" style={{width: 50}}></div>
                    </div>
                    <div className="timePercentage">
                        Por segundo
                    </div>
                    <div className="secondPercentage">
                        000 000 166
                    </div>
                </div>
            </div>
            <div className="copyTitleForm">
                ¡falta poco!
            </div>
            <div className="copySubtitleForm">
                Regístrate para obtener el preview de tu video
            </div>
            {errors.nameRequired && errors.lastNameRequired && errors.emailRequired && errors.zipRequired && <span className="errorsField center">Por favor completa todos los campos</span>}
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">

                <Input {...register("nameRequired", { required: true })}  placeholder="Nombre" inputProps={{ 'aria-label': 'description' }} />
                {errors.nameRequired && <span className="errorsField">Por favor completa el campo</span>}

                <Input {...register("lastNameRequired", { required: true })} placeholder="Apellido" inputProps={{ 'aria-label': 'description' }} />
                {errors.lastNameRequired && <span className="errorsField">Por favor completa el campo</span>}

                <Input {...register("emailRequired", { required: true })} placeholder="Email" inputProps={{ 'aria-label': 'description' }} />
                {errors.emailRequired && <span className="errorsField">Por favor completa el campo</span>}

                <Input {...register("zipRequired", { required: true })} placeholder="Zip code" inputProps={{ 'aria-label': 'description' }} />
                {errors.zipRequired && <span className="errorsField">Por favor completa el campo</span>}
                
                <div className="boxCheckbox">
                    <div className="copyCheckbox">
                        Me gustaría recibir noticias sobre productos y eventos de Toyota.
                    </div>
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                </div>
                <div className="boxCheckbox">
                    <div className="copyCheckbox">
                        Me gustaría ser contactado por mi concesionario Toyota para 
                        una prueba de manejo y más información sobre cómo comprar o 
                        arrendar un vehículo Toyota.
                    </div>
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                </div>
                <div className="boxCheckbox">

                    <div className="copyCheckbox special">
                        <Link href="#" color="inherit"> Acepto Políticas de tratamiento de datos</Link>
                    </div>
                    <Checkbox
                        checked={checked}
                        onChange={handleChangeCheck}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                </div>
                <Button type="submit" className="yesContinue" variant="contained">enviar video</Button>
            </form>
        </div>
    )
}
    
export default FormVideo