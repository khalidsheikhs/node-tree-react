import {ActionTypes} from './constants';

const initState = {
    nodes: [],
    selectedNode: {}
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SET_NODES:
            return { ...state, nodes: action.payload };
        case ActionTypes.SELECT_NODE:
            return { ...state, selectedNode: action.payload };
        default:
            return state;
    }
}

export default reducer;