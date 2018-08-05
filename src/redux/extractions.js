// @flow

export type EXTRACTIONS_STATE = {
    extractions: Array<string>
}

export const actionTypes: { [string]: string } = {
    ADD_EXTRACTION = "ADD_EXTRACTION"
}

type addExtraction = {
    type: actionTypes.ADD_EXTRACTION,
    value: string
}

export type Action = addExtraction;

export const ExtractionActions = {
    addExtraction: extraction => {
        return async (dispatch: Action => void) => {
            dispatch({type: actionTypes.ADD_EXTRACTION, value: extraction});
        }
    }
}

const initialState = {
    extractions: []
}

export default function reducer(
    state: EXTRACTIONS_STATE = {initialState, action: Action}
): EXTRACTIONS_STATE {
    switch( action.type){
        case actionTypes.ADD_EXTRACTION: (
            {...state,
            extractions: [...extractions, action.value]}
        )
        default:
        return state;
    }
}
