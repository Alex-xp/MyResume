/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Таблица пользователей (отображение и, выбор)
 */

import React from 'react';

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { SendApi } from '../../../components/SendApi';
import { UserEntity } from '../../../components/db_data/UserEntity';

interface IProps {
    users_list:UserEntity[],
    onSelect: (ue:UserEntity)=>void
}

interface IState {
    u_selected:UserEntity
}

export class UsersTable extends React.Component <IProps, IState> {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {
        users_list: new Array<UserEntity>(),
        onSelect: (ue:UserEntity)=>{}
    }

    constructor(props:any){
        super(props);

        this.state = {
            u_selected:null
        };
    }

    on_selectUser(ue:UserEntity){
        this.setState({ u_selected: ue });
        this.props.onSelect(ue);
    }

    renderRow(ue:UserEntity):React.ReactNode{
        var user_active = (<Typography component='span' sx={{color:'#880000'}}>НЕ АКТИВЕН</Typography>);
        if(ue.active) user_active = (<Typography component='span' sx={{color:'#008800'}}>АКТИВЕН</Typography>);

        var email_active = (<Typography component='span' sx={{color:'#880000'}}>НЕ АКТИВЕН</Typography>);
        if(ue.email_active) email_active = (<Typography component='span' sx={{color:'#008800'}}>АКТИВЕН</Typography>);

        var usStyle = { flexWrap:1, fontWeight: 'normal', backgroundColor:"#fff" };
        if(this.state.u_selected !== null && this.state.u_selected.id === ue.id) usStyle = { flexWrap:1, fontWeight: 'bold', backgroundColor:"#ddd" };

        var access_text = "";
        
        if(ue.u_access < 10001) access_text = "Пользователь";
        if(ue.u_access < 1001) access_text = "Продвинутый пользователь";
        if(ue.u_access < 501) access_text = "Модератор";
        if(ue.u_access < 101) access_text = "Администратор";
        if(ue.u_access < 5) access_text = "Разработчик";

        //console.log(ue);

        return (
            <React.Fragment key={"uid_"+ue.id}>
                <TableRow sx={usStyle}>
                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{ue.id}</Typography>
                        </a>
                    </TableCell>

                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{ue.login}</Typography>
                        </a>
                    </TableCell>

                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{access_text}</Typography>
                        </a>
                    </TableCell>

                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{ue.email}</Typography>
                        </a>
                    </TableCell>

                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{user_active}</Typography>
                        </a>
                    </TableCell>

                    <TableCell sx={usStyle}>
                        <a href="" style={{color:"#222", textDecoration:"none"}} onClick={(e)=>{ e.preventDefault(); this.on_selectUser(ue); }}>
                            <Typography sx={usStyle}>{email_active}</Typography>
                        </a>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    render():React.ReactNode{
        return(
            <React.Fragment>
                <TableContainer component={Paper} sx={{maxHeight: "500px", scroll:'auto'}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{color:"#fff", backgroundColor:"#222"}}>

                                <TableCell sx={{color:"#fff", width:"120px"}}>
                                    <Typography>UID</Typography>
                                </TableCell>

                                <TableCell sx={{color:"#fff", width:"250px"}}>
                                    <Typography>Логин</Typography>
                                </TableCell>

                                <TableCell sx={{color:"#fff", width:"250px"}}>
                                    <Typography>Уровень доступа</Typography>
                                </TableCell>

                                <TableCell sx={{color:"#fff"}}>
                                    <Typography>E-mail</Typography>
                                </TableCell>

                                <TableCell sx={{color:"#fff"}}>
                                    <Typography>Активность</Typography>
                                </TableCell>

                                <TableCell sx={{color:"#fff"}}>
                                    <Typography>Активность e-mail</Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { this.props.users_list.map( (ue:UserEntity, i:number)=>this.renderRow(ue) ) }
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </React.Fragment>
        );
    }

}







