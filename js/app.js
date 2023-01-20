const QuoteContents = (props) => {
  return (
    <div className="quote-contents">
      <blockquote id="text">
        {props.text}
      </blockquote>
      <cite id="author">
        {props.author}
      </cite>
    </div>
  );
};

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: ""
    };
  }

  async getNewQuote() {

    const response = await fetch('https://kaamelott.reiter.tf/quote/random');
    const quoteData = await response.json();
    console.log(quoteData);
    this.setState({
      text: quoteData.citation,
      author: quoteData.infos.personnage
    });
  }

  handleClick = () => {
    this.getNewQuote();
  }

  componentDidMount() {
    this.getNewQuote();
  }

  render() {
    if (this.state.text !== "") {
      return (
        <div id="quote-box" className="quote-box">
          <QuoteContents text={this.state.text} author={this.state.author} />
          <div className="quote-controls">
            <a className="tweet-btn" id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank"><i className="fa-brands fa-twitter fa-2x"></i></a>
            <button className="new-quote-btn" id="new-quote" onClick={this.handleClick}>Get another quote</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="progress">
          <img className="loading-animation" src="../assets/loading.gif"/>
        </div>
      );
    }   
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<QuoteMachine />);
