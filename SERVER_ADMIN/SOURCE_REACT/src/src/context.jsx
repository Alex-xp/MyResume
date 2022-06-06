import * as React from 'react'

export const CONTEXT = {
    /* КОНТЕКСТ ПРИЛОЖЕНИЯ */

    CurrentUser: null, // текущий пользователь после входа

    /* КОРНЕВОЙ ЭЛЕМЕНТ */
    Root: null,

    TopMenu: { // верхнее меню
        Root:null,
        active: "admin_panel"
    }, 

    /* СТРАНИЦЫ */

    /*AuthForm:{ // страница авторизации
        Root:null
    },*/

    AdminPanelPage : { // панель управления
        Root:null
    },

    UsersPanelPage : { // панель управления пользователями
        Root:null,
        UsersList:null,
        UserEditorDialog:{
            Root:null
        }
    }


};

export const AppContext = React.createContext(CONTEXT);
