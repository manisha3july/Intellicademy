import React from "react";
import conceptImg1 from "../assets/Ai-1.jpg";
import conceptImg2 from "../assets/Ai-2.jpg";
import conceptImg3 from "../assets/Ai-3.jpg";
import conceptImg4 from "../assets/Ai-2.jpg";
import conceptImg5 from "../assets/Ai-1.jpg";
import "./AIconcepts.css";

function AIconcepts() {
  return (
    <section className="aiConcept">
      {/* Machine Learning */}
      <div className="aiconceptOuter">
        <div className="container">
          <div className="row aiconceptInner d-flex align-items-center justify-content-between">
            <div className="col-sm-4">
              <img src={conceptImg1} className="img-fluid" alt="Machine Learning" />
            </div>
            <div className="col-sm-7">
              <div className="conceptBox">
                <h3 className="mb-2">Machine Learning</h3>
                <p>
                  Unlock the potential of Machine Learning (ML) with industry-driven courses covering:
                </p>
                <ul className="list">
                  <li>✅ Supervised & Unsupervised Learning</li>
                  <li>✅ Decision Trees, SVMs, and Random Forests</li>
                  <li>✅ Model Optimization & Performance Tuning</li>
                </ul>
                <a className="btn blue_btn" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Learning */}
      <div className="aiconceptOuter">
        <div className="container">
          <div className="row aiconceptInner d-flex align-items-center justify-content-between">
            <div className="col-sm-4">
              <img src={conceptImg2} className="img-fluid" alt="Deep Learning" />
            </div>
            <div className="col-sm-7">
              <div className="conceptBox">
                <h3 className="mb-2">Deep Learning</h3>
                <p>  
                  Dive into Deep Learning and explore advanced neural networks with:
                </p>
                <ul className="list">
                  <li>✅ Convolutional Neural Networks (CNNs)</li>
                  <li>✅ Recurrent Neural Networks (RNNs) & LSTMs</li>
                  <li>✅ Transfer Learning & Model Fine-Tuning</li>
                </ul>
                <a className="btn blue_btn" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generative AI */}
      <div className="aiconceptOuter">
        <div className="container">
          <div className="row aiconceptInner d-flex align-items-center justify-content-between">
            <div className="col-sm-4">
              <img src={conceptImg3} className="img-fluid" alt="Generative AI" />
            </div>
            <div className="col-sm-7">
              <div className="conceptBox">
                <h3 className="mb-2">Generative AI</h3>
                <p>
                  Learn how to create AI-generated content with Generative AI, including:
                </p>
                <ul className="list">
                  <li>✅ Text & Image Generation (ChatGPT, DALL·E, MidJourney)</li>
                  <li>✅ GANs (Generative Adversarial Networks)</li>
                  <li>✅ AI-Powered Creativity & Automation</li>
                </ul>
                <a className="btn blue_btn" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Analytics */}
      <div className="aiconceptOuter">
        <div className="container">
          <div className="row aiconceptInner d-flex align-items-center justify-content-between">
            <div className="col-sm-4">
              <img src={conceptImg4} className="img-fluid" alt="Data Analytics" />
            </div>
            <div className="col-sm-7">
              <div className="conceptBox">
                <h3 className="mb-2">Data Analytics</h3>
                <p>
                  Discover the power of Data Analytics in decision-making with courses on:
                </p>
                <ul className="list">
                  <li>✅ Data Collection, Cleaning, and Preprocessing</li>
                  <li>✅ Statistical Analysis & Data Visualization</li>
                  <li>✅ Predictive Analytics & Business Intelligence</li>
                </ul>
                <a className="btn blue_btn" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Networks */}
      <div className="aiconceptOuter">
        <div className="container">
          <div className="row aiconceptInner d-flex align-items-center justify-content-between">
            <div className="col-sm-4">
              <img src={conceptImg5} className="img-fluid" alt="Neural Networks" />
            </div>
            <div className="col-sm-7">
              <div className="conceptBox">
                <h3 className="mb-2">Neural Networks</h3>
                <p>
                  Master the fundamentals of Neural Networks and their applications in AI:
                </p>
                <ul className="list">
                  <li>✅ Feedforward & Backpropagation Networks</li>
                  <li>✅ Convolutional & Recurrent Neural Networks</li>
                  <li>✅ AI-Powered Predictive Analytics</li>
                </ul>
                <a className="btn blue_btn" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default AIconcepts;
