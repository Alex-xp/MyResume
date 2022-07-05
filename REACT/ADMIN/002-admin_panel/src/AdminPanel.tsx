import React from 'react';

import { AppContextType, AppContext } from './AppContext';

import { Container, Paper, Box, Grid, Typography, Card, CardHeader, CardContent, Tooltip, Stack } from '@mui/material';
import { AccountCircle} from '@mui/icons-material';

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
                <AdminAppBar title="Панель управления" user={this.state.user}/>

                <Card sx={{margin:"5px", marginTop:"10px", backgroundColor: "#eeeeee"}}>

                    

                    <Box sx={{padding:'5px'}}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{color:"#1976d2"}}>
                            <AccountCircle/>
                            <Typography component='span' sx={{fontSize:"18px", fontWeight: 'bold'}}> Данные текущего пользователя</Typography>
                        </Stack>
                    </Box>
                    
                    <CardContent sx={{backgroundColor: "#ffffff"}}>
                        !!! СТАТИСТИКА ПО ПОЛЬЗОВАТЕЛЮ !!!
                    </CardContent>
                </Card>


                <Grid container spacing={1} sx={{marginTop:"15px"}}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{padding:"5px"}}>
                            <Box>1</Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper sx={{padding:"5px"}}>
                            <Box>2</Box>
                        </Paper>
                    </Grid>
                </Grid>
                
            </React.Fragment>
        );
    }


}



