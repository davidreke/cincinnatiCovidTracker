import React from 'react'
import {Jumbotron} from 'reactstrap'

export default function footer() {
    return (
      <div>
        <div id="footer">
          <Jumbotron>
            <p>
              I am looking for a development position in the Cincinnati area.
              <span> </span>
              <a href="https://www.linkedin.com/in/david-reke-16129418/">
                Hire me
              </a>
            </p>
            <p>
              <a href="https://davidreke.github.io/resume-portfolio/">
                My Other Projects
              </a>
            </p>
          </Jumbotron>
        </div>
      </div>
    );
}
