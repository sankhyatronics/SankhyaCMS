import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

// 1. Define a sub-component that handles the library logic
function HomeClientContent() {
  const [data, setData] = useState<any[] | null>(null);
  const [Library, setLibrary] = useState<any>(null);

  useEffect(() => {
    // 2. Dynamically import the library ONLY when the component mounts in the browser
    async function loadLibraryAndData() {
      try {
        const lib = await import('@sankhyatronics/sankhya-ui');
        setLibrary(lib);

        const result = await lib.fetchLocalContent("index.json", { lang: 'en' });
        setData(result);
      } catch (error) {
        console.error("Build-time safety catch:", error);
      }
    }
    loadLibraryAndData();
  }, []);

  if (!Library || !data) {
    return <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading content...</div>;
  }

  const { DynamicRenderer } = Library;

  return (
    <>
      {data.map((section, index) => (
        <DynamicRenderer key={index} config={section} />
      ))}
    </>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <main>
        {/* 3. Wrap the dynamic component in BrowserOnly */}
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => <HomeClientContent />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}