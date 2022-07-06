import React from 'react';
import { App } from './App';
import { MsgSystem } from "../../../components/msg_system/MsgSystem";
import { UserEntity } from '../../../components/db_data/UserEntity';


// описываем тип контекста приложения
export type AppContextType = {
    current_user:UserEntity,
    app:App,
    msg_sys: MsgSystem
};

// базовая инициализация контекста
export var AppContextInit:AppContextType = {
    current_user: null,
    app: null,
    msg_sys: null
};

// контекст приложения
export var AppContext = React.createContext<AppContextType>(AppContextInit);

