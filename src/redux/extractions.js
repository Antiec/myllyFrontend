// @flow

export type EXTRACTIONS_STATE = {
  extractions: Array<string>,
  selectedExtraction: string
};

export const actionTypes: { [string]: string } = {
  ADD_EXTRACTION: "ADD_EXTRACTION",
  SELECT_EXTRACTION: "SELECT_EXTRACTION",
  GET_EXTRACTIONS: "GET_EXTRACTIONS"
};

type extractionType = {
  method: string,
  coffee: string,
  roastDate: date,
  extractionDate: date,
  grinder: number,
  infusionTime: number,
  infusionPressure: number,
  temperature: number,
  dose: number,
  extractionTime: number,
  weight: number,
  grade: number,
  notes: string
};

type addExtraction = {
  type: actionTypes.ADD_EXTRACTION,
  value: extractionType
};

type selectExtraction = {
  type: actionTypes.SELECT_EXTRACTION,
  value: extractionType
};

type getExtractions = {
  type: actionTypes.GET_EXTRACTIONS,
  value: extractionType[]
};

export type Action = addExtraction | selectExtraction | getExtractions;

export const ExtractionActions = {
  addExtraction: extraction => {
    return async (dispatch: Action => void) => {
      console.log(extraction);
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
      dispatch({ type: actionTypes.SELECT_EXTRACTION, value: extraction });
      dispatch({ type: actionTypes.ADD_EXTRACTION, value: extraction });
    };
  },

  getExtractions: () => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch("http://localhost:3000/api/extractions");

        if (response.ok) {
          const json = await response.json();
          dispatch({
            type: actionTypes.SELECT_EXTRACTION,
            value: json[json.length - 1]
          });
          dispatch({ type: actionTypes.GET_EXTRACTIONS, value: json });
        }
      } catch (e) {
        console.log(e);
      }
    };
  }
};

const initialState = {
  extractions: [],
  selectedExtraction: "",
  isExtractionsDataLoaded: false
};

export default function reducer(
  state: EXTRACTIONS_STATE = initialState,
  action: Action
): EXTRACTIONS_STATE {
  switch (action.type) {
    case actionTypes.ADD_EXTRACTION:
      return {
        ...state,
        extractions: [...state.extractions, action.value]
      };
    case actionTypes.GET_EXTRACTIONS:
      return {
        ...state,
        extractions: action.value,
        isExtractionsDataLoaded: true
      };
    case actionTypes.SELECT_EXTRACTION:
      return {
        ...state,
        selectedExtraction: action.value
      };
    default:
      return state;
  }
}
