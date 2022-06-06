import * as React from 'react'
import { AppContext } from '../context' 

import { ButtonToolbar, InputGroup, FormControl, ButtonGroup, Button, Table } from 'react-bootstrap';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SendAdminApi } from '../components/xdb/fetch_data';

import { UserEditorDialog } from './UserEditorDialog';

export class UsersList extends React.Component{

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            search_string: "",
            users:[],
            query_error:null
        };
    }

    componentDidMount() { 
        this.context.UsersPanelPage.UsersList = this; 
        this.reloadUsers(this.state.search_string);
    }


    reloadUsers(search_txt){
        SendAdminApi("get_users", { query:{"login":{$regex:search_txt}}, limit:1000, sort:{"login":1}}, (r)=>{ 
            this.setState({users: r.result, query_error: r.error, search_string:search_txt});
            //console.log(r);
        }, (err)=>{ 
            console.log(err.error);
            this.setState({users: err.result, query_error: err.error, search_string:search_txt});
            //console.log(err);
        });
    }

    onClickByUser(e, elm){
        e.preventDefault();
        if(this.context.UsersPanelPage.UserEditorDialog.Root === null) return;
        this.context.UsersPanelPage.UserEditorDialog.Root.reloadUser(elm._id);
    }


    renderTableRow(elm, key){
        var a_out = (<span style={{color:"#880000"}}>НЕТ</span>);
        if(elm.active) a_out = (<span style={{color:"#008800"}}>ЕСТЬ</span>);

        var al_name = (<span style={{color:"#008800"}}>ПОЛЬЗОВАТЕЛЬ</span>);
        if(elm.access_level < 11) {
            al_name = (<span style={{color:"#880000"}}>ПОЛНЫЕ ПРАВА</span>);
        } else if(elm.access_level < 101) {
            al_name = (<span style={{color:"#c3b400"}}>АДМИНИСТРАТОР</span>);
        }else if(elm.access_level < 501) {
            al_name = (<span style={{color:"#1e00c3"}}>МОДЕРАТОР</span>);
        }
        

        return (
            <React.Fragment key={"user_t_key_"+key}>
                <tr>
                    <td><a href="#" onClick={(e)=>{ this.onClickByUser(e, elm); }}>{elm.login}</a></td>
                    <td>{a_out}</td>
                    <td>{al_name}</td>
                    <td>{elm.email}</td>
                    <td>{elm.info}</td>
                </tr>
            </React.Fragment>
        );
    }


    renderTableBody(){
        return this.state.users.map( (elm, ind)=>this.renderTableRow(elm, ind) );
    }


    render() {

        if(this.state.query_error!==null) console.log(this.state.query_error);

        return (
            <React.Fragment>

                {/* ПАНЕЛЬ ПОИСКА */}
                <div style={{marginBottom:"15px"}}>
                    <ButtonToolbar className="justify-content-between">
                        <InputGroup>
                            <FormControl type="text" value={this.state.search_string} onChange={(e)=>{ this.reloadUsers(e.target.value); }}></FormControl>
                        </InputGroup> 

                        <ButtonGroup>
                            <Button variant="secondary" onClick={()=>{
                                if(this.context.UsersPanelPage.UserEditorDialog.Root === null) return;
                                this.context.UsersPanelPage.UserEditorDialog.Root.reloadUser(null);
                                }}>
                                <FontAwesomeIcon icon={["fas", "plus"]}/> Добавить
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                {/* СПИСОК ПОЛЬЗОВАТЕЛЕЙ */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width:"150px"}}>login</th>
                            <th style={{width:"120px"}}>Активация</th>
                            <th style={{width:"200px"}}>Уровень</th>
                            <th>e-mail</th>
                            <th>info</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTableBody()}</tbody>
                </Table>

                <UserEditorDialog/>

            </React.Fragment>
        );
    }

}
