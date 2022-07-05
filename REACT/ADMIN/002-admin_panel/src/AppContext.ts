import React from 'react';
import { App } from './App';
import { MsgSystem } from "../../../components/msg_system/MsgSystem";

import { AdminPanel } from './AdminPanel';


// описываем тип контекста приложения
export type AppContextType = {
    app:App,
    msg_sys: MsgSystem,
    adminPanel: AdminPanel
};

// базовая инициализация контекста
export var AppContextInit:AppContextType = {
    app: null,
    msg_sys: null,
    adminPanel: null
};

// контекст приложения
export var AppContext = React.createContext<AppContextType>(AppContextInit);

