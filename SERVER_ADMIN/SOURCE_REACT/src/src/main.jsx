import "../scss/app.scss";

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { UserEntity } from "./components/xdb/UserEntity";

import { TopMenu } from "./components/top_menu/TopMenu";

import { AuthForm } from "./auth_form/AuthForm";
import { AdminPanel } from './admin_panel/AdminPanel';
import { UsersPanel } from "./users_panel/UsersPanel";

// Глобальный контекст приложения
import { CONTEXT, AppContext } from './context' 

/** КОМПОНЕНТ ПРИЛОЖЕНИЯ - БАЗА ПРИЛОЖЕНИЯ (+ шаблон по жизненному циклу компонента) */
class App extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    // СБРОС ПОЛЬЗОВАТЕЛЯ !!!!!!!
    resetUser(){
        this.context.CurrentUser = new UserEntity();
        this.context.CurrentUser.access_level = 10000;
        this.context.CurrentUser.info = "";
        this.updateUserdata();
    }

    updateUserdata(){
        var cuser = this.context.CurrentUser;
        this.setState({user:cuser});
    }

    /** Вызывается сразу после монтирования (то есть, вставки компонента в DOM). */
    componentDidMount() { 
        this.context.Root = this; 
        if(this.context.CurrentUser === null){
            this.resetUser();
        }
    }

    /** Вызывается непосредственно перед размонтированием и удалением компонента. */
    componentWillUnmount() { this.context.Root = null; }

    /** Вызывается перед рендером, когда получает новые пропсы или состояние (для обновления компонента, должен вернуть true). */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true; // явный возврат false - запретит обновление компонента
    }

    render() {
        document.title = "Панель администрирования";

        var _AuthForm = (<AuthForm/>);
        var _TopMenu = (<></>);
        var _AdminPanel = (<></>);
        var _UsersPanel = (<></>);

        if(this.state.user === null || this.state.user.access_level > 500){ // нет входа пользователя
            this.hide_all();
            this.context.AdminPanelPage.Root == null;
            this.context.UsersPanelPage.Root == null;
        }else {

            if(this.state.user.access_level < 501) { // пользователь вошел и имеет права доступа к разделу (МОДЕРАТОР)
                _AuthForm = (<></>);
                _TopMenu = (<TopMenu />);
                _AdminPanel = (<AdminPanel/>);
            }
            
            if(this.state.user.access_level < 101) { // пользователь вошел и имеет права доступа к разделу (АДМИНИСТРАТОР)
                _UsersPanel = (<UsersPanel/>);
            }

            if(this.state.user.access_level < 11) { // пользователь вошел и имеет права доступа к разделу (ПОЛНЫЙ ДОСТУП)
            }
            
        }
        
        
        
        return (
            <AppContext.Provider value={ CONTEXT }>
                {_TopMenu}
                {_AuthForm}
                {_AdminPanel}
                {_UsersPanel}
            </AppContext.Provider>
        );
    }

    /** Вызывается сразу после обновления. Не вызывается при первом рендере. */
    componentDidUpdate(prevProps, prevState, snapshot) { }



    /**
     * Спрятать все страницы
     */
    hide_all(){
        if(this.context.AdminPanelPage.Root !== null) this.context.AdminPanelPage.Root.hide();
        if(this.context.UsersPanelPage.Root !== null) this.context.UsersPanelPage.Root.hide();
    }


}

ReactDOM.render(<App />, document.getElementById('root'));
