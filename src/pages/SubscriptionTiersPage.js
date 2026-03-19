import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SubscriptionTiersPage.css";
import subscriptionService from "../services/subscriptionService";

const tiers = [
  {
    name: "Basic",
    value: "basic",
    price: "$499",
    description: "Perfect for getting started and building momentum.",
    content: "16 pieces of content per month",
    features: [
      "First piece of content in 48 hours",
      "1 Reel",
      "2 Posts",
      "3 Stories (set package)",
    ],
  },
  {
    name: "Mid",
    value: "mid",
    price: "$999",
    description:
      "Ideal for growing businesses looking to scale their presence.",
    content: "32 pieces of content per month",
    features: [
      "First piece of content in 48 hours",
      "4 Reels",
      "8 Posts",
      "12 Stories (set package)",
    ],
  },
  {
    name: "Pro",
    value: "pro",
    price: "$1999",
    description: "For established brands aiming for market leadership.",
    content: "60 pieces of content per month",
    features: [
      "First piece of content in 48 hours",
      "10 Reels",
      "15 Posts",
      "20 Stories (set package)",
    ],
  },
];

function SubscriptionTiersPage({ modify }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingState = location.state || {};

  const { selections } = onboardingState;

  const getInitialCount = (type) => {
    if (!selections || !selections[type]) {
      return 0;
    }
    return Object.values(selections[type]).reduce(
      (sum, count) => sum + count,
      0,
    );
  };

  const [reels, setReels] = useState(() => getInitialCount("Reel"));
  const [posts, setPosts] = useState(() => getInitialCount("Post"));
  const [stories, setStories] = useState(() => getInitialCount("Story"));

  const customPrice = useMemo(() => {
    // Updated pricing logic to match Mid ($999) and Pro ($1999) tiers
    // Mid: 4 Reels, 8 Posts, 12 Stories. Pro: 10 Reels, 15 Posts, 20 Stories.
    const price = reels * 70 + posts * 60 + stories * 20 - 1;
    return Math.max(0, price);
  }, [reels, posts, stories]);

  const [loadingTier, setLoadingTier] = useState(null);

  const handleSelectTier = async (tierValue) => {
    const customCounts =
      tierValue === "custom"
        ? { Reel: reels, Post: posts, Story: stories }
        : null;

    try {
      setLoadingTier(tierValue);
      if (modify) {
        await subscriptionService.updateSubscription(tierValue, customCounts);
        navigate("/subscription");
        alert("Subscription updated successfully!");
        return;
      }
      const { checkout_url } = await subscriptionService.subscribe(
        tierValue,
        customCounts,
      );
      window.location.href = checkout_url;
    } catch (error) {
      alert(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="subscription-tiers-page">
      <header className="onboarding-header">
        <span className="eyebrow">Choose Your Plan</span>
        <h2>Subscription Tiers</h2>
        <p>Select a plan that fits your content needs.</p>
      </header>

      <div className="tiers-grid">
        <div className="tier-card custom-tier highlighted">
          <h3>Customized</h3>
          <p>Build a plan that's perfectly tailored to your goals.</p>

          <div className="slider-group">
            <label>Reels per month: {reels}</label>
            <input
              type="range"
              min="0"
              max="30"
              value={reels}
              onChange={(e) => setReels(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <label>Posts per month: {posts}</label>
            <input
              type="range"
              min="0"
              max="30"
              value={posts}
              onChange={(e) => setPosts(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <label>Stories per month: {stories}</label>
            <input
              type="range"
              min="0"
              max="60"
              value={stories}
              onChange={(e) => setStories(Number(e.target.value))}
            />
          </div>

          <div className="custom-price">
            Your price: <span>${customPrice}/mo</span>
          </div>

          <button
            className="continue-button"
            disabled={loadingTier !== null}
            onClick={() => handleSelectTier("custom")}
          >
            {loadingTier === "custom" ? "Subscribing…" : "Select Custom"}
          </button>
        </div>

        {tiers.map((tier) => (
          <div className="tier-card small-card" key={tier.name}>
            <h3>{tier.name}</h3>
            <p className="tier-price">{tier.price}/mo</p>
            <p>{tier.description}</p>
            <strong className="tier-content-amount">{tier.content}</strong>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="continue-button"
              disabled={loadingTier !== null}
              onClick={() => handleSelectTier(tier.value)}
            >
              {loadingTier === tier.value
                ? "Subscribing…"
                : `Select ${tier.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionTiersPage;
