/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Стандартизированная строка поиска (общий компонент)
 */

import React from 'react';


import { Box, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    onFind:(txt?:string)=>void
}

interface IState {
    search_value: string
}

export class FindField extends React.Component <IProps, IState> {

    static defaultProps = {
        onFind:()=>{}
    }

    constructor(props:any){
        super(props);

        this.state = {
            search_value: ""
        };

        // SendApi('current_user', {}, (res)=>{ this.setState({user: res.user}); this.context.current_user = res.user; return true; }, (err)=>{ return true; });
    }

    componentDidMount(): void {}

    componentWillUnmount(): void {}

    render():React.ReactNode{
        return(
            <React.Fragment>
                <TextField label="Поиск" variant="standard" size="small" 
                    sx={{width:"400px"}}
                    InputProps={{ startAdornment:<InputAdornment position="start"><SearchIcon/></InputAdornment> }} 
                    value={this.state.search_value}
                    onChange={(e)=>{ this.setState({search_value:e.target.value}); this.props.onFind(e.target.value); }}
                />
            </React.Fragment>
        );
    }

}

