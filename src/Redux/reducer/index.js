const initialState = {
    allBooks: [],
    allCopias: [],
    allLectores: [],
    allPrestamos: [],
    allMultas: [],
    copiasDisponibles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_BOOKS":
            return {
                ...state,
                allBooks: action.payload,
            };
        case "GET_ALL_COPIAS":
            return {
                ...state,
                allCopias: action.payload,
            };
        case "GET_ALL_LECTORES":
            return {
                ...state,
                allLectores: action.payload,
            };
        case "GET_ALL_PRESTAMOS":
            return {
                ...state,
                allPrestamos: action.payload,
            };
        case "GET_ALL_MULTAS":
            return {
                ...state,
                allMultas: action.payload,
            };
        case "GET_DISPONIBLES":
            return {
                ...state,
                copiasDisponibles: action.payload,
            };
        case "GET_BOOK_BY_ID":
            return {
                ...state,
                pokemonById: action.payload,
            };
        case "DELETE_ACTION":
            return {
                ...state
            };
        case "POST_ACTION":
            return {
                ...state
            };
        case "EDIT_ACTION":
            return {
                ...state
            };
        default: return state;
    };
};

export default rootReducer;