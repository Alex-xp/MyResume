import React from 'react';
import { App } from './App';
import { MsgSystem } from "../../../components/msg_system/MsgSystem";

// описываем тип контекста приложения
export type AppContextType = {
    app:App,
    msg_sys: MsgSystem
};

// базовая инициализация контекста
export var AppContextInit:AppContextType = {
    app: null,
    msg_sys: null
};

// контекст приложения
export var AppContext = React.createContext<AppContextType>(AppContextInit);

