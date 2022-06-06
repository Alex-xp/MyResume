import * as React from 'react'
import { AppContext } from '../context' 

import { Container, Button, Form, Alert } from 'react-bootstrap';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SendAdminApi } from '../components/xdb/fetch_data';

export class AuthForm extends React.Component{
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            show: true,
            u_login: "",
            u_password: "",
            err_msg: null
        };

        this.authData(null, null);
    }

    componentDidMount() { /*this.context.AuthForm.Root = this;*/ }

    show(){ this.setState({show:true}); }
    hide(){ this.setState({show:false}); }


    /* Попытка входа пользователя */
    onAuth(e){
        e.preventDefault();

        this.authData(this.state.u_login, this.state.u_password);
    }

    authData(_login, _password){
        // отправка данных под авторизацию пользователя
        SendAdminApi("auth_user", {login:_login, password:_password}, (res)=>{
            this.context.CurrentUser = res.result;

            if(parseInt(res.result.access_level)>500){
                //window.alert("Не достаточно прав для входа в панель управления");
                this.setState({err_msg: res.result.login + ": Не достаточно прав для входа в панель управления"});
                return;
            }
            
            if(this.context.Root !== null) {
                this.context.Root.hide_all();
                this.context.Root.updateUserdata();
            }
            
        }, (err)=>{
            if(err.error === 'COOKIES NOT FOUND') return;
            //console.log(err);
            //window.alert(err.error);
            this.setState({err_msg: err.error});
        });
    }


    render() {

        if(!this.state.show) return (<></>);

        document.title = "АВТОРИЗАЦИЯ";

        

        var error_message = (<></>);
        if(this.state.err_msg !== null) error_message = (<Alert variant='danger' style={{marginTop: "15px"}}>{this.state.err_msg}</Alert>);

        return (
            <React.Fragment>

                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        
                        <div style={{width:"100%", maxWidth:"600px", margin: "0 auto", marginTop:"50px", border:"1px solid #ccc", borderRadius:"3px", padding:"10px"}}>
                            <h4><FontAwesomeIcon icon={["fas", "user"]} style={{ color: '#000088' }} /> Авторизация пользователя</h4>
                            <hr/>
                            <Form>

                                <Form.Group style={{marginBottom:"15px"}}>
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control type="text" value={this.state.u_login} onChange={(e)=>{this.setState({u_login:e.target.value});}}/>
                                </Form.Group>

                                <Form.Group style={{marginBottom:"15px"}}>
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" value={this.state.u_password} onChange={(e)=>{this.setState({u_password:e.target.value});}}/>
                                </Form.Group>

                                <div style={{width:"100%", height:"40px"}}>
                                    <Button onClick={(e)=>{ this.onAuth(e); }} size="sm" style={{float:"right"}} >ВХОД</Button>
                                </div>
                                
                            </Form>
                            {error_message}
                        </div>
                        


                        

                    </div>
                </Container>
            </React.Fragment>
        );
    }

}
