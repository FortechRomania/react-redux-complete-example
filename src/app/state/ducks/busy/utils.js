export function actionShouldBlock( meta ) {
    return !meta || !meta.async || !meta.blocking;
}

export function actionFinished ( type ) {
    return type.includes( "_COMPLETED" ) || type.includes( "_FAILED" );
}
