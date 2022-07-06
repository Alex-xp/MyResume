import React from 'react';

import { AppContextType, AppContext } from './AppContext';

import { Container, Paper, Box, Grid, Typography, Card, CardHeader, CardContent, Tooltip, Stack } from '@mui/material';
import { AccountCircle} from '@mui/icons-material';

import { AdminAppBar } from '../../cmps/app_bar/AdminAppBar';
import { UserEntity } from '../../../components/db_data/UserEntity';
import { SendApi } from '../../../components/SendApi';

import { UserStatisticPanel } from './UserStatisticPanel';
import { UsersEditorPanel } from './UsersEditorPanel';
import { StatPanel } from './StatPanel';

interface IProps {
}

interface IState {
    user:UserEntity
}

export class AdminPanel extends React.Component <IProps, IState>{

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps:IProps = {}

    constructor(props:any){
        super(props);
        
        this.state = {
            user:null
        };
    }

    componentDidMount(): void {
        this.context.adminPanel = this;
        SendApi('current_user', {}, (res)=>{ this.setState({user: res.user}); return true; }, (err)=>{ return true; });
    }

    componentWillUnmount(): void {
        this.context.adminPanel = null;
    }

    render():React.ReactNode{
        return(
            <React.Fragment>
                <AdminAppBar title="Панель управления" user={this.state.user}/>

                <div style={{padding: "10px"}}>
                    <StatPanel/>
                    
                    <UserStatisticPanel user={this.state.user} />

                    <UsersEditorPanel />

                </div>
            </React.Fragment>
        );
    }


}



