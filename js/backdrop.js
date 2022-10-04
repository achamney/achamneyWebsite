
class Backdrop extends React.Component {
  render() {
    return <div className="backContainer">
      <div className="backdrop">
        <img src="images/backdrop.png" width="100%"/>
        <div className="backtext">
          <p className="backname">Hi I'm Austin.</p>
          <p className="backdesc">I build scalable, reactive websites.</p>
        </div>
      </div>
      <div className="portfolioTitleContainer">
        <p>My Recent Work:</p>
      </div>
    </div>
  }
}
