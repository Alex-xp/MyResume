import * as React from 'react'
import { AppContext } from '../context' 

import { Col, Card, Button } from 'react-bootstrap';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PanelCard extends React.Component{

    static contextType = AppContext;

    static defaultProps = {
        title : "карта",
        onClick : ()=>{},
        active_page: "admin_panel"
    };

    constructor(props) {
        super(props);
    }

    onClickBtn(e){
        e.preventDefault();
        this.props.onClick();

        if(this.context.Root !== null) this.context.Root.hide_all();

        if(this.props.active_page === "users_panel"){
            if(this.context.UsersPanelPage.Root !== null) this.context.UsersPanelPage.Root.show();
        }else{
            if(this.context.AdminPanelPage.Root !== null) this.context.AdminPanelPage.Root.show();
        }

        this.context.TopMenu.active = this.props.active_page;
        this.setState({active_item: this.props.active_page});
    }

    render() {
        return (
            <Col xs={12} md={6} lg={4}>
                <Card>
                    <Card.Header><h4>{this.props.title}</h4></Card.Header>
                    <Card.Body>{this.props.children}</Card.Body>
                    <Card.Footer style={{minHeight:"35px"}}>
                        <Button variant="outline-secondary" size="sm" onClick={(e)=>{this.onClickBtn(e);}} style={{float:"right", margin: "3px"}}>Перейти к разделу</Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

}
