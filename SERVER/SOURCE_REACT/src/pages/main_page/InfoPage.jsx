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
                        <XForm />
                    </div>
                </Container>
                <FontAwesomeIcon icon={["fas", "home"]}/>
            </React.Fragment>
        );
    }

}




/** ФОРМА ВВОДА */
class XForm extends React.Component {

    // Данный компонент использует контекст приложения (компонент найдет верхний ContextProvider и подключится к нему)
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {};
    }

    /** Отрисовка/обновление компонента */
    render() {
        return (
            <React.Fragment>
                <div style={ {minHeight:"25px", border:"1px solid #222"} }>Введенное имя: {this.context.user_name}</div>
                <XFormInputName value={this.context.user_name} form={this} />

                <hr/>

                <div>
                    <Button onClick={ (e)=>{ console.log(this.context); e.preventDefault(); } }>Вывести глобальное состояние</Button>
                </div>
            </React.Fragment>
        );
    }

}

/** ПОЛЕ ВВОДА ИМЕНИ */
class XFormInputName extends React.Component {

    // Данный компонент использует контекст приложения (компонент найдет верхний ContextProvider и подключится к нему)
    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    /** Отрисовка/обновление компонента */
    render() {
        return (
            <Form.Group>
                <Form.Label>Введите имя:</Form.Label>
                <Form.Control type="text" value={this.props.value} onChange={(e) => { 
                    this.context.user_name = e.target.value; // Устанавливаем данные контекста приложения
                    this.props.form.setState({}); // меняем состояние родительского объекта (просто заставляем его перерисоваться)
                    }} />
            </Form.Group>
        );
    }
}
