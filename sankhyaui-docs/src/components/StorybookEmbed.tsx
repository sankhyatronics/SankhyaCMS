import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface StorybookEmbedProps {
    id: string;
    title?: string;
    height?: string;
    viewMode?: 'story' | 'docs';
}

const StorybookEmbed: React.FC<StorybookEmbedProps> = ({
    id,
    title = 'Storybook Component',
    height = '300px',
    viewMode = 'story'
}) => {
    const { colorMode } = useColorMode();
    const baseUrl = 'https://sankhyaui-stories.sankhyatronics.com/iframe.html';
    const theme = colorMode === 'dark' ? 'Dark' : 'Light';
    const src = `${baseUrl}?id=${id}&viewMode=${viewMode}&shortcuts=false&singleStory=true&globals=theme:${theme}`;

    return (
        <iframe
            src={src}
            width="100%"
            height={height}
            title={title}
            style={{ border: '1px solid #eee', borderRadius: '8px' }}
        />
    );
};

export default StorybookEmbed;
