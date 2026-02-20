export interface ComponentProps {
    [key: string]: any;
}

export interface ContentComponent {
    type: string;
    data: ComponentProps;
    children?: ContentComponent[];
    [key: string]: any; // For extra props like "data-position"
}

export interface PageSection {
    title?: string;
    data: ContentComponent;
}

export type PageContent = PageSection[];
