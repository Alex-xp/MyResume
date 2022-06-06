import "../../scss/app.scss";

import * as React from 'react'


// Глобальный контекст приложения
import { CONTEXT, AppContext } from './context' 

import { SendApi } from "../../components/serverAPI";

import { MsgSystem } from "../../components/Messages/MsgSystem";
import { TopMenu } from '../../components/TopMenu/TopMenu';
import { InfoPage } from './InfoPage';

import { UserEntity } from '../../components/xdb/UserEntity';


import { Scene001 } from '../../components/three_scenes/Scene001';



/** КОМПОНЕНТ ПРИЛОЖЕНИЯ - БАЗА ПРИЛОЖЕНИЯ (+ шаблон по жизненному циклу компонента) */
class App extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            user: new UserEntity(),
            messages : []
        };

        SendApi("auth_user", {}, (res)=>{
            //console.log(res);
            this.setState({user: res.result, messages:res.messages});
        }, (err)=>{
            console.log(err);
            this.setState({user: err.result, messages:err.messages});
        });
    }

    /** Вызывается сразу после монтирования (то есть, вставки компонента в DOM). */
    componentDidMount() { this.context.ROOT = this; }

    /** Вызывается непосредственно перед размонтированием и удалением компонента. */
    componentWillUnmount() { this.context.ROOT = null; }

    /** Вызывается перед рендером, когда получает новые пропсы или состояние (для обновления компонента, должен вернуть true). */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true; // явный возврат false - запретит обновление компонента
    }

    render() {
        return (
            <AppContext.Provider value={ CONTEXT }>
                <Scene001/>
                <TopMenu active="index" user={this.state.user}/>
                <MsgSystem messages={this.state.messages}/>

                <InfoPage/>
                
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


