import React from 'react';

import { AppContextType, AppContext } from './AppContext';

import { Paper, Box, Grid, Typography, Card, CardContent, Stack, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { AccountCircle} from '@mui/icons-material';

import { UserEntity } from '../../../components/db_data/UserEntity';

interface IProps {
    user:UserEntity
}

interface IState {
}

export class UserStatisticPanel extends React.Component <IProps, IState>{

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps:IProps = {
        user: new UserEntity()
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
        if(this.props.user === null) return (<></>);

        var user_active = (<span style={{color:"#880000"}}>НЕТ</span>);
        if(this.props.user.active) user_active = (<span style={{color:"#008800"}}>АКТИВЕН</span>);

        var user_mail_active = (<span style={{color:"#880000"}}>НЕТ</span>);
        if(this.props.user.email_active) user_mail_active = (<span style={{color:"#008800"}}>АКТИВЕН</span>);

        return(
            <React.Fragment>

                <Card sx={{margin:"5px", marginTop:"20px", backgroundColor: "#eeeeee"}}>
                    <Box sx={{padding:'5px'}}>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{color:"#1976d2"}}>
                            <AccountCircle/>
                            <Typography component='span' sx={{fontSize:"18px", fontWeight: 'bold'}}> Данные текущего пользователя</Typography>
                        </Stack>
                    </Box>
                    
                    <CardContent sx={{backgroundColor: "#ffffff"}}>

                        <Grid container spacing={2}>

                            <Grid item lg={4} md={6} sm={12} xs={12} >
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        {/*<TableHead>
                                            <TableRow>
                                                <TableCell align="right" component="th" sx={{width:'200px'}}>Ключ:</TableCell>
                                                <TableCell align="left" component="th">Значение</TableCell>
                                            </TableRow>
                                        </TableHead>*/}
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="right" sx={{width:'200px'}}><b>ID:</b></TableCell>
                                                <TableCell align="left">{this.props.user.id}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell align="right" sx={{width:'200px'}}><b>Логин:</b></TableCell>
                                                <TableCell align="left">{this.props.user.login}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell align="right" sx={{width:'200px'}}><b>e-mail:</b></TableCell>
                                                <TableCell align="left">{this.props.user.email}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell align="right" sx={{width:'200px'}}><b>Активность:</b></TableCell>
                                                <TableCell align="left">{user_active}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell align="right" sx={{width:'200px'}}><b>Активность e-mail:</b></TableCell>
                                                <TableCell align="left">{user_mail_active}</TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item lg={8} md={6} sm={12} xs={12} >
                                <Paper sx={{backgroundColor:"#878787", padding: "3px"}}>
                                    <Typography sx={{padding:"3px 3px 3px 10px", color:"#ffffff"}}><b>Статистика пользователя:</b></Typography>
                                </Paper>

                                <div style={{marginTop:"10px"}}>
                                    ////////
                                </div>

                            </Grid>

                        </Grid>
                        
                        

                        

                        
                    </CardContent>
                </Card>
                
            </React.Fragment>
        );
    }


}



