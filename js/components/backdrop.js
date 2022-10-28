
class Backdrop extends React.Component {
  render() {
    return <div className="backContainer">
        <div className="backdrop" role="banner" aria-label="Primary banner">
          <img src="images/backdrop.png" className="flex2" alt="Banner image showing collaborative workers"/>
          <div className={`backtext flex1`}>
            <banner>
            <h1 className="backname">Hi, I'm Austin.</h1>
            <h1 className="backdesc">I build scalable, reactive websites.</h1>
            </banner>
          </div>
        </div>
    </div>
  }
}
