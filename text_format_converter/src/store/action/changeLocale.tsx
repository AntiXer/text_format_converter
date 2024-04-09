export function changeLocale(locale: string){
    return {
        type:'CHANGE_LOCALE',
        locale: locale
    }
}