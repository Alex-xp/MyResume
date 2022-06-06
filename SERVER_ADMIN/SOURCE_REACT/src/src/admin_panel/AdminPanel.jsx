import * as React from 'react'
import { AppContext } from '../context' 

import { Container, Row } from 'react-bootstrap';

import { PanelCard } from './panel_card';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AdminPanel extends React.Component{

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            show: true
        };
    }

    componentDidMount() { this.context.AdminPanelPage.Root = this; }
    componentWillUnmount() { this.context.AdminPanelPage.Root = null; }

    show(){ this.setState({show:true}); }
    hide(){ this.setState({show:false}); }

    render() {

        if(!this.state.show) return (<></>);

        document.title = "Панель администрирования";

        return (
            <React.Fragment>

                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        <h2>Панель администрирования</h2>
                        <hr/>

                        <Row style={{marginBottom:"15px"}}>

                            <PanelCard title="Пользователи" active_page="users_panel">
                                <p>Управление пользователями системы</p>
                            </PanelCard>


                            <PanelCard title="тест 1" active_page="">
                                <p>Тестовая панель №1</p>
                            </PanelCard>

                            <PanelCard title="тест 2" active_page="">
                                <p>Тестовая панель №2</p>
                            </PanelCard>
                        </Row>

                        <Row style={{marginBottom:"15px"}}>
                            <PanelCard title="тест 3" active_page="">
                                <p>Тестовая панель №3</p>
                            </PanelCard>


                            <PanelCard title="тест 4" active_page="">
                                <p>Тестовая панель №4</p>
                            </PanelCard>

                            <PanelCard title="тест 5" active_page="">
                                <p>Тестовая панель №5</p>
                            </PanelCard>
                        </Row>
                        
                        {/*<FontAwesomeIcon icon={["fas", "home"]}/>*/}
                    </div>
                </Container>
            </React.Fragment>
        );
    }

}

