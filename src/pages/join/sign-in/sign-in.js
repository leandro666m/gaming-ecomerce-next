
import { JoinLayout } from '@/layouts'
import styles from './sign-in.module.scss'
import Link from 'next/link'
import { LoginForm } from '@/components/Auth'



export default function SignInPage() {


  return (
    <JoinLayout>
        <div className={styles.signIn}>
            <h3>Iniciar sesión</h3>

            <LoginForm />


            <div className={styles.actions}>
              <Link href="/join/sign-up">¿No tienes cuenta? Regístrate</Link>
            </div>

        </div>
    </JoinLayout>
  )
}
