
class Backdrop extends React.Component {
  render() {
    return <div className="backContainer">
      <div className="backdrop">
        <img src="images/backdrop.png" className="flex2"/>
        <div className={`backtext flex1`}>
          <p className="backname">Hi, I'm Austin.</p>
          <p className="backdesc">I build scalable, reactive websites.</p>
        </div>
      </div>
    </div>
  }
}
