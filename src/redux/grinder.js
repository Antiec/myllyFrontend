// @flow

export type GRINDER_STATE = {
  currentValue: number,
  calibrationValue: number
};

export const actionTypes: { [string]: string } = {
  CALIBRATE_GRINDER: "CALIBRATE_GRINDER"
};

type calibrateGrinder = {
  type: actionTypes.calibrateGrinder,
  value: number
};

export type Action = calibrateGrinder;

export const GrinderActions = {
  calibrateGrinder: value => {
    return async (dispatch: Action => void) => {
      console.log(value);
      try {
        await fetch("http://localhost:3000/api/extractions", {
          method: "POST",
          body: JSON.stringify(extraction),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
  }
};

const initialState = {
  currentValue: 0,
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

    default:
      return state;
  }
}
