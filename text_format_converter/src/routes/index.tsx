import { useRoutes} from "react-router-dom";

import { localeRouterItemsMap } from "../config/routeConfig";

import {connect} from 'react-redux';
import { changeLocale } from "../store/action/changeLocale";

function GetRoutes(props: any) {
    const locale = props.localeStore.locale;
    const routes = useRoutes(localeRouterItemsMap[locale]);
    return routes;
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(GetRoutes);