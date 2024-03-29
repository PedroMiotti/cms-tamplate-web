import React, { useEffect, useRef } from 'react'
import './styles/criar.css'

// Components
import BottomLine from '../../../shared/components/BottomLine/index'
import SnackMessage from '../../../shared/components/Snackbar/index'
import SnackLoad from '../../../shared/components/Snackload/index';
import ContentWrapper from '../../../shared/components/ContentWrapper/index'

// Bootstrap
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getListaPerfil } from '../../../store/_entities/perfil';
import { createUser } from '../../../store/_entities/usuario';

// Helpers
import { toUppercase } from '../../../helpers/toUppercase'


const CriarU = () => {
    
    //_entite
    const lista_perfil = useSelector(state => state.entitie.perfil.lista);
    const usuarioCreatedSuccess = useSelector(state => state.entitie.usuario.success);
    const usuarioCreatedFailed = useSelector(state => state.entitie.usuario.error);
    const usuarioCreatedLoading = useSelector(state => state.entitie.usuario.loading);
    const usuarioCreatedErrorMessage = useSelector(state => state.entitie.usuario.errorMessage);
    const usuarioCreatedSuccessMessage = useSelector(state => state.entitie.usuario.successMessage);

    // Input refs
    const nomeInput = useRef();
    const loginInput = useRef();
    const perfilInput = useRef();

    const dispatch = useDispatch()
    
    useEffect(() => {
        
        dispatch(getListaPerfil());
      
    },[])
    

    const criarUsuario = (e) => {
        e.preventDefault();

        const nome = nomeInput.current.value;
        const login = loginInput.current.value;
        const perfilId = perfilInput.current.value;
        
        dispatch(createUser(login, nome, perfilId))

    }


    return (
        <ContentWrapper >
            <Container className="container-criarU" >
                <Row className="justify-content-start" >
                    <h1 >Criar Usuário</h1>

                    <BottomLine />

                </Row>
                <Row  className="justify-content-center">

                    <Form className="form-frame" onSubmit={criarUsuario}>

                        <h5>Informaçoes do usuário</h5>
                        <BottomLine/>
                    
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control ref={loginInput} onInput={(e) => toUppercase(e)}/>
                            
                        </Form.Group>

                        <Form.Group controlId="formBasicNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control ref={nomeInput} onInput={(e) => toUppercase(e)}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Perfil</Form.Label>
                            <Form.Control ref={perfilInput} as="select" id="inlineFormPerfil" className="mr-sm-2 " custom>
                                <option value="0">Escolha...</option>

                                {lista_perfil.map((lista) => (
                                    <option key={lista.perf_id + 1} value={lista.perf_id}>{lista.perf_nome}</option>
                                ))}

                            </Form.Control>
                            
                        </Form.Group>

                        <BottomLine/>

                        
                        <Button variant="primary" type="submit" block size="lg">
                            Criar
                        </Button>
                    
                    </Form>
                </Row>
            </Container>
            

            {usuarioCreatedLoading && <SnackLoad show={usuarioCreatedLoading}/>}

            {usuarioCreatedFailed && <SnackMessage message={usuarioCreatedErrorMessage} color={"error"} show={usuarioCreatedFailed}/>}

            {usuarioCreatedSuccess && <SnackMessage message={usuarioCreatedSuccessMessage} color={"success"} show={usuarioCreatedSuccess}/>}
        </ContentWrapper>

        
    )
}

export default CriarU;
