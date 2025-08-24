export default function Certificates(){
    return (
      <section id="certs" className="section">
        <div className="container">
          <h2 className="section-title">My Certificates.</h2>
          <div className="skill-row">
            <img className="code_img" src="/images/AWS-Certified-Solutions-Architect-Associate_badge.png" alt="SAA" />
            <h3>AWS Certified Solutions Architect</h3>
            <p>AWS Certified Solutions Architect - Associate is focused on the design of cost and performance optimized solutions. This is an ideal starting point for candidates with AWS Cloud or strong on-premises IT experience. This exam does not require deep hands-on coding experience, although familiarity with basic programming concepts would be an advantage.</p>
          </div>
          <div className="skill-row">
            <img className="paint_img" src="/images/AWS-Certified-Cloud-Practitioner_badge.png" alt="CCP" />
            <h3>AWS Certified Cloud Practitioner</h3>
            <p>The AWS Certified Cloud Practitioner validates foundational, high-level understanding of AWS Cloud, services, and terminology. This is a good starting point on the AWS Certification journey for individuals with no prior IT or cloud experience switching to a cloud career or for line-of-business employees looking for foundational cloud literacy.</p>
          </div>
        </div>
      </section>
    );
  }
  