import React from "react";
import "../Membership/membership.css";

const Membership = () => {
  return (
    <div className="mid-container">
      <div class="pricing-section">
        <h1 className="lg:text-4xl md:text-3xl text-3xl font-bold lg:my-5 md:my-3 my-4">
          Gym Memberships
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

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-5 my-12">
        <div className="flex ">
          <div>
            <h1 className="lg:text-4xl md:text-3xl text-3xl font-bold lg:my-5 md:my-3 my-4">
              Gym Memberships Available
            </h1>
            <div className="mb-10">
              <div className="mb-5">
                <h1 className="text-2xl font-bold mb-2 text-primary about">
                  Basic Membership
                </h1>
                <p className="text-secondary text-justify">What's included</p>
                <ul class="sc-ehCJOs kxtFDu">
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    unlimited Gym Access
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    3 training programs
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Complimentary Fitness Consultation
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    30% off drinks
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Free WiFi
                  </li>
                  {/*    <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-hiwPVj gVxsIa"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    personal Trainers
                  </li> */}
                  {/*   <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-hiwPVj gVxsIa"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Free Clothes &amp; equipments
                  </li> */}
                </ul>
              </div>

              <div className="mb-5">
                <h1 className="text-2xl font-bold text-primary about mb-2">
                  Premium Membership
                </h1>
                <p className="text-secondary text-justify">What's included</p>
                <ul class="sc-ehCJOs kxtFDu">
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    unlimited Gym Access
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    All training programs
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Complimentary Fitness Consultation
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    30% off drinks
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-nVkyK cLlJbb"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Free WiFi
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-hiwPVj gVxsIa"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    personal Trainers
                  </li>
                  <li class="sc-lcepkR ghGDnD">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      class="sc-hiwPVj gVxsIa"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Complimentary Clothes &amp; equipments
                  </li>
                </ul>
              </div>

              {/*  <div>
                <h1 className="text-2xl vision font-bold text-primary about mb-2">
                  Core Values
                </h1>
                <p className="text-secondary text-justify">
                  We envision to be a hub of health & fitness; a place people
                  can rely on to reach their goals and a platform where they can
                  share their experiences that will enlighten the path for
                  others.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
