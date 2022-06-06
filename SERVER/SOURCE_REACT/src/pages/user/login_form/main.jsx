import "../../../scss/app.scss";

import * as React from 'react';

// Глобальный контекст приложения
import { CONTEXT, AppContext } from './context';

import { Container, Card, Button, Form } from 'react-bootstrap';

import { SendApi } from "../../../components/serverAPI";

import { MsgSystem } from "../../../components/Messages/MsgSystem";
import { TopMenu } from '../../../components/TopMenu/TopMenu';

import { UserEntity } from '../../../components/xdb/UserEntity';

/** КОМПОНЕНТ ПРИЛОЖЕНИЯ - БАЗА ПРИЛОЖЕНИЯ (+ шаблон по жизненному циклу компонента) */
class App extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            user: new UserEntity(),
            messages : [],
            login:"",
            password:""
        };

        /*
        SendApi("exit_user", {}, (res)=>{
            console.log(res);
            this.setState({user: res.result, messages:res.messages});
        }, (err)=>{
            console.log(err);
            this.setState({user: err.result, messages:err.messages});
        });
        */
    }

    /** Вызывается сразу после монтирования (то есть, вставки компонента в DOM). */
    componentDidMount() { }

    /** Вызывается непосредственно перед размонтированием и удалением компонента. */
    componentWillUnmount() { }

    /** Вызывается перед рендером, когда получает новые пропсы или состояние (для обновления компонента, должен вернуть true). */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true; // явный возврат false - запретит обновление компонента
    }

    auth(){
        SendApi("auth_user", {login:this.state.login, password:this.state.password}, (res)=>{
            console.log(res);
            this.setState({user: res.result, messages:res.messages});
        }, (err)=>{
            console.log(err);
            this.setState({user: err.result, messages:err.messages});
        });
    }

    render() {

        if(this.state.user.access_level < 1001){
            setTimeout(()=>{ window.location.href="/"; }, 1500);
        }

        return (
            <AppContext.Provider value={ CONTEXT }>
                <TopMenu active="index" user={this.state.user}/>
                <MsgSystem messages={this.state.messages}/>

                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        <h2>Авторизация пользователя на сайте</h2>
                        <hr/>
                        
                        <Card style={{width:"100%", maxWidth:"600px", margin: "0 auto", marginTop:"60px"}}>
                            <Card.Header><h5>Авторизируйтесь или пройдите регистрацию</h5></Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group style={{marginBottom:"10px"}}>
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control type="text" value={this.state.login} onChange={(e)=>{ this.setState({login:e.target.value}) }} />
                                    </Form.Group>
                                    <Form.Group style={{marginBottom:"10px"}}>
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" value={this.state.password} onChange={(e)=>{ this.setState({password:e.target.value}) }} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <div style={{minHeight:"35px"}}>
                                    <div style={{float:"left"}}>
                                        <a href="#">Зарегистрироваться</a><br/>
                                        <a href="#">Сбросить пароль</a>
                                    </div>
                                    <Button style={{float:"right"}} size="lg" onClick={()=>{ this.auth(); }}>ВХОД</Button>
                                </div>
                            </Card.Footer>
                            
                        </Card>
                        
                        
                    </div>
                </Container>
                
            </AppContext.Provider>
        );
    }

    /** Вызывается сразу после обновления. Не вызывается при первом рендере. */
    componentDidUpdate(prevProps, prevState, snapshot) { }

}


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
