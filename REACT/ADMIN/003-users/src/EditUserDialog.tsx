/**
* АВТОРЫ: 
*      alex-xp@list.ru Сунегин Александр
* 
* ОПИСАНИЕ:
* Диалог редактирования (добавления) пользователя
*/

import React from 'react';

import { AppContextType, AppContext, AppContextInit } from './AppContext';
 
import { Box, Modal, Paper, Container, Divider, Typography, Button, Stack, Grid, TextField, Switch, FormGroup, FormControlLabel, FormControl, Select, MenuItem, InputLabel, Input, FormHelperText } from '@mui/material';
 
import { SendApi } from '../../../components/SendApi';
import { UserEntity } from '../../../components/db_data/UserEntity';
 

class fError{
    public isError: boolean = false;
    public login_error:string = '';
    public password_error:string = '';
}


interface IProps {
    onSaveUser: (u?:UserEntity)=>void
}
 
interface IState {
    show: boolean,
    user:UserEntity,
    password1:string,
    password2:string,
    setPassword:boolean,
    f_error: fError
}


export class EditUserDialog extends React.Component <IProps, IState> {
    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {
        onSaveUser: ()=>{}
    }

    public f_error:fError = new fError();

    constructor(props:any){
        super(props);

        this.state = {
            show: false,
            user: new UserEntity(),
            password1:'',
            password2:'',
            setPassword:false,
            f_error: new fError()
        };
    }

    setShow(sh:boolean){
        this.setState({show:sh});
    }

    new_user(){
        this.setState({show:true, user: new UserEntity()});
    }

    edit_user(u:UserEntity){
        this.setState({show:true, user: u});
    }

    /**
     * Проверка и сохранение
     * @returns 
     */
    on_SaveUser(){
        // проверка введеных данных
        var f_error = new fError();

        var u:UserEntity = this.state.user;
        

        if(u.login.trim().length < 6) {
            f_error.isError = true;
            f_error.login_error = "Логин не может быть менее 6 символов";
        }

        var isSetPassword = this.state.setPassword;
        if(u.id < 1) isSetPassword = true;
        if(isSetPassword){
            if(this.state.password1.trim().length < 8) {
                f_error.isError = true;
                f_error.password_error = 'Пароль не должен быть менее 8 символов';
            }else if(this.state.password1.trim() !== this.state.password2){
                f_error.isError = true;
                f_error.password_error = 'Введеные пароли не совпадают';
            }
        }

        if(!f_error.isError) {
            // первая проверка пройдена - проверяем дублирования логина
            SendApi("test_user_double", { id:this.state.user.id, login:this.state.user.login }, (res)=>{
                var r:boolean = res.result;
                if(r){
                    f_error.isError = true;
                    f_error.login_error = "пользователь с таким логином уже существует";
                    this.setState({ show: false });
                }else{
                    // СОХРАНЕНИЕ ПОЛЬЗОВАТЕЛЯ
                    SendApi("save_user", this.state.user, (res)=>{
                        this.context.msg_sys.addMessages(res.messages);

                        if(res.result > 0){
                            // СОХРАНЕНИЕ ПРОШЛО УДАЧНО

                            // проверим нужно ли сохранять пароль
                            if(isSetPassword){
                                // УСТАНОВИМ ПОЛЬЗОВАТЕЛЮ НОВЫЙ ПАРОЛЬ
                                SendApi("set_password", {id:this.state.user.id, password:this.state.password1}, (res)=>{
                                    this.context.msg_sys.addMessages(res.messages);
                                    if(res.result){
                                        this.props.onSaveUser(this.state.user);
                                        this.setState({ show: false });
                                    }
                                    return true;
                                }, (err)=>{ console.log(err); return true; });
                            }else{
                                this.props.onSaveUser(this.state.user);
                                this.setState({ show: false });
                            }
                        }
                        
                        return true; 
                    });
                }
                return true;
            });
        }

        this.setState({ f_error: f_error });
    }

