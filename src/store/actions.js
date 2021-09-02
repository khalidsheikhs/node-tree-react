import {ActionTypes} from './constants';

export const setNodes = (nodes) => {
    return {
        type: ActionTypes.SET_NODES,
        payload: nodes
    }
}

export const selectNode = (node) => {
    return {
        type: ActionTypes.SELECT_NODE,
        payload: node
    }
}