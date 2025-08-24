export default function Skills(){
    return (
      <section id="skills" className="section alt">
        <div className="skills">
          <h2>My Skills</h2>
          <div className="skill-row">
            <img className="code_img" src="/Laura_Negrin-Portfolio/images/paint-palette.png" alt="web dev" />
            <h3 className="skillSubtitle">Front-End Development</h3>
            <p>Experienced in JavaScript frameworks and libraries including React, Angular, Node.js, and Bootstrap, as well as HTML/CSS for building responsive and dynamic user interfaces.</p>
          </div>
          <br/>
          <div className="skill-row">
            <img className="paint_img" src="/Laura_Negrin-Portfolio/images/web-development.png" alt="backend dev" />
            <h3 className="skillSubtitle">Back-End Development</h3>
            <p>Experienced in server-side development with Python (Flask), PHP, and Java (Maven), and in managing databases using MySQL and Amazon RDS.</p>
          </div>
          <div className="skill-row">
            <img className="code_img" src="/Laura_Negrin-Portfolio/images/AWS.png" alt="cloud dev" />
            <h3 className="skillSubtitle">AWS Cloud Services</h3>
            <p>Hands-on experience with AWS services like EC2, S3, RDS, CloudFront, Lambda, API Gateway, Route53, and proficient with AWS CLI and SDK. Familiar with Docker and Media Services.</p>
          </div>
        </div>
      </section>
    );
  }
  