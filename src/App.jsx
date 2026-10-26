import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider }    from "components/features/auth/context/AuthContext";
import { ToastProvider }  from "components/ui/toast/ToastContext";
import ProtectedRoute      from "components/features/auth/components/ProtectedRoute";
import AdminLayout         from "layouts/admin";
import StaffLayout         from "layouts/staff";
import BeneficiaryLayout   from "layouts/beneficiary";
import AuthLayout          from "layouts/auth";
import PublicLayout        from "layouts/public";
import StyleGuidePage      from "views/public/styleGuide";
import { CLIENTS }         from "components/features/styleGuide/constants/clients";

// While true, client UI templates are the only reachable pages (zylen-lab
// mode). Set to false to restore the full site.
const STYLE_GUIDE_ONLY = true;

// One unlisted page per client: /ui-template-<client>-<year>.
// Old /style-guide links go to the Haluan template.
const uiTemplateRoutes = () => [
  ...CLIENTS.map((client) => (
    <Route key={client.id} path={client.slug} element={<StyleGuidePage client={client} />} />
  )),
  <Route key="style-guide" path="style-guide" element={<Navigate to="/ui-template-haluan-2026" replace />} />,
];

const RedirectToAuth = ({ to }) => {
  const { search } = useLocation();
  return <Navigate to={`${to}${search}`} replace />;
};

const StyleGuideOnlyRoutes = () => (
  <Routes>
    {uiTemplateRoutes()}
    {/* No index of templates on purpose — clients shouldn't discover each other. */}
    <Route path="*" element={null} />
  </Routes>
);

const App = () => (
  <ToastProvider>
  <AuthProvider>
    {STYLE_GUIDE_ONLY ? <StyleGuideOnlyRoutes /> : (
    <Routes>
      {/* Public — no auth required */}
      <Route path="auth/*" element={<AuthLayout />} />

      {/* Deep-link redirects from API emails → auth pages */}
      <Route path="reset-password"  element={<RedirectToAuth to="/auth/reset-password" />} />
      <Route path="set-password"    element={<RedirectToAuth to="/auth/reset-password" />} />

      {/* Old register URL → new /apply */}
      <Route path="register" element={<Navigate to="/apply" replace />} />

      {/* Unlisted client UI templates — standalone, no navbar/footer */}
      {uiTemplateRoutes()}

      <Route path="/*" element={<PublicLayout />} />

      {/* Protected by role */}
      <Route
        path="admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="staff/*"
        element={
          <ProtectedRoute role="staff">
            <StaffLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="beneficiary/*"
        element={
          <ProtectedRoute role="beneficiary">
            <BeneficiaryLayout />
          </ProtectedRoute>
        }
      />

    </Routes>
    )}
  </AuthProvider>
  </ToastProvider>
);

export default App;
