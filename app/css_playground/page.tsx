
// This is an example app, used in lessons to demonstrate CSS concepts.
// slideshow shown in class:
// https://docs.google.com/presentation/d/1bC1H2q02LHipX19MC7-qNPeUKzvgz1QRovDaPVAd-Hc/
'use client';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";

export default function CSSPlayground() {
  return (
    <>
    <div id="grid-container-1" className="fullheight"> 
      <div className="large-header-css-playground center">
        css
      </div>
    </div>

    <div id="grid-container-2" className="fullheight"> 
      <div className="css-grid-upper header-css-playground center">Selectors</div>
      <div className="css-grid-lower-1 text-css-playground center"><span>Hi!</span></div>
      <div className="css-grid-lower-2 text-css-playground center"><a href="./">Home</a></div>
      <div className="css-grid-lower-3 text-css-playground center">
        <div>
        <input type="text" id="grid-container-2-text-input" placeholder="text" style={{ width: '3em' }} />
        </div>
      </div>
      <div className="css-grid-lower-4 text-css-playground center">
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
      </div>
      <div className="css-grid-lower-5 text-css-playground center">
        <p>
          1<br/>
          10<br/>
          100<br/>
        </p>
      </div>
    </div>

    <div id="grid-container-3" className="fullheight fullwidth"> 
        <div id="grid-container-3-box" className="header-css-playground">
          Box Model
        </div>
    </div>

    <div id="grid-container-4" className="fullheight fullwidth"> 
        <div className="header-css-playground">
          F
        </div>
        <div className="header-css-playground">
          L
        </div>
        <div className="header-css-playground">
          E
        </div>
        <div className="header-css-playground">
          X
        </div>
        <div className="header-css-playground">
          -
        </div>
        <div className="header-css-playground">
          B
        </div>
        <div className="header-css-playground">
          O
        </div>
        <div className="header-css-playground">
          X
        </div>
    </div>
    <div id="grid-container-5" className="fullscreen">
      <div className="div1 header-css-playground">G</div>
      <div className="div2 header-css-playground">R</div>
      <div className="div3 header-css-playground">I</div>
      <div className="div4 header-css-playground">D</div>
    </div>
    <div id="grid-container-6" className="fullheight"> 
      <div className="header-css-playground">R</div>
      <div className="header-css-playground">E</div>
      <div className="header-css-playground">S</div>
      <div className="header-css-playground">P</div>
      <div className="header-css-playground">O</div>
      <div className="header-css-playground">N</div>
      <div className="header-css-playground">S</div>
      <div className="header-css-playground">I</div>
      <div className="header-css-playground">V</div>
      <div className="header-css-playground">E</div>
    </div>
    <div id="grid-container-7" className="fullheight"> 
      <div className="css-grid-upper header-css-playground center">Animations</div>
      <div className="css-grid-lower-1 triangle-up sliding-up"></div>
      <div className="css-grid-lower-2 parallelogram skew-change"></div>
      <div className="css-grid-lower-3 triangle-down sliding-down"></div>
      <div className="css-grid-lower-4 circle bouncing"></div>
      <div className="css-grid-lower-5 square rotate"></div>
    </div>
    <div id="grid-container-8" className="fullheight"> 
      <div className="header-css-playground center">Lottie</div>
      <Lottie style={{ height: 400 }} animationData={groovyWalkAnimation} loop={true} />
    </div>
    </>
  )
}