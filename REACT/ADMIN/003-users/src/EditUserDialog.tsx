/**
* АВТОРЫ: 
*      alex-xp@list.ru Сунегин Александр
* 
* ОПИСАНИЕ:
* Диалог редактирования (добавления) пользователя
*/

import React from 'react';

import { AppContextType, AppContext, AppContextInit } from './AppContext';
 
import { Box, Modal, Paper, Container, Divider, Typography, Button, Stack } from '@mui/material';
 
import { SendApi } from '../../../components/SendApi';
import { UserEntity } from '../../../components/db_data/UserEntity';
 
interface IProps {
    onEditUser: (u?:UserEntity)=>void
}
 
interface IState {
    show: boolean,
    user:UserEntity
}

export class EditUserDialog extends React.Component <IProps, IState> {
    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {
        onEditUser: ()=>{}
    }

    constructor(props:any){
        super(props);

        this.state = {
            show: false,
            user: new UserEntity()
        };
    }

    setShow(sh:boolean){
        this.setState({show:sh});
    }

    new_user(){
        this.setState({show:true, user: new UserEntity()});
    }

    edit_user(u:UserEntity){
        this.setState({show:true, user: u});
    }

    render(): React.ReactNode {

        var mdl_title = "Добавить пользователя";
        if(this.state.user.id > 0) mdl_title = "Изменить пользователя " + this.state.user.login;

        return (
            <React.Fragment>
                <Modal open={this.state.show} onClose={ ()=>{ this.setState({show:false});} } aria-labelledby="modal-modal-title">
                    <Box>
                        <Container sx={{marginTop:"70px"}}>
                            <Paper>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{padding:"5px", borderBottom: '1px solid #ccc'}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">{mdl_title}</Typography>
                                    <Button onClick={()=>{ this.setShow(false) }}>X</Button>
                                </Stack>
                                <Box sx={{padding:"5px"}}>
                                    /////
                                </Box>
                                <Box>
                                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{padding:"5px", borderTop: '1px solid #ccc'}}>
                                        <Button color="error">Отменить</Button>
                                        <Divider orientation="vertical" flexItem />
                                        <Button color="success">Сохранить</Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Container>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }
} 


