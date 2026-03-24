import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { MeetingProvider } from "./providers/MeetingContext";

import SearchCriteriaPage from "./pages/SearchCriteriaPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CreatorSearchDetailsPage from "./pages/CreatorSearchDetailsPage";
import ScheduleMeetingPage from "./pages/ScheduleMeetingPage";
import BrandRegistration from "./pages/BrandRegistration";
import BrandTerms from "./pages/BrandTerms";
import CreatorRegistration from "./pages/CreatorRegistration";
import CreatorTerms from "./pages/CreatorTerms";
import CreatorProfile from "./pages/CreatorProfile";
import BrandProfile from "./pages/BrandProfile";
import CampaignPage from "./pages/CampaignPage";
import MeetingRequestSubmittedPage from "./pages/MeetingRequestSubmittedPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import VirtualSessionPage from "./pages/VirtualSessionPage";
import FeedbackPage from "./pages/FeedbackPage";
import CreatorRequestsPage from "./pages/CreatorRequestsPage";
import CreatorAppointmentsPage from "./pages/CreatorAppointmentsPage";

import { UserProvider } from "./providers/UserContext";

import "@fortawesome/fontawesome-free/css/all.min.css";
import YourCampaigns from "./pages/YourCampaigns";
import BrandDetails from "./pages/BrandDetails";
import YourCreators from "./pages/YourCreators"; // Campaign & Creator Management page
import CreatorDetails from "./pages/CreatorDetails"; // Dynamic creator profile page
import MidnightHighTeaDrop from "./pages/MidnightHighTeaDrop";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import SignaturePackageProposalPage from "./pages/SignaturePackageProposalPage";
import ContentTypeSelectionPage from "./pages/ContentTypeSelectionPage";
import PostingFrequencyPage from "./pages/PostingFrequencyPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SubscriptionTiersPage from "./pages/SubscriptionTiersPage";
import ContentSKUPage from "./pages/ContentSKUPage";
import BrandBriefTemplatePage from "./pages/BrandBriefTemplatePage";
import BrandBriefCustomizePage from "./pages/BrandBriefCustomizePage";
import BrandBriefBuilderPage from "./pages/BrandBriefBuilderPage";
import SignupSuccessPage from "./pages/SignupSuccessPage";
import CreatorNichePage from "./pages/CreatorNichePage";
import CreatorHowItWorksPage from "./pages/CreatorHowItWorksPage";
import CreatorCurationPage from "./pages/CreatorCurationPage";
import CreatorApprovalPage from "./pages/CreatorApprovalPage";
import CreatorPortfolioUploadPage from "./pages/CreatorPortfolioUploadPage";
import CreatorApprovedPage from "./pages/CreatorApprovedPage";
import CreatorDashboardPage from "./pages/CreatorDashboardPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import CreatorPortfolioPage from "./pages/CreatorPortfolioPage";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminSubmissionsPage from "./pages/admin/AdminSubmissionsPage";
import AdminEventsPage from "./pages/admin/AdminEventsPage";
import BrandTimeline from "./pages/BrandTimeline";

function AppRouter() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        <Route
          path="/campaigns/midnight-high-tea"
          element={<MidnightHighTeaDrop />}
        />
        <Route
          path="/application-success"
          element={<ApplicationSuccessPage />}
        />
        <Route
          path="/signature-packages/:slug"
          element={<SignaturePackageProposalPage />}
        />
        <Route path="/creator/:id" element={<CreatorSearchDetailsPage />} />

        {/* Auth pages — redirect away if already signed in */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/brand" element={<BrandRegistration />} />
          <Route path="/signup/brand/terms" element={<BrandTerms />} />
          <Route path="/signup/creator" element={<CreatorRegistration />} />
          <Route path="/signup/creator/terms" element={<CreatorTerms />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup/business/content-types"
            element={<ContentTypeSelectionPage />}
          />
          <Route
            path="/signup/business/posting-frequency"
            element={<PostingFrequencyPage />}
          />
          <Route
            path="/signup/business/how-it-works"
            element={<HowItWorksPage />}
          />
          <Route
            path="/signup/business/subscription-tiers"
            element={<SubscriptionTiersPage />}
          />
          <Route
            path="/signup/business/content-sku"
            element={<ContentSKUPage />}
          />
          <Route path="/signup/success" element={<SignupSuccessPage />} />
          <Route
            path="/signup/business/success"
            element={<SignupSuccessPage />}
          />
          <Route path="/signup/creator/niche" element={<CreatorNichePage />} />
          <Route
            path="/signup/creator/how-it-works"
            element={<CreatorHowItWorksPage />}
          />
          <Route
            path="/signup/creator/curation"
            element={<CreatorCurationPage />}
          />
          <Route
            path="/signup/creator/portfolio"
            element={<CreatorPortfolioUploadPage />}
          />
          <Route
            path="/signup/creator/approval"
            element={<CreatorApprovalPage />}
          />
          <Route
            path="/signup/creator/approved"
            element={<CreatorApprovedPage />}
          />
        </Route>

        {/* Protected — any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={<SearchCriteriaPage />} />
          <Route path="/search/results" element={<SearchResultsPage />} />
          <Route path="/schedule/:id" element={<ScheduleMeetingPage />} />
          <Route
            path="/meeting-request-submitted"
            element={<MeetingRequestSubmittedPage />}
          />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/virtual-session" element={<VirtualSessionPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>

        {/* Protected — brand only */}
        <Route element={<ProtectedRoute allowedRoles={["brand"]} />}>
          <Route path="/brand-profile" element={<BrandProfile />} />
          <Route
            path="/brand-profile/brand-brief"
            element={<BrandBriefTemplatePage />}
          />
          <Route
            path="/brand-profile/brand-brief/builder"
            element={<BrandBriefBuilderPage />}
          />
          <Route
            path="/brand-profile/brand-brief/customize"
            element={<BrandBriefCustomizePage />}
          />
          <Route path="/brand-timeline" element={<BrandTimeline />} />
          <Route path="/your-campaigns" element={<YourCampaigns />} />
          <Route path="/brand/:id" element={<BrandDetails />} />
          <Route path="/your-creators" element={<YourCreators />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route
            path="/subscription/modify"
            element={<SubscriptionTiersPage modify />}
          />
        </Route>

        {/* Protected — creator only */}
        <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
          <Route path="/creator-profile" element={<CreatorProfile />} />
          <Route path="/creator-dashboard" element={<CreatorDashboardPage />} />
          <Route
            path="/creator-completed-tasks"
            element={<CompletedTasksPage />}
          />
          <Route path="/creator-requests" element={<CreatorRequestsPage />} />
          <Route
            path="/creator-appointments"
            element={<CreatorAppointmentsPage />}
          />
          <Route path="/creator-portfolio" element={<CreatorPortfolioPage />} />
          <Route path="/creator-profile/:id" element={<CreatorDetails />} />
        </Route>

        {/* Protected — admin only */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="submissions" element={<AdminSubmissionsPage />} />
          <Route path="events" element={<AdminEventsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MeetingProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </MeetingProvider>
    </QueryClientProvider>
  );
}

export default App;
