import * as React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




//**************************************************************************************************** */
// REACT-THREE - ИСПОЛЬЗУЕТ ХУКИ И НАВЯЗЫВАЕТ ФУНКЦИОНАЛЬНЫЙ СТИЛЬ СТАРОЙ ШКОЛЫ
// (не проблема! react хорошо работает и в функциональном стиле - просто мне удобнее оборачивать объекты в ООП)

import { useLoader, Canvas, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Box(props) {

    const gltf = useLoader(GLTFLoader, '/public/3D/scene_001.glb')

    // This reference will give us direct access to the mesh
    const mesh = React.useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.y += 0.05*delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh {...props} ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    )
}
//**************************************************************************************************** */



export class Scene001 extends React.Component{

    static defaultProps = {}

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() { }
    componentWillUnmount() { }

    render() {

        return (
            <React.Fragment>
                <div className='bg0' style={{height:"25px", color:"#d7d7d7", fontFamily:"monospace"}}>
                    <Container>
                        <div style={{float:"right"}}><b><i>ООО "ЗауралСтрой"</i></b> 640022, г. Курган ул. Карла-Маркса д. 30, офис 505 тел: +7 000-000-00-00</div>
                    </Container>
                </div>
                <Container className='content'>

                    <Row>
                        <Col md={3} style={{padding:"10px"}}>
                            <h6>Описание направлений: <span style={{fontStyle:"italic", fontSize:"10px"}}>(краткое)</span></h6>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Газовые котлы</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Установка и проектирование</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Промывка систем отопления</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Испытание систем отопления</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Подготовка к отопительному сезону</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Проектировка инженерных конструкций</Button>
                            <Button variant="outline-secondary" size='sm' style={{width:"100%", marginBottom: "5px"}}>Монтаж инженерных конструкций</Button>
                            
                        </Col>

                        <Col>
                            <Canvas style={{backgroundColor:"#ffffff", height:"300px"}}>
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                <Box  position={[0, -4, -3]}/>
                            </Canvas>
                        </Col>
                    </Row>


                    
                </Container>
            </React.Fragment>
        );
    }

}
