import React from 'react';

import { Drawer, Box, Divider } from "@mui/material";

import BallotIcon from '@mui/icons-material/Ballot';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { LeftDrawerList } from './LeftDrawerList';
import { LeftDrawerItem } from './LeftDrawerItem';

interface IProps {
    open:boolean,
    onClose:(evt?:any)=>void
}

interface IState {
}

export class LeftDrawer extends React.Component  <IProps, IState>{

    static defaultProps:IProps = {
        open:false,
        onClose:(e)=>{}
    };

    constructor(props:any){
        super(props);
        
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                {/* ******************************************************************************************************************************* */}
                {/* Drawer выпалающая панель с левого угла (выпадает и закрывается от состояния showMenu) */}
                <Drawer anchor='left' open={this.props.open} onClose={(e)=>{this.props.onClose(e); }}>
                    <Box>

                        <LeftDrawerList title='Администрирование'>
                            <LeftDrawerItem icon={<BallotIcon/>} label="Админ панель" href="/admin" />
                        </LeftDrawerList>

                        <LeftDrawerList title='Пользователи'>
                            <LeftDrawerItem icon={<SupervisedUserCircleIcon/>} label="Пользователи" href="/admin/users" />
                        </LeftDrawerList>


                        <Divider />

                    </Box>
                </Drawer>
                {/* ******************************************************************************************************************************* */}

            </React.Fragment>
        );
    }

}

