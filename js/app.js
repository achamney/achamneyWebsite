//import * as game from "./game.js"
let mainBox = "dc824c26-43d3-11ed-8d79-0ae52db41295";
class App extends React.Component {
	constructor(props) {
		super(props);
		let state = { gameList: [], tab: 0};
    this.submit = this.submit.bind(this);
    this.changeTab = this.changeTab.bind(this);
		this.state = state;
		window.makeGames = async function() {
			var baba = await netService.make({name:"Baba is You"});
			var space = await netService.make({name:"Space Chem"});
			var hanabi = await netService.make({name:"Hanabi"});
			var bridge = await netService.make({name:"Bridge"});
			state.gameList.push(baba);
			state.gameList.push(space);
			state.gameList.push(hanabi);
			state.gameList.push(bridge);
			netService.set(state, state._id);
		}
	}
  componentDidMount() {
		this.getGames();
	}
	changeTab() {
		this.setState({tab:this.state.tab == 1 ? 0 : 1});
		console.log(this.state.tab);
	}
	submit() {
		this.refs.forEach(r=>r.current.updateGame());
	}
	async getGames() {
		let games = await netService.get(mainBox);
		let refs = [];
		this.refs = refs;
		games.gameList.forEach(g=>{
			let gameCopy = {...g};
			refs.push(React.createRef());
			g.ref = refs[refs.length-1];
			g.game = gameCopy;
		});
		this.setState({ gameList: games.gameList });
	}
	render() {
    return <div className="appBody">
				<Backdrop />
				<div className="gameContentDisplay">
				{this.state.gameList.map(g=>(
					<Game game={g.game} key={g._id} ref={g.ref} tab={this.state.tab}/>
				))}
				</div>
				<button onClick={this.changeTab}>Tab</button>
				<button onClick={this.submit} style={{display:this.state.tab == 0?"none":"block"}}>Submit</button>
			</div>
  }
}
