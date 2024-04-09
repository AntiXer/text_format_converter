class RouterItem { 
    path: string;
    hidden?: boolean;
    label?: string;
    key?: string;
    icon?: React.ReactNode;
    element: React.ReactNode;
    children?: RouterItem[];
    
    constructor(path: string, hidden: boolean, label: string, key: string, icon: React.ReactNode, element: React.ReactNode, children: RouterItem[]) { 
       this.path = path;
       this.hidden = hidden;
       this.label = label;
       this.key = key;
       this.icon = icon;
       this.element = element;
       this.children = children;
    } 
 } 