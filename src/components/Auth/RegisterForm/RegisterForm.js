
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { InitialValues, ValidationSchema } from './RegisterForm.form' 
import { useRouter } from 'next/router'
import { RegisterApi } from '@/api'



export function RegisterForm() {

  const router = useRouter()

  const formik = useFormik({
    initialValues: InitialValues(),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await RegisterApi(formValues)
        router.push('/join/sign-in')
      }catch(error){
        console.error(error)
      }
    }
  })


  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input name='email' type='email' placeholder='Correo electrónico' value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
        <Form.Input name='username' type='text' placeholder='Nombre de usuario' value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username}/>
      </Form.Group>


      <Form.Group widths='equal'>
        <Form.Input name='name' type='text' placeholder='Nombre y apellido' value={formik.values.name} onChange={formik.handleChange} error={formik.errors.name}/>
        <Form.Input name='password' type='password' placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>
      </Form.Group>

      <Form.Button type='submit' fluid loading={formik.isSubmitting}>Registrarse</Form.Button>
    </Form>
  )
}
