import React from 'react';

import { AppContextType, AppContext } from './AppContext';

import { Paper, Container, Box } from '@mui/material';

import { AdminAppBar } from '../../cmps/app_bar/AdminAppBar';
import { UserEntity } from '../../../components/db_data/UserEntity';
import { SendApi } from '../../../components/SendApi';

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
                <AdminAppBar user={this.state.user}/>
                
                <Box sx={{ flexGrow: 1 }}>
                    ***
                </Box>

                <Container maxWidth="xl">
                    <Paper>
                        ADMIN PANEL !!!
                    </Paper>
                </Container>
            </React.Fragment>
        );
    }


}



