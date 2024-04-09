import { Navigate } from "react-router-dom";

import MainLayout from "../layout/index";
import JSONParse from "../pages/json";
import BaseConverter from "../pages/converter";
import TimestampParse from "../pages/timestamp";

import UrlCoding from "../pages/coding/url";
import UTF8Coding from "../pages/coding/utf8";
import Base64Coding from "../pages/coding/base64";
import UnicodeCoding from "../pages/coding/unicode";

import { FileTextOutlined, SyncOutlined, FieldBinaryOutlined, FieldTimeOutlined } from '@ant-design/icons';

const routerItemsCN: RouterItem[] = [
    {
        path: "/",
        hidden: true,
        element: <Navigate to="/json" />
    },
    {
        path: "/",
        label: "JSON解析",
        icon: <FileTextOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "json",
                label: "JSON解析",
                key: "json",
                element: <JSONParse />
            }
        ]
    },
    {
        path: "/coding",
        label: "编码转换",
        key: "coding",
        icon: <SyncOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "url",
                label: "URL",
                key: "url",
                element: <UrlCoding />
            },
            {
                path: "unicode",
                label: "Unicode",
                key: "unicode",
                element: <UnicodeCoding />
            },
            {
                path: "utf8",
                label: "UTF-8",
                key: "utf8",
                element: <UTF8Coding />
            },
            {
                path: "base64",
                label: "Base64",
                key: "base64",
                element: <Base64Coding />
            }
        ]
    },
    {
        path: "/",
        label: "进制转换",
        icon: <FieldBinaryOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "converter",
                label: "进制转换",
                key: "converter",
                element: <BaseConverter />
            }
        ]
    },
    {
        path: "/",
        label: "时间戳转换",
        icon: <FieldTimeOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "timestamp",
                label: "时间戳转换",
                key: "timestamp",
                element: <TimestampParse />
            }
        ]
    }
];

const routerItemsEN: RouterItem[] = [
    {
        path: "/",
        hidden: true,
        element: <Navigate to="/json" />
    },
    {
        path: "/",
        label: "JSON parsing",
        icon: <FileTextOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "json",
                label: "JSON parsing",
                key: "json",
                element: <JSONParse />
            }
        ]
    },
    {
        path: "/coding",
        label: "Encoding",
        key: "coding",
        icon: <SyncOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "url",
                label: "URL",
                key: "url",
                element: <UrlCoding />
            },
            {
                path: "unicode",
                label: "Unicode",
                key: "unicode",
                element: <UnicodeCoding />
            },
            {
                path: "utf8",
                label: "UTF-8",
                key: "utf8",
                element: <UTF8Coding />
            },
            {
                path: "base64",
                label: "Base64",
                key: "base64",
                element: <Base64Coding />
            }
        ]
    },
    {
        path: "/",
        label: "Base conversion",
        icon: <FieldBinaryOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "converter",
                label: "Base conversion",
                key: "converter",
                element: <BaseConverter />
            }
        ]
    },
    {
        path: "/",
        label: "Timestamp",
        icon: <FieldTimeOutlined />,
        element: <MainLayout />,
        children: [
            {
                path: "timestamp",
                label: "Timestamp",
                key: "timestamp",
                element: <TimestampParse />
            }
        ]
    }
];

export const localeRouterItemsMap: {[key: string]: RouterItem[]} = {
    "en": routerItemsEN,
    "zh_cn": routerItemsCN
}