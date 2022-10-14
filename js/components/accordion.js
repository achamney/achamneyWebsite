class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.minimize = this.minimize.bind(this);
    this.state = {title: props.title, minimizeClass: "max"};
  }
  minimize() {
  		if (this.state.minimizeClass == "max") {
  			this.setState({minimizeClass:"min"});
  		} else {
  			this.setState({minimizeClass:"max"});
  		}
  }
  render() {
    return <div className={this.props.className}>
      <div className="portfolioTitleContainer">
        <p>{this.state.title}</p>
        <button onClick={this.minimize} className={`${this.state.minimizeClass}`}>v</button>
      </div>
      <div className={`accordionContainer ${this.state.minimizeClass}`}>
        {this.props.children}
      </div>
    </div>
  }
}
