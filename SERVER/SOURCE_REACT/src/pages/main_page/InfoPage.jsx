import * as React from 'react'
import { AppContext } from './context' 

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

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
                <Container className="content">
                    <div style={{minHeight:"800px"}}>
                        <br/>
                        <hr/>
                        <h2><img src="/public/images/logo/logo_001.png" height={50}/> ООО "ЗауралСтрой"</h2>
                        <hr/>

                        <Row style={{paddingTop:"25px"}}>
                            <Col md={8}>
                                <p style={{fontWeight: "bold"}}>
                                    Мы являемся одной из ведущих компаний в областях:
                                </p>
                                <ul>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Газификации домов</li>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Установки и обслуживания котлов отопления</li>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Проектирования отопления</li>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Монтажа и обслуживания систем отопления</li>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Проектирования инжинерных конструкций и коммуникаций</li>
                                    <li style={{listStyle:'none', marginLeft:"-10px"}}><FontAwesomeIcon icon={["fas", "caret-right"]}/>&nbsp;&nbsp;Монтажа инженерных конструкций и коммуникаций</li>
                                </ul>

                                <p>
                                    Каждый проект компании, рассматривается индивидуально. Мы ищем подход к каждому клиенту и в соответствии
                                    с техническим заданием, мы предлагаем своим клиентам самые передовые и оптимальные решения.
                                    Выполняя работу, мы стремимся соответствовать уровню международного стандарта обслуживания конструкций и сооружений.
                                </p>

                                <p>
                                    У нас работают высококвалефицированные специалисты. Каждый сотрудник имеет опыт работы в своей сфере ответственности.
                                    Мы уважаем труд наших рабочих.
                                </p>
                                
                            </Col>
                            <Col md={4}><img src='/public/images/n-images/001.jpg' style={{width:"100%"}} /></Col>
                        </Row>

                        

                    </div>
                </Container>
                <FontAwesomeIcon icon={["fas", "home"]}/>
            </React.Fragment>
        );
    }

}

