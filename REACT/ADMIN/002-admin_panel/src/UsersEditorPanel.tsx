import React from 'react';

import { AppContextType, AppContext } from './AppContext';

import { Paper, Box, Grid, Typography, Card, CardContent, Stack, CardActions, Button } from '@mui/material';
import { SupervisedUserCircle} from '@mui/icons-material';

import { UserEntity } from '../../../components/db_data/UserEntity';

interface IProps {
}

interface IState {
}


export class UsersEditorPanel  extends React.Component <IProps, IState>{

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps:IProps = {
    }

    constructor(props:any){
        super(props);
        
        this.state = {};
    }

    componentDidMount(): void {
        //this.context.adminPanel = this;
    }

    componentWillUnmount(): void {
        //this.context.adminPanel = null;
    }

    render():React.ReactNode{
        return(
            <React.Fragment>

                <Card sx={{margin:"5px", marginTop:"20px", backgroundColor: "#eeeeee"}}>
                    <Box sx={{padding:'5px'}}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{color:"#1976d2"}}>
                            <SupervisedUserCircle/>
                            <Typography component='span' sx={{fontSize:"18px", fontWeight: 'bold'}}> Работа с пользователями</Typography>
                        </Stack>
                    </Box>
                    
                    <CardContent sx={{backgroundColor: "#ffffff"}}>

                        <Grid container spacing={2}>

                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <Card sx={{backgroundColor: "#878787"}}> 
                                    <Typography sx={{padding:"3px 3px 3px 10px", color:"#ffffff"}}>Пользователи системы</Typography>
                                    <CardContent sx={{backgroundColor: "#ffffff"}}>
                                    <p>Управление пользователями системы</p>
                                    </CardContent>
                                    <CardActions sx={{backgroundColor: "#eee"}}>
                                        <Button size='small' href='/admin/users'>Перейти в раздел</Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <Card sx={{backgroundColor: "#878787"}}> 
                                    <Typography sx={{padding:"3px 3px 3px 10px", color:"#ffffff"}}>Пользователи системы</Typography>
                                    <CardContent sx={{backgroundColor: "#ffffff"}}>
                                        <p>+++++++</p>
                                    </CardContent>
                                    <CardActions sx={{backgroundColor: "#eee"}}>
                                        <Button size='small'>Перейти в раздел</Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                        </Grid>
                        
                    </CardContent>
                </Card>
                
            </React.Fragment>
        );
    }


}

