import React, { useEffect, useState } from 'react';
import './styles/listar.css';

// Components
import BottomLine from '../../../shared/components/BottomLine/index';
import CustomModal from '../../../shared/components/Modal/index'
import SnackMessage from '../../../shared/components/Snackbar/index'
import SnackLoad from '../../../shared/components/Snackload/index';

// Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Material UI
import { Edit, Delete } from '@material-ui/icons';

// Router
import { Link } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { listUser } from '../../../store/_entities/usuario';
import { deleteUser } from '../../../store/_entities/usuario'
import { TOGGLE_MODAL } from "../../../store/_ui/modal";


const ListarU = () => {

        //_ui
        const sidebarOpen = useSelector(state => state.ui.sidenav.isOpen);
        const modalOpen = useSelector(state => state.ui.modal.isOpen);
        //_entitie
        const usuarioLista = useSelector(state => state.entitie.usuario.listaUsuarios);  
        const usuarioDeletedSuccess = useSelector(state => state.entitie.usuario.success);
        const usuarioDeletedFailed = useSelector(state => state.entitie.usuario.error);
        const usuarioDeletedLoading = useSelector(state => state.entitie.usuario.loading);
        const usuarioDeletedErrorMessage = useSelector(state => state.entitie.usuario.errorMessage);
        const usuarioDeletedSuccessMessage = useSelector(state => state.entitie.usuario.successMessage);
        const usuarioUpdateUserList = useSelector(state => state.entitie.usuario.updateUserList);


        const [ delUserID, setDelUserID ] = useState() 

        const dispatch = useDispatch()

        const delUser = () => {
            dispatch(deleteUser(delUserID))

            if(modalOpen) dispatch(TOGGLE_MODAL())

        }

        const toggleModal = (id) => {
            dispatch(TOGGLE_MODAL())

            setDelUserID(id);
        }
    
        useEffect(() => {
            
            dispatch(listUser());
          
        },[usuarioUpdateUserList])
        
        return (
            <div style={sidebarOpen ? {position: "relative", marginLeft: "265px", marginRight: "15px"} : {position: "relative", marginLeft: "15px", marginRight: "15px"}} className="container-listar">
                
                <CustomModal action={delUser} title="Excluir usuario " description="Tem certeza que deseja excluir esse usuario ?" bttText="excluir" bttColor="secondary" />

                <Container className="container-criarU" >
                    <Row className="justify-content-start" >
                        <h1 >Listar Usuários</h1>

                        <BottomLine />

                    </Row>

                    <Row>
                        <Table striped borderless hover>
                            <thead className="thead-dark"> 
                                <tr>
                                <th></th>
                                <th>Login</th>
                                <th>Nome</th>
                                <th>Perfil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarioLista.map((lista) => (
                                    <tr key={lista.user_id}>
                                        <td className="" style={{width:  "8.33%", textAlign: "center"}}>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-editar">Editar</Tooltip>}>
                                                <Link to={`/usuario/editar/${lista.user_id}`}>
                                                    <Edit style={{fill: "#252834", marginRight: "12px"}}/>
                                                </Link> 
                                            </OverlayTrigger>

                                            <OverlayTrigger overlay={<Tooltip id="tooltip-deletar">Deletar</Tooltip>}>
                                                <Link onClick={() => toggleModal(lista.user_id)} >
                                                    <Delete style={{fill: "#f05757"}}/>
                                                </Link>
                                            </OverlayTrigger>
        
                                        </td>
                                        <td>{lista.user_login}</td>
                                        <td>{lista.user_nome}</td>
                                        <td >{lista.perf_nome}</td>
                                    </tr>

                                ))}
                                
                            </tbody>
                        </Table>
                    </Row>
                </Container>

                {usuarioDeletedLoading && <SnackLoad show={usuarioDeletedLoading}/>}

                {usuarioDeletedFailed && <SnackMessage message={usuarioDeletedErrorMessage} color={"error"} show={usuarioDeletedFailed}/>}

                {usuarioDeletedSuccess && <SnackMessage message={usuarioDeletedSuccessMessage} color={"success"} show={usuarioDeletedSuccess}/>}

            </div>
        );
        
}

export default ListarU;
