import React from 'react';

import { ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";


interface IProps {
    icon:any,
    label:any,
    href:string
}

interface IState {
}

export class LeftDrawerItem extends React.Component  <IProps, IState>{

    static defaultProps:IProps = {
        icon:null,
        label: null,
        href:null
    };

    constructor(props:any){
        super(props);
        
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemButton href={this.props.href}>
                        <ListItemIcon>{this.props.icon}</ListItemIcon>
                        <ListItemText>{this.props.label}</ListItemText>
                    </ListItemButton>
                </ListItem>
            </React.Fragment>
        );
    }

} 

