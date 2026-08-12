export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    status?: string;
    links?: CardLink[];
}

export interface CardLink {
    label: string;
    href: string;
    kind?: 'project' | 'github' | 'paper' | 'demo';
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}
