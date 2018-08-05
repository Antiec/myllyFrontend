// @flow

export type COFFEES_STATE = {
    coffees: Array<string>
}

export const actionTypes: { [string]: string } = {
    ADD_COFFEE = "ADD_COFFEE"
}

type addCoffee = {
    type: actionTypes.ADD_COFFEE,
    value: string
}

export type Action = addCoffee;

export const CoffeeActions = {
    addCoffee: coffee => {
        return async (dispatch: Action => void) => {
            dispatch({type: actionTypes.ADD_COFFEE, value: coffee});
        }
    }
}

const initialState = {
    coffees: []
}

export default function reducer(
    state: EXTRACTIONS_STATE = {initialState, action: Action}
): EXTRACTIONS_STATE {
    switch( action.type){
        case actionTypes.ADD_COFFEE: (
            {...state,
            coffees: [...coffees, action.value]}
        )
        default:
        return state;
    }
}
