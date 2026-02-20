import { Route, Routes } from 'react-router';
import { Shell } from './components/Shell';
import { UserProvider } from '@sankhyatronics/sankhya-ui';
import { DynamicPage } from './pages/DynamicPage';
import { ScrollToTop } from '@sankhyatronics/sankhya-ui';

const App = () => (
  <UserProvider defaultLanguage="en" defaultTheme="light" languages={['en', 'dk']} themes={['light', 'dark', 'lavender', 'slate', 'indigo', 'emerald']} storageKeyPrefix="sam-">
    <ScrollToTop />
    <Routes>
      <Route element={<Shell />}>
        {/* Home route */}
        <Route path="/" element={<DynamicPage />} />

        {/* Dynamic route for all other pages and catch-all for 404s */}
        <Route path="/:slug" element={<DynamicPage />} />
        <Route path="*" element={<DynamicPage />} />
      </Route>
    </Routes>
  </UserProvider>
);

export default App;