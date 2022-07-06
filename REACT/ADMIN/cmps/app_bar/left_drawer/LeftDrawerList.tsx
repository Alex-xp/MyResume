import React from 'react';

import { List, Divider, Typography } from "@mui/material";


interface IProps {
    children: any,
    title: string
}

interface IState {}

export class LeftDrawerList extends React.Component  <IProps, IState> {
    static defaultProps:IProps = {
        children:null,
        title:''
    };

    constructor(props:any){
        super(props);
        
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Divider />
                <Typography component="h5" sx={{padding:'10px 10px 0 20px', margin:'0'}}>{this.props.title}</Typography>
                <List sx={{padding: '0'}}>
                    {this.props.children}
                </List>
            </React.Fragment>
        );
    }
}

