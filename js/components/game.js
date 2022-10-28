
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.game;
    this.state.tab = props.tab;
    this.changedesc = this.changedesc.bind(this);
    this.changeimg = this.changeimg.bind(this);
    this.changelink = this.changelink.bind(this);
  }
  componentDidUpdate(props) {
    if (this.state.tab != this.props.tab) {
      this.setState({tab : this.props.tab});
    }
  }
  componentDidMount() {
		this.getGame();
	}
	async getGame() {
		let game = await netService.get(this.state._id);
		this.setState(game);
	}
  changedesc(e) {
    this.setState({ description: e.target.value });
  }
  changeimg(e) {
    this.setState({ img: e.target.value });
  }
  changelink(e) {
    this.setState({ link: e.target.value });
  }
  updateGame() {
    netService.set(this.state, this.state._id);
  }
	render() {
    return <div className="game">
      <hr />
      <a href={this.state.link} target="_blank"><p className="game-title"> {this.state.name} </p></a>
      <div style={{display:this.state.tab == 1?"none":"block"}}>
        <a href={this.state.link} target="_blank"><img src={this.state.img} alt={"Image showing portfolio content "+this.state.name}/></a>
        <p>{this.state.description}
        </p>
      </div>
      <div style={{display:this.state.tab == 0?"none":"block"}}>
        <textarea value={this.state.img} onChange={this.changeimg}></textarea>
        <textarea value={this.state.link} onChange={this.changelink}></textarea>
        <textarea value={this.state.description} onChange={this.changedesc}>
        </textarea>
      </div>
    </div>;
  }
}
