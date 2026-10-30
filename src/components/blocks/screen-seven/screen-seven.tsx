"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Core content eka wenama component ekakata gannawa Suspense ekka use karanna lesi wenna
function ScreenSevenContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("name") || "Dear Guest";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: guestName,
    attendance: "",
    guests: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: guestName }));
  }, [guestName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // METHANATA OYAGE WEB APP URL EKA DANNA
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyJ5RqOxZzKGliYgDyOy9sBqFH3NcnzTuYieDs6bjD3AeLr0Ys4Y_1ffSSbj-6NhwfQ2Q/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      setFormData({ name: "", attendance: "", guests: "" });

      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error!", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="backgroundLayer">
        <img src="/img/7/background.png" alt="Card Background" />
      </div>

      <img
        src="/img/7/top-left.png"
        alt="Top Left Flower"
        className="cornerFlower topLeft"
      />
      <img
        src="/img/7/top-right.png"
        alt="Top Right Flower"
        className="cornerFlower topRight"
      />
      <img
        src="/img/7/bottom-left.png"
        alt="Bottom Left Flower"
        className="cornerFlower bottomLeft"
      />
      <img
        src="/img/7/bottom-right.png"
        alt="Bottom Right Flower"
        className="cornerFlower bottomRight"
      />

      <div className="invitationContent">
        <div className="heart-icon">
          <img src="/img/7/heart.png" alt="Card Background" />
        </div>

        <div className="coupleNames">
          <h2 className="scriptText">Jayani</h2>
          <h2 className="scriptText small">and</h2>
          <h2 className="scriptText">Kulinda</h2>
        </div>

        <div className="devider-icon">
          <img src="/img/7/wedding-line.png" alt="Card Background" />
        </div>

        <p className="requestText">
          WARMLY REQUEST THE HONOUR
          <br />
          OF THE PRESENCE OF
          <br />
        </p>

        {/* URL eken ganna nama methanata enawa */}
        <h2 className="invite-name">{guestName}</h2>

        <p className="requestText">TO CELEBRATE THEIR WEDDING ON</p>

        <div className="dateSection">
          <span className="watermark">2026</span>
          <p className="dateText">
            THE{" "}
            <span className="largeDay">
              16<sup className="superscript">TH</sup>
            </span>{" "}
            OF NOVEMBER
            <br />
            FROM 5:15 PM TO 11 PM
          </p>
        </div>

        <p className="locationText first">
          PORUWA CEREMONY
          <span className="poruwaText">
            5:50 PM <br /> Jetty Green, Waters Edge
          </span>
        </p>

        <p className="locationText">
          WEDDING RECEPTION
          <span className="poruwaText">
            Fiftykay Orchids, Waters Edge, Colombo
          </span>
        </p>

        <button className="rsvpButton" onClick={() => setIsModalOpen(true)}>
          RSVP NOW
        </button>
      </div>

      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeBtn"
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
            >
              ✕
            </button>

            {isSubmitted ? (
              <div className="successMessage">
                <div className="checkIcon">✓</div>
                <h3 className="modalTitle">Thank You!</h3>
                <p className="modalSub">
                  Your response has been saved successfully.
                </p>
              </div>
            ) : (
              <>
                <h3 className="modalTitle">Are you attending?</h3>
                <p className="modalSub">
                  Please let us know by 5th of November
                </p>

                <form onSubmit={handleRsvpSubmit} className="rsvpForm">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />

                  <select
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Will you be attending?</option>
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>

                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="Number of Guests"
                    min="1"
                    max="5"
                    required={formData.attendance === "yes"}
                  />

                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Confirm RSVP"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Main component eka (Mekai api export karanne)
export default function ScreenSeven() {
  return (
    <section className="screenSeven">
      <Suspense fallback={<div style={{ display: "none" }}>Loading...</div>}>
        <ScreenSevenContent />
      </Suspense>
    </section>
  );
}
