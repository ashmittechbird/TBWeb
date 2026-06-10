import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import HRMSPage from './pages/products/HRMSPage';
import CRMPage from './pages/products/CRMPage';
import ERPPage from './pages/products/ERPPage';
import DocumentManagementPage from './pages/products/DocumentManagementPage';
import PracticeManagementPage from './pages/products/PracticeManagementPage';
import VisitorManagementPage from './pages/products/VisitorManagementPage';
import LitigationManagementPage from './pages/products/LitigationManagementPage';
import EcommercePage from './pages/products/EcommercePage';
import ServicesPage from './pages/services/ServicesPage';
import AISolutionsPage from './pages/services/AISolutionsPage';
import SoftwareDevPage from './pages/services/SoftwareDevPage';
import CloudDevOpsPage from './pages/services/CloudDevOpsPage';
import AnimationPage from './pages/services/AnimationPage';
import MarketingPage from './pages/services/MarketingPage';
import MartechPage from './pages/services/MartechPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
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
  );
}
