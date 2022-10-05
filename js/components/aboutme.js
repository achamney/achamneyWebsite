class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="aboutMeContainer">
        <p className="flex1"><img src="images/austin.jpg"/></p>
        <p className="flex1">I am a full-stack software developer with 5 years of industry experience.
        I love working with a team, and doing deep dives into technical challenges.
         <a href="https://docs.google.com/document/d/15go8nfAld_yi7Z0GSgGnL9y2DL15N0oJD25vNhK5nWY/edit?usp=sharing" target="_blank"> See my resume</a>
        &nbsp;for more details. </p>
      </div>
  }
}
