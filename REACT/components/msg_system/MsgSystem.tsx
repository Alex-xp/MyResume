import React from 'react';
import {Box, Alert, AlertTitle, CardContent, FormControl, FormHelperText, TextField, Button} from "@mui/material";

/**
 * Описание возможных типов системных сообщений
 */
export const MSG_TYPES = {
    ERROR: "MSG_EROROR",
    SUSSCESS: "MSG_SUSSCESS",
    INFO: "MSG_INFO",
    WARNING: "MSG_WARNING"
}

/**
 * Системное сообщение
 */
 export class Message extends React.Component{

    public msgType:string;
    public msgTitle:string;
    public msgText:string;

    public state = {
        show: true
    };

    declare props:Readonly<{
        msg_type:string,
        msg_title: string,
        msg_text: string
    }>;
    static defaultProps = {
        msg_type:MSG_TYPES.INFO,
        msg_title: "",
        msg_text: ''
    }

    constructor(props:any){
        super(props);
    }

    public setShow(sh:Boolean):void{
        this.setState({show:sh});
    }

    render(): React.ReactNode{

        if(!this.state.show) return (<></>);

        if(this.props.msg_type === MSG_TYPES.ERROR){
            return (
                <React.Fragment>
                    <Alert onClose={()=>{this.setShow(false)}} severity="error" style={{marginBottom:"5px", width:"100%", boxSizing: 'border-box'}}>
                        <AlertTitle>{this.props.msg_title}</AlertTitle>
                        {this.props.msg_text}
                    </Alert>
                </React.Fragment>
            );
        }

        if(this.props.msg_type === MSG_TYPES.INFO){
            return (
                <React.Fragment>
                    <Alert onClose={()=>{this.setShow(false)}} severity="info" style={{marginBottom:"5px", width:"100%", boxSizing: 'border-box'}}>
                        <AlertTitle>{this.props.msg_title}</AlertTitle>
                        {this.props.msg_text}
                    </Alert>
                </React.Fragment>
            );
        }

        if(this.props.msg_type === MSG_TYPES.WARNING){
            return (
                <React.Fragment>
                    <Alert onClose={()=>{this.setShow(false)}} severity="warning" style={{marginBottom:"5px", width:"100%", boxSizing: 'border-box'}}>
                        <AlertTitle>{this.props.msg_title}</AlertTitle>
                        {this.props.msg_text}
                    </Alert>
                </React.Fragment>
            );
        }

        if(this.props.msg_type === MSG_TYPES.SUSSCESS){
            return (
                <React.Fragment>
                    <Alert onClose={()=>{this.setShow(false)}} severity="success" style={{marginBottom:"5px", width:"100%", boxSizing: 'border-box'}}>
                        <AlertTitle>{this.props.msg_title}</AlertTitle>
                        {this.props.msg_text}
                    </Alert>
                </React.Fragment>
            );
        }

        return (<></>);
    }

}


/**
 * СИСТЕМНЫЕ СООБЩЕНИЯ
 */
export class MsgSystem extends React.Component {
    
    /*
    declare props: Readonly<{
        messages:Array<Message>
    }>;

    static defaultProps = {
        messages: new Array<Message>()
    }
    */

    //declare state:
    public state = {
        messages: new Array<Message>()
    }

    constructor(props:any){
        super(props);
    }

    /**
     * Добавить новое системное сообщение
     * @param msg_type Тип сообщения из MSG_TYPES
     * @param msg_title Заголовок сообщения
     * @param msg_text Текст сообщения
     * 
     * @example this.context.msg_sys.addMessage(MSG_TYPES.INFO, "TEST MSG", "Тестовое сообщение");
     */
    public addMessage(msg_type:string, msg_title:string, msg_text:string){
        var msgs = this.state.messages;
        var msg = new Message(null);
        msg.msgType = msg_type;
        msg.msgTitle = msg_title;
        msg.msgText = msg_text;
        msgs.push(msg)
        this.setState({messages:msgs});
    }

    public addMessages(msgs:Array<Message>){
        this.setState({messages:msgs});
    }

    // Отрисовываем каждое сообщение
    renderMsg(msg:Message, index:number):React.ReactNode{
        return (
            <React.Fragment key={"msg__"+index}>
                <Message msg_type={msg.msgType} msg_title={msg.msgTitle} msg_text={msg.msgText} />
            </React.Fragment>
        );
    }

    render(): React.ReactNode {

        if(this.state.messages.length < 1) return(<></>);

        return (
            <React.Fragment>
                <Box sx={{
                    position: 'fixed',
                    zIndex: 9999,
                    bottom: '20px',
                    right: '20px',
                    width: '100%',
                    maxWidth: '600px',
                    boxSizing: 'border-box'
                }}>
                    {this.state.messages.map((msg, index, array)=>this.renderMsg(msg, index))}
                </Box>
                
            </React.Fragment>
        );
    }

}

