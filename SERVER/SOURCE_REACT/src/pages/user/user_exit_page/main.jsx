import "../../../scss/app.scss";

import * as React from 'react';

// Глобальный контекст приложения
import { CONTEXT, AppContext } from './context';

import { Container, Button, Form } from 'react-bootstrap';

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
            messages : []
        };

        SendApi("exit_user", {}, (res)=>{
            console.log(res);
            this.setState({user: res.result, messages:res.messages});
        }, (err)=>{
            console.log(err);
            this.setState({user: err.result, messages:err.messages});
        });
    }

    /** Вызывается сразу после монтирования (то есть, вставки компонента в DOM). */
    componentDidMount() { }

    /** Вызывается непосредственно перед размонтированием и удалением компонента. */
    componentWillUnmount() { }

    /** Вызывается перед рендером, когда получает новые пропсы или состояние (для обновления компонента, должен вернуть true). */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true; // явный возврат false - запретит обновление компонента
    }

    render() {

        setTimeout(()=>{window.location.href="/";}, 1500);

        return (
            <AppContext.Provider value={ CONTEXT }>
                <TopMenu active="index" user={this.state.user}/>
                <MsgSystem messages={this.state.messages}/>

                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        <h1>ВЫХОД ИЗ СИСТЕМЫ</h1>
                        <p>
                            Подождите - в данный момент происходит выход из системы.
                        </p>
                        <p>
                            Через пару секунд Вы будете перенаправлены на главную страницу.
                        </p>
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
