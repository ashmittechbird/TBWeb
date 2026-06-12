import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Agentation } from 'agentation';
import HomePage from './pages/HomePage';

const ProductsPage              = lazy(() => import('./pages/ProductsPage'));
const HRMSPage                  = lazy(() => import('./pages/products/HRMSPage'));
const CRMPage                   = lazy(() => import('./pages/products/CRMPage'));
const ERPPage                   = lazy(() => import('./pages/products/ERPPage'));
const DocumentManagementPage    = lazy(() => import('./pages/products/DocumentManagementPage'));
const PracticeManagementPage    = lazy(() => import('./pages/products/PracticeManagementPage'));
const VisitorManagementPage     = lazy(() => import('./pages/products/VisitorManagementPage'));
const LitigationManagementPage  = lazy(() => import('./pages/products/LitigationManagementPage'));
const EcommercePage             = lazy(() => import('./pages/products/EcommercePage'));
const AboutPage                 = lazy(() => import('./pages/AboutPage'));
const ServicesPage              = lazy(() => import('./pages/services/ServicesPage'));
const AISolutionsPage           = lazy(() => import('./pages/services/AISolutionsPage'));
const SoftwareDevPage           = lazy(() => import('./pages/services/SoftwareDevPage'));
const CloudDevOpsPage           = lazy(() => import('./pages/services/CloudDevOpsPage'));
const AnimationPage             = lazy(() => import('./pages/services/AnimationPage'));
const MarketingPage             = lazy(() => import('./pages/services/MarketingPage'));
const MartechPage               = lazy(() => import('./pages/services/MartechPage'));

const Fallback = () => (
  <div style={{ minHeight: '60vh', background: '#08080a' }} />
);

export default function App() {
  return (
    <>
      {process.env.NODE_ENV === "development" && <Agentation />}
      <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/hrms" element={<HRMSPage />} />
        <Route path="/products/crm" element={<CRMPage />} />
        <Route path="/products/erp" element={<ERPPage />} />
        <Route path="/products/document-management" element={<DocumentManagementPage />} />
        <Route path="/products/practice-management" element={<PracticeManagementPage />} />
        <Route path="/products/visitor-management" element={<VisitorManagementPage />} />
        <Route path="/products/litigation-management" element={<LitigationManagementPage />} />
        <Route path="/products/ecommerce" element={<EcommercePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai-solutions" element={<AISolutionsPage />} />
        <Route path="/services/software-development" element={<SoftwareDevPage />} />
        <Route path="/services/cloud-devops" element={<CloudDevOpsPage />} />
        <Route path="/services/animation" element={<AnimationPage />} />
        <Route path="/services/marketing" element={<MarketingPage />} />
        <Route path="/services/martech" element={<MartechPage />} />
      </Routes>
    </Suspense>
    </>
  );
}
