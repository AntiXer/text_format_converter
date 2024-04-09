function changeLocale(state = {locale: 'en'}, action: any){
    switch (action.type) {
        case 'CHANGE_LOCALE': {
            return {
                ...state,
                locale: action.locale
            }
        }
        default:
            return state;
    }
}

export default changeLocale;