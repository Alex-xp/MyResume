import React from 'react';

import { MSG_TYPES, MsgSystem } from "../../../components/msg_system/MsgSystem";

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { AdminAppBar } from '../../cmps/app_bar/AdminAppBar';
import { UserEntity } from '../../../components/db_data/UserEntity';
import { SendApi } from '../../../components/SendApi';

interface IProps {
}

interface IState {
    user:UserEntity
}

export class App extends React.Component <IProps, IState> {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {}

    public msg_ref:React.RefObject<MsgSystem> = React.createRef();

    constructor(props:any){
        super(props);

        this.state = {
            user:null
        };

        SendApi('current_user', {}, (res)=>{ this.setState({user: res.user}); this.context.current_user = res.user; return true; }, (err)=>{ return true; });
    }

    componentDidMount(): void {
        this.context.app = this;
        this.context.msg_sys = this.msg_ref.current;
    }

    componentWillUnmount(): void {
        this.context.app = null;
        this.context.msg_sys = null;
    }

    render():React.ReactNode{
        return(
            <AppContext.Provider value={AppContextInit}>
                <MsgSystem ref={this.msg_ref}/>
                <AdminAppBar title="Управление пользователями" user={this.state.user}/>

                <div style={{padding:"10px"}}>
                    ADMIN_PANEL
                </div>

                
            </AppContext.Provider>
        );
    }

}

