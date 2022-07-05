import React from 'react';

import { MSG_TYPES, MsgSystem } from "../../../components/msg_system/MsgSystem";

import { AppContextType, AppContext, AppContextInit } from './AppContext';

import { AdminPanel } from './AdminPanel';



export class App extends React.Component {

    declare context: AppContextType;
    static contextType = AppContext;

    static defaultProps = {}

    public msg_ref:React.RefObject<MsgSystem> = React.createRef();

    constructor(props:any){
        super(props);
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
                <AdminPanel />
            </AppContext.Provider>
        );
    }

}

