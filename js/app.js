//cf https://github.com/sin0light/api-kaamelott

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

  getNewQuote() {
    // API_URL : https://api.quotable.io/random
    // source : https://github.com/lukePeavey/quotable 
    const xhr = new XMLHttpRequest();

    let quote;
    xhr.addEventListener('load', () => {
      quote = JSON.parse(xhr.response);

      this.setState({
        text: quote.content,
        author: quote.author
      });
    })

    xhr.open('GET', 'https://api.quotable.io/random');
    xhr.send();
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
    }    
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<QuoteMachine />);