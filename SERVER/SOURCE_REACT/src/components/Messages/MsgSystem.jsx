import * as React from 'react';

import { Container, Navbar, Nav, Alert, Button } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Msg extends React.Component {

    static defaultProps = { text: "" }

    constructor(props){
        super(props);
        this.state = { show: true }
    }

    render(){
        if(!this.state.show) return (<></>);
        return (<Alert type="info"><Button onClick={()=>{this.setState({show:false})}}>X</Button> {this.props.text}</Alert>);
    }

}

export class MsgSystem  extends React.Component{

    static defaultProps = {
        messages: []
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() { }
    componentWillUnmount() { }

    render() {

        if(this.props.messages < 1) return (<></>);

        return (
            <React.Fragment>
                <div style={{position:"fixed", bottom:0, right:0, zIndex:9999, width:"100%", maxWidth:"600px"}}>
                    {this.props.messages.map((e,i) => (<Msg key={"msg_"+i} text={e.text} />) )}
                </div>
            </React.Fragment>
        );
    }
}
