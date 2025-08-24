export default function Skills(){
    return (
      <section id="skills" className="section alt">
        <div className="skills">
          <h2>My Skills.</h2>
          <div className="skill-row">
            <img className="code_img" src="/images/paint-palette.png" alt="web dev" />
            <h3>Front-End Development</h3>
            <p>Proficient in JavaScript (React, Angular, NodeJS, Bootstrap), HTML/CSS, and familiar with HTML5. Experienced in building responsive and dynamic user interfaces.</p>
          </div>
          <br/>
          <div className="skill-row">
            <img className="paint_img" src="/images/web-development.png" alt="backend dev" />
            <h3>Back-End Development</h3>
            <p>Experienced with server-side technologies including Python (Flask) and Java (Maven). Skilled in database management using SQL, MySQL, NoSQL, and Amazon RDS.</p>
          </div>
          <div className="skill-row">
            <img className="code_img" src="/images/AWS.png" alt="cloud dev" />
            <h3>AWS Cloud Services</h3>
            <p>Hands-on experience with AWS services like EC2, S3, RDS, CloudFront, Lambda, API Gateway, Route53, and proficient with AWS CLI and SDK. Familiar with Docker and Media Services.</p>
          </div>
        </div>
      </section>
    );
  }
  