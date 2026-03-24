import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CreatorPortfolioPage.css";
import {
  useCreatorIntroVideo,
  useCreatorPortfolio,
  useUploadIntroVideo,
  useUploadPortfolio,
  useDeletePortfolioItem,
} from "../hooks/useCreator";

function CreatorPortfolioPage() {
  const { data: introVideoData, isLoading: loadingVideo } = useCreatorIntroVideo();
  const { data: portfolio = [], isLoading: loadingPortfolio } = useCreatorPortfolio();
  const uploadVideo = useUploadIntroVideo();
  const uploadPortfolio = useUploadPortfolio();
  const deleteItem = useDeletePortfolioItem();

  const videoInputRef = useRef(null);
  const portfolioInputRef = useRef(null);

  const introVideo = introVideoData?.presigned_url ?? null;
  const loading = loadingVideo || loadingPortfolio;

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadVideo.mutate(file, {
      onError: (error) => alert(error.message || "Failed to upload video."),
    });
    e.target.value = "";
  };

  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    uploadPortfolio.mutate(files, {
      onError: (error) => alert(error.message || "Failed to upload files."),
    });
    e.target.value = "";
  };

  const handleDeletePortfolioItem = (item) => {
    deleteItem.mutate(item.id, {
      onError: (error) => alert(error.message || "Failed to delete item."),
    });
  };

  if (loading) {
    return (
      <div className="portfolio-page">
        <header className="portfolio-header">
          <span className="eyebrow">Portfolio</span>
          <h2>Manage your work</h2>
        </header>
        <div className="portfolio-section">
          <div
            className="skeleton skeleton-line"
            style={{ width: 200, height: 20 }}
          />
          <div
            className="skeleton skeleton-line"
            style={{ width: "100%", height: 200, marginTop: 16 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <span className="eyebrow">Portfolio</span>
        <h2>Manage your work</h2>
        <p>Showcase your best content to attract brand collaborations.</p>
      </header>

      <section className="portfolio-section">
        <div className="section-heading">
          <h3>Intro video</h3>
          <p>A short video introducing yourself and your style to brands.</p>
        </div>

        {introVideo ? (
          <div className="intro-video-container">
            <video src={introVideo} controls className="intro-video" />
            <div className="intro-video-actions">
              <button
                className="outline-button"
                onClick={() => videoInputRef.current?.click()}
                disabled={uploadVideo.isPending}
              >
                {uploadVideo.isPending ? "Uploading..." : "Replace video"}
              </button>
            </div>
          </div>
        ) : (
          <div
            className="upload-placeholder"
            onClick={() => videoInputRef.current?.click()}
          >
            <span className="upload-icon">
              <i className="fas fa-video"></i>
            </span>
            <p>
              {uploadVideo.isPending
                ? "Uploading..."
                : "Click to upload your intro video"}
            </p>
          </div>
        )}

        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          style={{ display: "none" }}
          onChange={handleVideoUpload}
        />
      </section>

      <section className="portfolio-section">
        <div className="section-heading">
          <h3>Portfolio</h3>
          <p>Upload images and videos that showcase your best work.</p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((item) => (
            <div className="portfolio-item" key={item.id}>
              {item.file_url?.match(/\.(mp4|mov|webm)/i) ? (
                <video
                  src={item.file_url}
                  className="portfolio-media"
                  controls
                />
              ) : (
                <img
                  src={item.file_url}
                  alt="Portfolio piece"
                  className="portfolio-media"
                />
              )}
              <button
                className="portfolio-delete-btn"
                disabled={deleteItem.isPending && deleteItem.variables === item.id}
                onClick={() => handleDeletePortfolioItem(item)}
                aria-label="Delete item"
              >
                {deleteItem.isPending && deleteItem.variables === item.id ? "..." : <FontAwesomeIcon icon={faXmark} />}
              </button>
            </div>
          ))}

          <div
            className="upload-placeholder portfolio-upload-card"
            onClick={() => portfolioInputRef.current?.click()}
          >
            <span className="upload-icon">
              <i className="fas fa-plus"></i>
            </span>
            <p>{uploadPortfolio.isPending ? "Uploading..." : "Add content"}</p>
          </div>
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={portfolioInputRef}
          style={{ display: "none" }}
          onChange={handlePortfolioUpload}
        />
      </section>
    </div>
  );
}

export default CreatorPortfolioPage;
