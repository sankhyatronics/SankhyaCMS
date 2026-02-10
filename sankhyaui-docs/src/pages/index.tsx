import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import data from './en/index.json';
import { Carousel, DynamicRenderer, fetchLocalContent, Hero } from '@sankhyatronics/sankhya-ui';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useEffect, useState } from 'react';


export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      setError(null);
      try {
        // Use the page fetcher with the current language
        const result = await fetchLocalContent("index.json", { lang: 'en' });
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, []);

  const BrowserOnlyComponent = (props) => {
    return (
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          return <DynamicRenderer {...props} />;
        }}
      </BrowserOnly>
    );
  };

  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <main>
        {data?.map((section, index) => (
          <BrowserOnlyComponent
            key={index}
            config={section}
          />
        ))}
      </main>
    </Layout>
  );
}
