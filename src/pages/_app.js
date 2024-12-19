import 'semantic-ui-css/semantic.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/scss/global.scss'
import { AuthProvider } from '@/contexts'



export default function App(props) {

  const { Component, pageProps } = props;
  

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
