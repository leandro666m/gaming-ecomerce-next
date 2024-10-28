import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { InitialValues, ValidationSchema } from "./LoginForm.form";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import { LoginApi } from "@/api";



export function LoginForm() {

    const router = useRouter()
    const { login } = useAuth()

    const formik = useFormik({
      initialValues: InitialValues(),
      validationSchema: ValidationSchema(),
      validateOnChange: false,
      onSubmit: async (formValues) => {
        try {
          const response = await LoginApi(formValues)
          login(response.jwt)

          // router.push('/')
        }catch(error){
          console.error("🐷 error: ", error);
        }
      }
    })
  
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input name='identifier' type="text" placeholder='Email o usuario' value={formik.values.identifier} onChange={formik.handleChange} error={formik.errors.identifier}/>

        <Form.Input name='password' type='password' placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>

        <Form.Button type='submit' fluid loading={formik.isSubmitting}>Iniciar sesión</Form.Button>
      
    </Form>
  )
}
