import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import NodeTree from './components/NodeTree';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setNodes} from './store/actions';

function App() {
    let selectedNode = useSelector((state) => state.selectedNode);
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const addNodes = (event) => {
        let val = event.target.value;
        if(val) {
            if (isValidJSON(val)) {
                if (!Array.isArray(val)) val = "[" + val + "]";
                setError( false);
                dispatch(setNodes(JSON.parse(val)));
            } else {
                setError( true);
                dispatch(setNodes([]));
            }
        }
    };

    const isValidJSON = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }

  return (
    <>
        <Header />
        <Row className="mx-0" style={{"height": "calc(100vh - 60px)"}}>
            <Col lg={2} className="bg-black bg-opacity-75 p-3">
                <NodeTree />
            </Col>
            <Col lg={8} className="bg-black bg-opacity-25 p-3">
                <label className="fw-bold mb-3">Enter valid json below:</label>
                <textarea className="rounded-2 border-0 bg-secondary bg-opacity-25 w-100 form-control" style={{"resize": "none"}} rows={20} onChange={addNodes}></textarea>
                <div className={error ? 'd-block' : 'd-none'}>Invalid data</div>
            </Col>
            <Col lg={2} className="bg-black text-white bg-opacity-75 p-3">
                {selectedNode ? <div><h2 className="fw-normal h6 text-info"><span className="text-uppercase text-white">Selected Node:</span> {selectedNode.name}</h2>
                    <h2 className="fw-normal h6 text-info"><span className="text-uppercase text-white">Depth:</span> {selectedNode.depth}</h2></div>: "" }
            </Col>
        </Row>
    </>
  );
}

export default App;
