import * as React from 'react'
import { AppContext } from '../../context' 

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SendAdminApi } from '../xdb/fetch_data';

import { TopMenuBrand } from './brand';

export class TopMenu extends React.Component{

    static contextType = AppContext;

    static defaultProps = {
        active: "index"
    };

    constructor(props) {
        super(props);

        this.state = {
            active_item: "admin_panel"
        }
    }

    componentDidMount() { this.context.TopMenu.Root = this; }
    componentWillUnmount() { this.context.TopMenu.Root = null; }

    onClickUsersPanel(e){
        e.preventDefault();

        if(this.context.Root !== null) this.context.Root.hide_all();
        if(this.context.UsersPanelPage.Root !== null) this.context.UsersPanelPage.Root.show();

        this.context.TopMenu.active = "users_panel";
        this.setState({active_item:"users_panel"});
    }

    onExitUser(e){
        e.preventDefault();

        SendAdminApi("exit_user", {}, (res)=>{
            this.context.CurrentUser = res.result;
            this.context.Root.updateUserdata();
        }, (err)=>{
            console.log(err);
        });
    }

    render() {

        var ai = this.context.TopMenu.active;
        //console.log(this.context.TopMenu.active, ai, (ai==="users_panel"));

        return (
            <React.Fragment>
                <Navbar sticky="top">
                    <Container>
                        <TopMenuBrand />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href="#" active={(ai==="users_panel")?true:false} onClick={(e)=>{ this.onClickUsersPanel(e); }}>Пользователи</Nav.Link>

                            </Nav>

                            <Nav>
                                <NavDropdown title={this.context.CurrentUser.login}>
                                    <NavDropdown.Item href="#" onClick={(e)=>{ this.onExitUser(e); }}>Выход</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </React.Fragment>
        );
    }

}

// <i class="fa-solid fa-pen-ruler"></i>

