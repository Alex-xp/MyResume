import React from 'react';

import { IconButton, Typography, Menu, MenuItem } from '@mui/material';

import { AccountCircle} from '@mui/icons-material';

import { SendApi } from '../../../components/SendApi';
import { UserEntity } from '../../../components/db_data/UserEntity';

interface IProps {
    user: UserEntity
}

interface IState {
    showMenu:boolean, /* отображение меню аккаунта пользователя */
    m_anchor:any /* Элемент к которому будет привязано меню (к нему можно привязать любое открывающееся меню) */
}

export class AccountMenu extends React.Component <IProps, IState>{

    static defaultProps:IProps = {
        user: new UserEntity()
    }

    constructor(props:any){
        super(props);
        
        this.state = {
            showMenu:false,
            m_anchor:null
        };
    }

    render(): React.ReactNode {

        var u_login = "----";
        if(this.props.user !== null) u_login = this.props.user.login;

        return (
            <React.Fragment>
                {/* ------------------------------------------------------------------------- */}
                {/* Кнопка аккаунта пользователя в конце панели (с выпадающим меню) */}
                <IconButton size="large" color='inherit' onClick={ (e)=>{ this.setState({showMenu:true, m_anchor:e.currentTarget}) } }>
                    <Typography>{u_login}&nbsp;</Typography>
                    <AccountCircle/>
                </IconButton>
                {/* выпадающее меню */}
                <Menu open={this.state.showMenu} anchorEl={this.state.m_anchor} keepMounted onClose={()=>{ this.setState({showMenu:false})  }}>
                    <MenuItem onClick={()=>{SendApi("logout", {}, (res)=>{ window.location.href = '/admin'; return true; })}}>Выход</MenuItem>
                </Menu>
                {/* ------------------------------------------------------------------------- */}
            </React.Fragment>
        );
        
    };


}
