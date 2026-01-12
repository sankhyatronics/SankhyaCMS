export interface HeroProps {
    Title: string;
    ImageUrl?: string;
    SubTitle?: string;
    className?: string;
    ButtonText?: string;
    Link: string;
    textAlignment?: 'left' | 'center' | 'right' | 'justify';
    padding?: 'none' | 'small' | 'medium' | 'large';
}
export declare const Hero: React.FC<HeroProps>;
