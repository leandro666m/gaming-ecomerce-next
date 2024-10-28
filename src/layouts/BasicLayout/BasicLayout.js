import { Container } from 'semantic-ui-react'
import { styles } from './BasicLayout.module.scss'


export function BasicLayout( {children, isOpenSearch = false, isContainer = false, realite = false} ) {


  return (
    <>
      {/* // topBar */}
      
      <Container fluid>
        {  isContainer ? <Container>{children}</Container> : children }
      </Container>
        
      {/* // footer */}

    </>
  )
}
