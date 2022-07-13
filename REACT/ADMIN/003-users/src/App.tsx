/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Класс компонента приложения на главную страницу
 */

import React from 'react';

import { MSG_TYPES, MsgSystem } from "../../../components/msg_system/MsgSystem";

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { Box, Paper, Stack, Typography } from '@mui/material';

import { AdminAppBar } from '../../cmps/app_bar/AdminAppBar';
import { UserEntity } from '../../../components/db_data/UserEntity';
import { SendApi } from '../../../components/SendApi';

import { UsersActionPanel } from './UsersActionPanel';
import { UsersTable } from './UsersTable';

interface IProps {
}

interface IState {
    user:UserEntity, /* текущий пользователь */
    users_list: UserEntity[],
    selected_user: UserEntity,
    search_login: string /* для обновления пользователя после правки (повторный поиск) */
}

export class App extends React.Component <IProps, IState> {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {}

    public msg_ref:React.RefObject<MsgSystem> = React.createRef();

    constructor(props:any){
        super(props);

        this.state = {
            user:null,
            users_list: [],
            selected_user: null,
            search_login: ''
        };

        SendApi('current_user', {}, (res)=>{ 
            this.setState({user: res.user}); 
            this.context.current_user = res.user; 

            this.searchUsers("");
            return true; 
        }, (err)=>{ return true; });
    }

    componentDidMount(): void {
        this.context.app = this;
        this.context.msg_sys = this.msg_ref.current;
    }

    componentWillUnmount(): void {
        this.context.app = null;
        this.context.msg_sys = null;
    }

    /**
     * Поиск пользователя - вызывается при вводе логина в строку поиска (связь компонентов UsersActionPanel -> UsersTable)
     * @param s_login string - текст поиска по логину
     */
    searchUsers(s_login:string){
        SendApi('find_users', {login:s_login}, (res)=>{ 
            this.setState({users_list:res.result, search_login:s_login, selected_user: null}); 
            //console.log(res.result);
            return true; 
        }, (err)=>{ return true; });
    }

    /**
     * Вызывается при выборе пользователя в компоненте UsersTable с события onSelect
     * @param ue UserEntity - пользователь
     */
    on_SelectUser(ue:UserEntity){
        this.setState({selected_user: ue});
    }


    render():React.ReactNode{

        //console.log("selected_user", this.state.selected_user);

        return(
            <AppContext.Provider value={AppContextInit}>
                <MsgSystem ref={this.msg_ref}/>
                <AdminAppBar title="Управление пользователями" user={this.state.user}/>
                
                <div style={{padding:"10px"}}>
                    <UsersActionPanel 
                        onSearch={ (stxt:string)=>{ this.searchUsers(stxt); } } 
                        selected_user={this.state.selected_user} 
                        onEditUser={ ()=>{ this.searchUsers(this.state.search_login) } }
                    />
                </div>

                <Box sx={{marginTop:'15px'}}>
                    <Paper sx={{padding:'5px', minHeight:"600px"}}>
                        <UsersTable users_list={this.state.users_list} onSelect={ (ue)=>{ this.on_SelectUser(ue); } } />
                    </Paper>
                </Box>
                

            </AppContext.Provider>
        );
    }


    

}

