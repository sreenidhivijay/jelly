import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPage.css";
import subscriptionService from "../services/subscriptionService";

const tierDetails = {
  basic: {
    name: "Basic",
    price: "$499",
    content: "16 pieces of content per month",
  },
  mid: {
    name: "Mid",
    price: "$999",
    content: "32 pieces of content per month",
  },
  pro: {
    name: "Pro",
    price: "$1999",
    content: "60 pieces of content per month",
  },
  custom: { name: "Customized" },
};

function SubscriptionPage() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [reactivating, setReactivating] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    subscriptionService
      .getMySubscription()
      .then((data) => {
        setSubscription(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load subscription.");
      });
  }, []);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const cancelledSubscription =
        await subscriptionService.cancelSubscription();
      setSubscription(cancelledSubscription);
      setShowCancelConfirm(false);
    } catch (error) {
      alert(error.message || "Failed to cancel subscription.");
    } finally {
      setCancelling(false);
    }
  };

  const handleReactivate = async () => {
    try {
      setReactivating(true);
      const reactivatedSubscription =
        await subscriptionService.reactivateSubscription();
      setSubscription(reactivatedSubscription);
    } catch (error) {
      alert(error.message || "Failed to reactivate subscription.");
    } finally {
      setReactivating(false);
    }
  };

  if (loading || error) {
    return (
      <div className="subscription-page">
        <header className="subscription-header">
          <span className="eyebrow">Subscription</span>
          <h2>Manage your plan</h2>
        </header>
        {error && <p className="subscription-error">{error}</p>}
        <div className="subscription-card">
          <div className="subscription-card-header">
            <div>
              <div className="skeleton skeleton-line" style={{ width: 100, height: 22 }} />
              <div className="skeleton skeleton-line" style={{ width: 72, height: 24, marginTop: 8, borderRadius: 20 }} />
            </div>
            <div className="skeleton skeleton-line" style={{ width: 120, height: 28 }} />
          </div>
          <div className="subscription-details">
            <div className="detail-row">
              <div className="skeleton skeleton-line" style={{ width: 80, height: 14 }} />
              <div className="skeleton skeleton-line" style={{ width: 180, height: 14 }} />
            </div>
            <div className="detail-row">
              <div className="skeleton skeleton-line" style={{ width: 110, height: 14 }} />
              <div className="skeleton skeleton-line" style={{ width: 140, height: 14 }} />
            </div>
            <div className="detail-row">
              <div className="skeleton skeleton-line" style={{ width: 120, height: 14 }} />
              <div className="skeleton skeleton-line" style={{ width: 140, height: 14 }} />
            </div>
            <div className="detail-row">
              <div className="skeleton skeleton-line" style={{ width: 90, height: 14 }} />
              <div className="skeleton skeleton-line" style={{ width: 140, height: 14 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="subscription-page">
        <header className="subscription-header">
          <span className="eyebrow">Subscription</span>
          <h2>No active subscription</h2>
          <p>You don't have an active plan. Choose one to get started.</p>
        </header>
        <button
          className="continue-button"
          onClick={() => navigate("/signup/business/subscription-tiers")}
        >
          View Plans
        </button>
      </div>
    );
  }

  const tier = tierDetails[subscription.tier] || tierDetails.custom;
  const isCustom = subscription.tier === "custom";

  return (
    <div className="subscription-page">
      <header className="subscription-header">
        <span className="eyebrow">Subscription</span>
        <h2>Manage your plan</h2>
        <p>View and manage your current subscription.</p>
      </header>

      <div className="subscription-card">
        <div className="subscription-card-header">
          <div>
            <h3>{tier.name}</h3>
            <span className={`subscription-status ${subscription.status}`}>
              {subscription.status === "canceled" ? "Canceled" : "Active"}
            </span>
          </div>
          <div className="subscription-price">
            {isCustom ? `$${subscription.price || 0}/mo` : `${tier.price}/mo`}
          </div>
        </div>

        <div className="subscription-details">
          <div className="detail-row">
            <span className="detail-label">Content</span>
            <span className="detail-value">
              {isCustom
                ? `${(subscription.reels || 0) + (subscription.posts || 0) + (subscription.stories || 0)} pieces per month`
                : tier.content}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Reels</span>
            <span className="detail-value">{subscription.reels || 0}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Posts</span>
            <span className="detail-value">{subscription.posts || 0}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Stories</span>
            <span className="detail-value">{subscription.stories || 0}</span>
          </div>
          {subscription.current_period_end && (
            <div className="detail-row">
              <span className="detail-label">Next billing date</span>
              <span className="detail-value">
                {new Date(subscription.current_period_end).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
            </div>
          )}
          {subscription.next_payment_due && (
            <div className="detail-row">
              <span className="detail-label">Next payment due</span>
              <span className="detail-value">
                {new Date(subscription.next_payment_due).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
            </div>
          )}
          {subscription.created_at && (
            <div className="detail-row">
              <span className="detail-label">Member since</span>
              <span className="detail-value">
                {new Date(subscription.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="subscription-actions">
        <button
          className="continue-button"
          onClick={() => navigate("/subscription/modify")}
        >
          Change Plan
        </button>
        {subscription.status === "canceled" ? (
          <button
            className="outline-button success"
            disabled={reactivating}
            onClick={handleReactivate}
          >
            {reactivating ? "Reactivating..." : "Reactivate Subscription"}
          </button>
        ) : (
          <button
            className="outline-button danger"
            onClick={() => setShowCancelConfirm(true)}
          >
            Cancel Subscription
          </button>
        )}
      </div>

      {showCancelConfirm && (
        <div className="cancel-confirm-overlay" role="dialog" aria-modal="true">
          <div className="cancel-confirm-dialog">
            <h3>Cancel your subscription?</h3>
            <p>
              Your plan will remain active until the end of your current billing
              period. After that, you will lose access to your content quota.
            </p>
            <div className="cancel-confirm-actions">
              <button
                className="outline-button danger"
                disabled={cancelling}
                onClick={handleCancel}
              >
                {cancelling ? "Cancelling..." : "Yes, cancel"}
              </button>
              <button
                className="continue-button"
                onClick={() => setShowCancelConfirm(false)}
              >
                Keep my plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
