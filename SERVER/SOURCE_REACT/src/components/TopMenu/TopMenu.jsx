import * as React from 'react';

import { Container, Navbar, Nav, Alert, Button } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TMUserPanel } from './TMUserPanel';

export class TopMenu extends React.Component{

    static defaultProps = {
        active: "index",
        user: { access_level: 99999 }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() { }
    componentWillUnmount() { }

    render() {

        var msgs = (<></>);

        return (
            <React.Fragment>
                <Navbar sticky="top">
                    <Container>

                        <Navbar.Brand href="/">
                            {/*<FontAwesomeIcon icon={["fas", "trowel-bricks"]} style={{ color: '#ffc1c1', fontSize:'18px' }} /> */}ЗС
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="zs-navbar-nav" />
                        <Navbar.Collapse id="zs-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#">Home</Nav.Link>
                            </Nav>
                            <TMUserPanel user={this.props.user}/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {msgs}

                
            </React.Fragment>
        );
    }

}

