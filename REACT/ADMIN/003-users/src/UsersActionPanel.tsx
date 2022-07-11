/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Панель действий пользователей (поиск, добавление, изменение)
 */

import React from 'react';

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

import { FindField } from '../../cmps/blocks/FindField';
import { UserEntity } from '../../../components/db_data/UserEntity';
import { ApiResult, SendApi } from '../../../components/SendApi';
import { EditUserDialog } from './EditUserDialog';

interface IProps {
    selected_user?: UserEntity,
    onSearch: (txt:string)=>void, /* передаем строку поиска */
    onEditUser: (u?:UserEntity)=>void
}

interface IState {}

export class UsersActionPanel extends React.Component <IProps, IState> {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {
        onSearch: (txt:string)=>{},
        onEditUser: ()=>{}
    }

    public edUserDlg:EditUserDialog = null;
    public ref_edUserDlg: React.RefObject<EditUserDialog> = React.createRef();

    constructor(props:any){
        super(props);

        this.state = {};
    }

    on_setUserActivation(act:boolean){
        var sel_user = this.props.selected_user || new UserEntity();
        if(sel_user.id < 1) return;

        SendApi("set_user_activation", {id:sel_user.id, active:act}, (res:ApiResult)=>{ 
            this.props.onEditUser(sel_user);
            return true;
        }, (err:ApiResult)=>{  
            return true; 
        });
    }

    renderButtons():React.ReactNode{
        var sel_user = this.props.selected_user || new UserEntity();
        var disabled = true;
        if(sel_user.id > 0) disabled = false;

        var btn_activated = (<Button color="success" disabled={disabled} sx={{width:"150px"}} onClick={()=>{ this.on_setUserActivation(true) }}>Активировать</Button>);
        var btn_deactivated = (<Button color="error" disabled={disabled} sx={{width:"150px"}} onClick={()=>{ this.on_setUserActivation(false) }}>Деактивировать</Button>);

        var res_btn = btn_activated;
        if(sel_user.active) res_btn = btn_deactivated;

        return (
            <React.Fragment>
                <Button disabled={disabled} onClick={()=>{ this.edUserDlg.edit_user(sel_user); }}>Изменить</Button>
                <Button color="success" onClick={()=>{ this.edUserDlg.new_user(); }}>Добавить</Button>
                &nbsp;|&nbsp;
                {res_btn}
            </React.Fragment>
        );
    }

    componentDidMount(): void {
        if(this.ref_edUserDlg.current !== null) this.edUserDlg = this.ref_edUserDlg.current;
    }

    render():React.ReactNode{
        if(this.ref_edUserDlg.current !== null) this.edUserDlg = this.ref_edUserDlg.current;

        var sel_user = this.props.selected_user || new UserEntity();


        return(
            <React.Fragment>
                <Box sx={{marginTop:'15px'}}>
                    <Paper sx={{padding:'5px'}}>
                        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems='center' >
                            <FindField onFind={ (txt)=>{ this.props.onSearch(txt); } } />

                            <Typography sx={{flexGrow:1}}>
                                ({sel_user.login})
                                &nbsp;
                            </Typography>

                            <Typography>
                                {this.renderButtons()}
                            </Typography>
                        </Stack>
                    </Paper>
                </Box>

                <EditUserDialog ref={this.ref_edUserDlg} onEditUser={ (u)=>{ this.props.onEditUser(u) } } />

            </React.Fragment>
        );
    }

}




