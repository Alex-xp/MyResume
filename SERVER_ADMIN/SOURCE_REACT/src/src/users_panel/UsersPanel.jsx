import * as React from 'react'
import { AppContext } from '../context' 

import { Container} from 'react-bootstrap';

import '../components/awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UsersList } from './UsersList';

export class UsersPanel extends React.Component{

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    componentDidMount() { this.context.UsersPanelPage.Root = this; }
    componentWillUnmount() { this.context.UsersPanelPage.Root = null; }

    show(){ this.setState({show:true}); }
    hide(){ this.setState({show:false}); }

    render() {

        if(!this.state.show) return (<></>);

        document.title = "Управление пользователями системы";

        return (
            <React.Fragment>

                <Container>
                    <div className="content" style={{minHeight:"800px"}}>
                        <h2>Пользователи системы</h2>
                        <hr/>
                        <UsersList/>
                    </div>
                </Container>
            </React.Fragment>
        );
    }

}
