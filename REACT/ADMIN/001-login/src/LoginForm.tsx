import React from 'react';

import { AppContextType, AppContext } from './AppContext';
import { MSG_TYPES, MsgSystem } from "../../../components/msg_system/MsgSystem";

import { ApiResult, SendApi } from '../../../components/Sendapi';

import {Box, Card, CardHeader, CardContent, FormControl, FormHelperText, TextField, Button} from "@mui/material";

interface IProps {
}

interface IState {
    login: string;
    password: string;
}

export class LoginForm extends React.Component<IProps, IState>{

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps:IProps = {}

    constructor(props:any){
        super(props);

        this.state = {
            login:"",
            password:''
        }
    }

    componentDidMount(): void {
        this.context.loginForm = this;
        
    }

    componentWillUnmount(): void {
        this.context.loginForm = null;
    }

    render():React.ReactNode{
        return(
            <React.Fragment>
                <Box sx={{
                    width:"100%",
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginTop: '50px'
                }}>

                    <Card>
                        <CardHeader title="Авторизация" />
                        <CardContent>
                            <div style={{padding:"10px"}}>
                                <FormControl sx={{width:"100%"}}>
                                    <TextField label="Логин" variant="standard" size="small" sx={{width:'100%'}} value={this.state.login} onChange={(e)=>{ this.setState({login:e.target.value}); }}/>
                                    <FormHelperText>Введите логин пользователя</FormHelperText>
                                </FormControl>
                            </div>

                            <div style={{padding:"10px"}}>
                                <FormControl sx={{width:"100%"}}>
                                    <TextField type="password" label="Пароль" variant="standard" size="small" sx={{width:'100%'}} value={this.state.password} onChange={(e)=>{ this.setState({password:e.target.value}); }}/>
                                    <FormHelperText>Введите пароль пользователя</FormHelperText>
                                </FormControl>
                            </div>

                            <div style={{height:'40px', width:'100%', padding:'10px'}}>
                                <Button variant="contained" disableElevation sx={{float:'right', marginRight:'20px'}} size='small' onClick={()=>{ this.onClickButton(); }}>вход</Button>
                            </div>
                        </CardContent>
                    </Card>

                </Box>
            </React.Fragment>
        );
    }


    onClickButton(){
        //console.log(this.context);

        var args = {login:this.state.login, password:this.state.password};
        if(args.login.trim()==='' || args.password.trim() === ''){
            if(this.context.msg_sys !== null)this.context.msg_sys.addMessage(MSG_TYPES.ERROR, "Авторизация", "Не указан логин или пароль пользователя");
            return;
        }

        SendApi("login", args, (res:ApiResult)=>{
            //console.log(res);

            for(var i in res.messages){
                this.context.msg_sys.addMessage(res.messages[i].msgType, res.messages[i].msgTitle, res.messages[i].msgText);
            }

            //console.log(res.user.u_access);

            if(res.user.u_access < 101){
                setTimeout(()=>{ window.location.href = "/admin"; }, 2000);
            }else if(res.user.u_access < 99999){
                if(this.context.msg_sys !== null)this.context.msg_sys.addMessage(MSG_TYPES.WARNING, "Авторизация", "Не достаточно прав для доступа к разделу");
            }

            return true;
        }, (err:ApiResult)=>{
            console.log(err);
            return true;
        });

        //if(this.context.msg_sys !== null)this.context.msg_sys.addMessage(MSG_TYPES.INFO, "TEST MSG", "Тестовое сообщение");
    }

}

