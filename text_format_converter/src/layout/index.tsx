import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Layout, Menu } from 'antd';
import { MenuDividerType, MenuItemGroupType, MenuItemType, SubMenuType } from "antd/es/menu/hooks/useItems";

import { assemblePath } from "../utils/stringUtil";
import { localeRouterItemsMap } from "../config/routeConfig";

import {connect} from 'react-redux';
import { changeLocale } from "../store/action/changeLocale";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType;

function generateSideMenuItems(routerItems: RouterItem[]): MenuItem[] {
    let sideMenuItems: MenuItem[] = [];
    for (let routerItem of routerItems) {
        let hidden = false ? routerItem.hidden === undefined : routerItem.hidden;
        let children = routerItem.children;
        let key = routerItem.key;
        let label = routerItem.label;
        if (hidden || children === undefined || children.length === 0) {
            continue;
        }

        if (children.length === 1 && key === undefined) {
            let menuKey = children[0].key;
            let menuLabel = children[0].label;
            if (menuKey && menuLabel) {
                sideMenuItems.push(generateMenuItem(menuLabel, menuKey, routerItem.icon));
            }
        } else {
            if (key && label) {
                let sideSubMenu: MenuItem[] = [];
                for (let child of children) {
                    let childMenuKey = child.key;
                    let childMenuLabel = child.label;
                    if (childMenuKey && childMenuLabel) {
                        sideSubMenu.push(generateMenuItem(childMenuLabel, childMenuKey));
                    }
                }
                sideMenuItems.push(generateMenuItem(label, key, routerItem.icon, sideSubMenu));
            }
        }
    }

    return sideMenuItems;
}

function generateMenuItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const localeTopMenuLabelMap: {[key: string]: string} = {
    "zh_cn": "English Version",
    "en": "中文版本"
}

const localeTopMenuKeyMap: {[key: string]: string} = {
    "zh_cn": "en",
    "en": "zh_cn"
}

function MainLayout(props: any) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    
    const location = useLocation();
    const pathname = location.pathname;

    const pathKeys = pathname.split("/");
    const lastPathKey = pathKeys.length === 0 ? "" : pathKeys[pathKeys.length - 1];

    const currentPathKey = lastPathKey === "" ? "json" : lastPathKey;

    const locale = props.localeStore.locale;
    const sideMenuItems = generateSideMenuItems(localeRouterItemsMap[locale]);
    const topMenuItems: MenuItem[] = [generateMenuItem(localeTopMenuLabelMap[locale], localeTopMenuKeyMap[locale])];

    function onClickTopMenu(e : any) {
        const key = e.key;
        if (key !== locale) {
            props.changeLocale(key);
        }
    }
    
    function onSelectSideMenu(e : any) {
        navigate(assemblePath(e.keyPath, true));
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ padding: 0, background: "#002140" }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectable = {false}
                    items={topMenuItems}
                    style={{ flex: 1, minWidth: 130, float: "right", background: "#002140" }}
                    onClick={onClickTopMenu}
                />
            </Header>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu theme="dark" defaultSelectedKeys={[currentPathKey]} mode="inline" items={sideMenuItems} onSelect={onSelectSideMenu}/>
                </Sider>
                <Layout>
                    <Content style={{ margin: '10px' }}>
                        <div
                            style={{
                                padding: 24,
                                height: "100%",
                                minHeight: 360,
                                background: "white",
                                borderRadius: 8,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright ©{new Date().getFullYear()} Created by AntiXer@github.com
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);