    render(): React.ReactNode {

        var u:UserEntity = this.state.user;
        
        var isSetPassword = this.state.setPassword;
        if(u.id < 1) isSetPassword = true;

        
        var mdl_title = "Добавить пользователя";
        if(u.id > 0) mdl_title = "Изменить пользователя " + u.login;

        var login_disabled = false;
        //if(u.id > 0) login_disabled = true;

        return (
            <React.Fragment>
                <Modal open={this.state.show} onClose={ ()=>{ this.setState({show:false});} } aria-labelledby="modal-modal-title">
                    <Box>
                        <Container sx={{marginTop:"70px"}}>
                            <Paper>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{padding:"5px", borderBottom: '1px solid #ccc'}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">{mdl_title}</Typography>
                                    <Button onClick={()=>{ this.setShow(false) }}>X</Button>
                                </Stack>
                                <Box sx={{padding:"10px"}}>

                                    {/* Логин, доступ и активность пользователя */}
                                    <Grid container spacing={2} sx={{marginTop:'10px'}}>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControl>
                                                    <InputLabel htmlFor='u_login'>Логин</InputLabel>
                                                    <Input id='u_login' aria-describedby='u_login_hlp' size='small' sx={{width:"100%"}} disabled={login_disabled} value={u.login} onChange={ (e)=>{ u.login=e.target.value; this.setState({ user:u }); } } />
                                                    <FormHelperText id="u_login_hlp" sx={{color:"#880000"}}>{this.state.f_error.login_error}</FormHelperText>
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControl>
                                                    <InputLabel id="user_active_lbl">Уровень доступа</InputLabel>
                                                    <Select variant='standard' labelId='user_active_lbl' label="Уровень доступа" value={u.u_access} onChange={ (e)=>{ u.u_access = +(e.target.value); this.setState({ user:u }); } } size='small'>
                                                        <MenuItem value={10000}>Пользователь</MenuItem>
                                                        <MenuItem value={1000}>Продвинутый пользователь</MenuItem>
                                                        <MenuItem value={500}>Модератор</MenuItem>
                                                        <MenuItem value={100}>Администратор</MenuItem>
                                                        <MenuItem value={0}>Разработчик</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControlLabel label='Активность' control={<Switch checked={u.active} onChange={ (e)=>{ u.active=e.target.checked; this.setState({ user:u }); } } />} />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>



                                    {/* e-mail и его активность */}
                                    <Grid container spacing={2} sx={{marginTop:'10px'}}>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <TextField type='email' variant='standard' label="E-mail" size='small' sx={{width:"100%"}} value={u.email} onChange={ (e)=>{ u.email=e.target.value; this.setState({ user:u }); } } />
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                &nbsp;
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControlLabel label='Достоверность e-mail' control={<Switch checked={u.email_active} onChange={ (e)=>{ u.email_active=e.target.checked; this.setState({ user:u }); } } />} />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>



                                    {/* Смена пароля */}
                                    <Grid container spacing={2} sx={{marginTop:'10px'}}>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControl>
                                                    <InputLabel htmlFor='u_passw'>Пароль</InputLabel>
                                                    <Input type='password' id='u_passw' aria-describedby='u_passw_hlp' size='small' sx={{width:"100%"}} value={this.state.password1} onChange={ (e)=>{ this.setState({ password1:e.target.value }); } } />
                                                    <FormHelperText id="u_passw_hlp" sx={{color:"#880000"}}>{this.state.f_error.password_error}</FormHelperText>
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <TextField variant='standard' type='password' label="Повторить пароль" size='small' sx={{width:"100%"}} value={this.state.password2} onChange={ (e)=>{ this.setState({ password2:e.target.value }); } } />
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                            <FormGroup>
                                                <FormControlLabel label='Сменить пароль' control={<Switch checked={isSetPassword} onChange={ (e)=>{ this.setState({ setPassword:e.target.checked }); } } />} />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>


                                </Box>
                                <Box>
                                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ padding:"5px", borderTop: '1px solid #ccc' }}>
                                        <Button color="error" onClick={()=>{ this.setShow(false) }}>Отменить</Button>
                                        <Divider orientation="vertical" flexItem />
                                        <Button color="success" onClick={ ()=>{ this.on_SaveUser(); } }>Сохранить</Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Container>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }





}


