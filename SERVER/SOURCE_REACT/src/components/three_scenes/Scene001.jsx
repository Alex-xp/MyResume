import * as React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import '../awesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




//**************************************************************************************************** */
// REACT-THREE - ИСПОЛЬЗУЕТ ХУКИ И НАВЯЗЫВАЕТ ФУНКЦИОНАЛЬНЫЙ СТИЛЬ СТАРОЙ ШКОЛЫ
// (не проблема! react хорошо работает и в функциональном стиле - просто мне удобнее оборачивать объекты в ООП)

import { useLoader, Canvas, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'

function Box(props) {

    const gltf = useLoader(GLTFLoader, '/public/3D/scene_001.glb')

    // This reference will give us direct access to the mesh
    const mesh = React.useRef();
    const cam_control = React.useRef();

    // Set up state for the hovered and active state
    //const [hovered, setHover] = React.useState(false)
    //const [active, setActive] = React.useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    
    var start = true;
    
    useFrame((state, delta) => {
        //mesh.current.rotation.y += 0.05*delta

        if(start){
            start = false;
            //
            console.log(cam_control.current);
            cam_control.current.minDistance = 15;
            cam_control.current.minAzimuthAngle = -Infinity;
            cam_control.current.maxAzimuthAngle = Infinity;
        }

    });

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group>
            <mesh {...props} ref={mesh}>
                <primitive object={gltf.scene} />
            </mesh>
            <OrbitControls makeDefault minDistance={20} maxDistance={40} minPolarAngle={0.2} maxPolarAngle={1.2} minAzimuthAngle={THREE.MathUtils.degToRad(-45)} maxAzimuthAngle={THREE.MathUtils.degToRad(-45)} ref={cam_control} />
        </group>
      
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
                <Container className='content' style={{height:"300px", overflow:"clip"}}>

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
                            <Canvas style={{backgroundColor:"#e4faff", height:"300px", border: "2px solid #cccccc", borderRadius: "3px", zIndex:1}}>
                                <ambientLight />
                                <pointLight position={[-15, 15, 15]} />
                                <pointLight position={[15, 15, -15]} />
                                <perspectiveCamera position={[0, 5, -10]} lookAt={[0, 0, 0]} />
                                <Box position={[0, 0, 0]}/> 
                            </Canvas>
                            <div style={{fontStyle:"italic", fontSize:"11px", marginTop:"-24px", zIndex:999, position:"relative", float: "right", color:"#eeeeee", padding: "3px"}}>(изображение интерактивно)</div>

                            <div style={{position:"relative", zIndex:9999, top:"-300px", left: "0px", height:"auto", padding:"5px"}}>
                                ***
                            </div>
                            
                        </Col>
                    </Row>


                    
                </Container>
            </React.Fragment>
        );
    }

}
