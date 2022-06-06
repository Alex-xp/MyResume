import * as React from 'react';

import { NavDropdown, Nav } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SendApi } from "../serverAPI";

export class TMUserPanel extends React.Component{

    static defaultProps = {
        active: "index",
        user: { access_level: 99999 }
    }

    constructor(props) {
        super(props);

        this.state = {};

    }



    /* Выход пользователя из системы */
    onExitUser(e){
        e.preventDefault();
        SendApi("exit_user", {}, (res)=>{
            this.setState({user: res.result});
            console.log(res, this.context);
        }, (err)=>{
            console.log(err);
            this.setState({user: err.result});
        });
    }



    render() {

        var userPanel = (<></>);
        if(this.props.user.access_level > 1000){
            userPanel = (
                <React.Fragment>
                    <Nav.Link href="/login_form">
                        <FontAwesomeIcon icon={["fas", "user"]} style={{ color: '#ffc1c1', fontSize:'18px' }} />&nbsp;
                        Вход
                    </Nav.Link>
                </React.Fragment>
                
            );
        }else{
            userPanel = (
                <React.Fragment>
                    <NavDropdown active={false} className='fa-solid fa-user' title={this.props.user.login}>
                        <NavDropdown.Item active={false} href="/exit">Выход</NavDropdown.Item>
                    </NavDropdown>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Nav>
                    {userPanel}
                </Nav>
            </React.Fragment>
        );
    }
}
