import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectNode} from '../store/actions';

function NodeTree(props) {
    let nodes = useSelector((state) => state.nodes);
    let selectedNode = useSelector((state) => state.selectedNode);
    const dispatch = useDispatch();

    const selectNode_ = (event) => {
        if(!event.target) return;
        dispatch(selectNode({name: event.target.innerText, depth: event.target.dataset.depth}));
    };

    const findData = (arr, term) => {
        return arr.map(node => node.children.filter(node_ => node_.name.toLowerCase() === term.toLowerCase()));
    };

    const searchNode = (event) => {
        if(!event.target.value) return;
        console.dir(findData(nodes, event.target.value));
    };

    const recursiveMap = (items, level) => {
        return items.map((item, index) => {
            return (<li key={level+index}>
                <h3 className={"h6" + (item?.name === selectedNode?.name ? ' text-info' : '')} role="button" data-depth={level} onClick={selectNode_}>{item.name}</h3>
                { item.children ? (<ul>{recursiveMap(item.children, level+1)}</ul>) : null }
            </li>)
        });
    }

    return (
        <div className="text-white">
            <input className="rounded-2 border-0 bg-secondary form-control mb-3" type="text" placeholder="Search node" onChange={searchNode} />
            { nodes ? <ul key="0">
                {recursiveMap(nodes, 0)}
            </ul> : "" }
        </div>
    );
}

export default NodeTree;