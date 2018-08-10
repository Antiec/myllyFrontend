// @flow

export type GRINDER_STATE = {
  grinderMoving: boolean,
  calibrationValue: number
};

export const actionTypes: { [string]: string } = {
  CALIBRATE_GRINDER: "CALIBRATE_GRINDER",
  MOVE_GRINDER_STATUS: "MOVE_GRINDER_STATUS"
};

type calibrateGrinder = {
  type: actionTypes.CALIBRATE_GRINDER,
  value: number
};

type moveGrinder = {
  type: actionTypes.MOVE_GRINDER_STATUS,
  value: boolean
};

export type Action = calibrateGrinder | moveGrinder;

export const GrinderActions = {
  calibrateGrinder: value => {
    return async (dispatch: Action => void) => {
      try {
        await fetch("http://localhost:3000/api/move", {
          method: "PUT",
          body: JSON.stringify(value),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          }
        });
        dispatch({ type: actionTypes.CALIBRATE_GRINDER, value: value });
      } catch (e) {
        console.log(e);
      }
    };
  },

  moveGrinder: value => {
    return async (dispatch: Action => void) => {
      dispatch({ type: actionTypes.MOVE_GRINDER_STATUS, value: true });
      try {
        await fetch("http://localhost:3000/api/grinder/move", {
          method: "PUT",
          body: JSON.stringify({ grinder: value }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          }
        });
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: actionTypes.MOVE_GRINDER_STATUS, value: false });
    };
  }
};

const initialState = {
  grinderMoving: false,
  calibratedValue: 0
};

export default function reducer(
  state: GRINDER_STATE = initialState,
  action: Action
): GRINDER_STATE {
  switch (action.type) {
    case actionTypes.CALIBRATE_GRINDER:
      return {
        ...state,
        calibrationValue: action.value
      };
    case actionTypes.MOVE_GRINDER_STATUS:
      return {
        ...state,
        grinderMoving: action.value
      };
    default:
      return state;
  }
}
