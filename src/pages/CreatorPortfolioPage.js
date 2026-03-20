import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CreatorPortfolioPage.css";
import creatorService from "../services/creatorService";

function CreatorPortfolioPage() {
  const [introVideo, setIntroVideo] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const videoInputRef = useRef(null);
  const portfolioInputRef = useRef(null);

  useEffect(() => {
    Promise.all([
      creatorService
        .getIntroVideo()
        .then(({ presigned_url }) => {
          setIntroVideo(presigned_url);
        })
        .catch(() => setIntroVideo(null)),
      creatorService
        .getPortfolio()
        .then((data) => {
          setPortfolio(data || []);
        })
        .catch(() => setPortfolio([])),
    ]).finally(() => setLoading(false));
  }, []);

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingVideo(true);
      await creatorService.uploadIntroVideo(file);
      const { presigned_url } = await creatorService.getIntroVideo();
      setIntroVideo(presigned_url);
    } catch (error) {
      alert(error.message || "Failed to upload video.");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  };

  const handlePortfolioUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      setUploadingFiles(true);
      await creatorService.uploadPortfolio(files);
      const data = await creatorService.getPortfolio();
      setPortfolio(data || []);
    } catch (error) {
      alert(error.message || "Failed to upload files.");
    } finally {
      setUploadingFiles(false);
      e.target.value = "";
    }
  };

  const handleDeletePortfolioItem = async (item) => {
    try {
      setDeletingId(item.id);
      await creatorService.deletePortfolioItem(item.id);
      setPortfolio((prev) => prev.filter((f) => f.id !== item.id));
    } catch (error) {
      alert(error.message || "Failed to delete item.");
    } finally {
      setDeletingId(null);
    }
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
                disabled={uploadingVideo}
              >
                {uploadingVideo ? "Uploading..." : "Replace video"}
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
              {uploadingVideo
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
                disabled={deletingId === item.id}
                onClick={() => handleDeletePortfolioItem(item)}
                aria-label="Delete item"
              >
                {deletingId === item.id ? "..." : <FontAwesomeIcon icon={faXmark} />}
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
            <p>{uploadingFiles ? "Uploading..." : "Add content"}</p>
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
