import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import * as reducers from "./ducks";
import { apiService } from "./middlewares";

export default function configureStore( initialState ) {
    const loggerMiddleware = createLogger( );
    const rootReducer = combineReducers( reducers );

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            apiService,
            loggerMiddleware,
            thunkMiddleware,
        ),
    );
}
