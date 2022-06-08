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
                <Container className="content">
                    <div style={{minHeight:"800px"}}>

                        <br/>

                        <hr/>
                        <h2><img src="/public/images/logo/logo_001.png" height={50}/> О Компании</h2>
                        <hr/>
                        
                        <p>
                            Компания ЗауралСтрой - одна из ведущих компаний в областях:
                            <ul>
                                <li>Газификации домов</li>
                                <li>Установки и обслуживания котлов отопления</li>
                                <li>Проектирования отопления</li>
                                <li>Монтажа и обслуживания систем отобления</li>
                                <li>Проектирования инжинерных конструкций и коммуникаций</li>
                                <li>Монтажа инженерных конструкций и коммуникаций</li>
                            </ul> 
                        </p>

                        <p>
                            В соответствии технического задания, мы предлагаем своим клиентам самые передовые и оптимальные решения.
                            Выполняя работу, мы стремимся соответствовать уровню международного стандарта обслуживания конструкций и сооружений.
                        </p>

                    </div>
                </Container>
                <FontAwesomeIcon icon={["fas", "home"]}/>
            </React.Fragment>
        );
    }

}

