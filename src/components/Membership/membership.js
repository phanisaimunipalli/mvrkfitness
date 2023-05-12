import React from "react";
import "../Membership/membership.css";

const Membership = () => {
  return (
    <div className="mid-container">
      <div class="pricing-section">
        <h1 className="lg:text-4xl md:text-3xl text-3xl font-bold lg:my-5 md:my-3 my-4 text-white">
          Gym Memberships 🏋️
        </h1>
        <div class="pricing-column left-column">
          <h2>Basic</h2>
          <p class="price">$9.99/month</p>
          <ul>
            <li>Unlimited Gym Access</li>
            <li>24/7 customer support</li>
            <li>3 training programs</li>
            <li>Complimentary Fitness Consultation</li>
            <li>Complimentary WiFi</li>
          </ul>
          <button class="btn btn-primary">Sign up</button>
        </div>
        <div class="pricing-column right-column">
          <h2>Premium </h2>
          <p class="price">$19.99/month</p>
          <ul>
            <li>Complimentary WiFi</li>
            <li>Unlimited Gym Access</li>
            <li>24/7 customer support</li>
            <li>3 training programs</li>
            <li>Complimentary Fitness Consultation</li>
            <li>No long-term commitment</li>
            <li>Personal Trainers</li>
            <li>Complimentary Clothes & Equipments</li>
          </ul>
          <button class="btn btn-primary">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
