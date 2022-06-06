import * as React from 'react'
import { AppContext } from './context' 

import { Container, Button, Form } from 'react-bootstrap';

import '../../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class InfoPage extends React.Component{

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() { }
    componentWillUnmount() { }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        ///////
                    </div>
                </Container>
                <FontAwesomeIcon icon={["fas", "home"]}/>
            </React.Fragment>
        );
    }

}

