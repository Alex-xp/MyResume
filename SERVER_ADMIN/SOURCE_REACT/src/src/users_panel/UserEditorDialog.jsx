import * as React from 'react'
import { AppContext } from '../context' 

import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SendAdminApi } from '../components/xdb/fetch_data';
import { UserEntity } from '../components/xdb/UserEntity';

export class UserEditorDialog extends React.Component{
    static contextType = AppContext;

    static defaultProps = {};
    
    constructor(props) {
        super(props);

        this.state = {
            user : new UserEntity(),
            show : false,
            passw2: ""
        };
    }

    componentDidMount() { this.context.UsersPanelPage.UserEditorDialog.Root = this; }

    show(){ this.setState({show:true}); }
    hide(){ this.setState({show:false}); }


    reloadUser(uid){
        if(uid === null){ // пользователь не из базы (новый)
            this.setState({user: ( new UserEntity() ), show:true});
            return;
        }

        // подгружаем пользователя из базы
        SendAdminApi("get_user", { _id: uid }, (r)=>{  
            //console.log("RES", r, uid);
            this.setState({user: ( new UserEntity().setUserObj(r.result) ), show:true, passw2:""});
        }, (err)=>{
            console.log(err.error);
            this.setState({user: ( new UserEntity().setUserObj(r.result) ), show:true, passw2:""});
        });


    }


    onSaveUser(){
        var u_obj = this.state.user;

        if(u_obj.login.trim() === "") { window.alert("Не введен логин пользователя"); return; }
        if(u_obj.email.trim() === "") { window.alert("Не введен email пользователя"); return; }

        if(u_obj.isSetPassword || u_obj._id === null){
            if(u_obj.newPassword.trim() === "") { window.alert("Не введен пароль"); return; }
            if(u_obj.newPassword.trim() !== this.state.passw2) { window.alert("Пароли не совпадают"); return; }

            u_obj.isSetPassword = true;
        }

        SendAdminApi("save_user", u_obj, (r)=>{  
            //console.log("RES", r, uid);
            this.context.UsersPanelPage.UsersList.reloadUsers(this.context.UsersPanelPage.UsersList.state.search_string);
            this.setState({ show:false });
        }, (err)=>{
            console.log(err.error);
            window.alert(err.error);
        });
    }

    render(){
        var stt_u = this.state.user;

        var cTitle = "Изменить пользователя";
        if(stt_u._id === null) { cTitle = "Добавить пользователя"; }

        var login_read_only = false;
        if(stt_u._id !== null) login_read_only = true;

        if(stt_u._id === null) stt_u.isSetPassword = true;

        var passw_style = {padding: "10px 0"}
        if(stt_u.isSetPassword) passw_style = { padding: "10px 0", backgroundColor: "#ffebeb" }

        return (
            <React.Fragment>
                <Modal show={this.state.show} onHide={()=>{this.hide()}} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>{cTitle}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>

                            <Row style={{marginBottom: "10px"}}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>login</Form.Label>
                                        <Form.Control type='text' readOnly={login_read_only} value={stt_u.login} onChange={(e)=>{ stt_u.login = e.target.value; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group>
                                        <Form.Label>Активность</Form.Label>
                                        <Form.Check type="switch" checked={stt_u.active} onChange={(e)=>{ stt_u.active = e.target.checked; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            

                            <Row style={{marginBottom: "10px"}}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>e-mail</Form.Label>
                                        <Form.Control type='email' value={stt_u.email} onChange={(e)=>{ stt_u.email = e.target.value; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group>
                                        <Form.Label>Активация e-mail</Form.Label>
                                        <Form.Check type="switch" checked={stt_u.email_active} onChange={(e)=>{ stt_u.email_active = e.target.checked; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            

                            <Row style={{marginBottom: "10px"}}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Телефон</Form.Label>
                                        <Form.Control type='tel' value={stt_u.telephone} onChange={(e)=>{ stt_u.telephone = e.target.value; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group>
                                        <Form.Label>Уровень доступа</Form.Label>
                                        <Form.Select type='text' value={stt_u.access_level} onChange={(e)=>{ stt_u.access_level = e.target.value; this.setState({ user: stt_u }); }}>
                                            <option value="0">ПОЛНЫЙ ДОСТУП</option>
                                            <option value="100">АДМИНИСТРАТОР</option>
                                            <option value="500">МОДЕРАТОР</option>
                                            <option value="1000">ПОЛЬЗОВАТЕЛЬ</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            

                            <Row style={{marginBottom: "10px"}}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Дополнительная информация</Form.Label>
                                        <Form.Control as="textarea" rows="5" value={stt_u.info} onChange={(e)=>{ stt_u.info = e.target.value; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr/>

                            <Row style={passw_style}>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label><i>(переустановка)</i></Form.Label>
                                        <Form.Check type="checkbox" label='Сменить пароль' 
                                            checked={stt_u.isSetPassword} 
                                            onChange={(e)=>{ stt_u.isSetPassword = e.target.checked; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>

                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type='password' value={stt_u.newPassword} onChange={(e)=>{stt_u.newPassword = e.target.value; this.setState({ user: stt_u }); }}/>
                                    </Form.Group>
                                </Col>

                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Повторить пароль</Form.Label>
                                        <Form.Control type='password' value={this.state.passw2} onChange={(e)=>{ this.setState({ passw2:e.target.value }); }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{this.hide()}}>Закрыть</Button>
                        <Button variant="primary" onClick={()=>{this.onSaveUser()}}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
