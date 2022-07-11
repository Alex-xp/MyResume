/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Панель действий пользователей (поиск, добавление, изменение)
 */

import React from 'react';

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { Box, Paper, Stack, Typography } from '@mui/material';

import { FindField } from '../../cmps/blocks/FindField';
import { UserEntity } from '../../../components/db_data/UserEntity';

interface IProps {
    selected_user?: UserEntity,
    onSearch: (txt:string)=>void, /* передаем строку поиска */
}

interface IState {}

export class UsersActionPanel extends React.Component <IProps, IState> {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {
        onSearch: (txt:string)=>{}
    }

    constructor(props:any){
        super(props);

        this.state = {};

        // SendApi('current_user', {}, (res)=>{ this.setState({user: res.user}); this.context.current_user = res.user; return true; }, (err)=>{ return true; });
    }

    componentDidMount(): void {
        //this.context.app = this;
    }

    componentWillUnmount(): void {
        //this.context.app = null;
    }

    render():React.ReactNode{

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
                                +++
                            </Typography>
                        </Stack>
                    </Paper>
                </Box>
            </React.Fragment>
        );
    }

}




