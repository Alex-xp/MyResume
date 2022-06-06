import * as React from 'react'
import { AppContext } from '../../context' 

import { Container, Navbar, Nav } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class TopMenuBrand extends React.Component {
    static contextType = AppContext;

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {}
    }

    onClickBrand(e){
        e.preventDefault();

        if(this.context.Root !== null) this.context.Root.hide_all();
        if(this.context.AdminPanelPage.Root !== null) this.context.AdminPanelPage.Root.show();

        this.context.TopMenu.active = "admin_panel";
        if(this.context.TopMenu.Root !== null) this.context.TopMenu.Root.setState({active_item:"admin_panel"});
    }

    render() {

        //var ai = this.context.TopMenu.active;
        //console.log(this.context.TopMenu.active, ai, (ai==="users_panel"));

        return (
            <React.Fragment>

                <Navbar.Brand href="/" onClick={(e)=>{this.onClickBrand(e);}} style={{ color: '#ffffff' }}>
                    <FontAwesomeIcon icon={["fas", "pen-ruler"]} style={{ color: '#00ffe7' }} /> AdminPanel
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </React.Fragment>
        );
    }

}
