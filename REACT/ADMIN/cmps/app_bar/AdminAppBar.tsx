/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Основная панель приложения с главным меню
 */


import React from 'react';

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

//import { SendApi } from '../../../components/SendApi';
import { UserEntity } from '../../../components/db_data/UserEntity';

import { AccountMenu } from './AccountMenu';

import { LeftDrawer } from './left_drawer/LeftDrawer';

interface IProps {
    title:string,
    user: UserEntity
}

interface IState {
    showDrawer:boolean, /* в качестве отображаемого компонента Drawer */
    m_anchor:any /* Элемент к которому будет привязано меню (к нему можно привязать любое открывающееся меню) */
}

export class AdminAppBar extends React.Component <IProps, IState>{

    static defaultProps:IProps = {
        title: "",
        user: new UserEntity()
    }

    constructor(props:any){
        super(props);
        
        this.state = {
            showDrawer:false,
            m_anchor:null
        };
    }

    render(): React.ReactNode {

        return (
            <React.Fragment>
                {/* ПАНЕЛЬ ПРИЛОЖЕНИЯ (верхняя панель кнопок) */}
                <AppBar position="static" sx={{ margin: '0', padding: '0' }}>
                    <Toolbar>
                        <IconButton size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=>{this.setState({showDrawer:true})}}
                            >
                            <MenuIcon />
                        </IconButton>

                        {/* растяжка от начала панели (можно добавлять пункты от начала) */}
                        <Typography sx={{flexGrow:1}}>{this.props.title}</Typography>

                        {/* ------------------------------------------------------------------------- */}
                        {/* Кнопка аккаунта пользователя в конце панели (с выпадающим меню) */}
                        <AccountMenu user={this.props.user}/>
                        {/* ------------------------------------------------------------------------- */}

                    </Toolbar>
                </AppBar>

                {/* ******************************************************************************************************************************* */}
                {/* Drawer выпалающая панель с левого угла (выпадает и закрывается от состояния showMenu) */}
                <LeftDrawer open={this.state.showDrawer} onClose={()=>{this.setState({showDrawer:false})}}/>
                {/* ******************************************************************************************************************************* */}

            </React.Fragment>
        );
        
    };


}

