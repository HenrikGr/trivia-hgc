/*!
 * Description:
 *
 *
 *
 * Author:  Henrik
 * File:
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */
import React from 'react';
import Card from './card';
import Headers from './headers';


var data = [
  {
    "category": "React 101",
    "questions": [
      {
        "points": 100,
        "question": "<p>What part of your application does React focus on?</p><ol><li>The Model</li><li>The View</li><li>The Controller</li><li>All of the above</li></ol>",
        "answer": "B. The View"
      },
      {
        "points": 200,
        "question": "_____ lets you create JavaScript objects using HTML syntax",
        "answer": "JSX"
      },
      {
        "points": 300,
        "question": "What tool can you use to transpile JSX?",
        "answer": "Babel"
      },
      {
        "points": 400,
        "question": "React uses a _____________ to limit direct manipulation of the DOM and improve performance",
        "answer": "Virtual DOM"
      }
    ]
  },
  {
    "category": "React 201",
    "questions": [
      {
        "points": 100,
        "question": "<p>Where can you define a component's initial state when you use the ES6 Class syntax?</p><ol><li>getInitialState()</li><li>getInitialProps()</li><li>The component's constructor</li></ol>",
        "answer": "C. The component's constructor"
      },
      {
        "points": 200,
        "question": "Using npm, which package should you require/import in addition to 'react' to render a React component in an existing DOM element of your HTML file?",
        "answer": "react-dom"
      },
      {
        "points": 300,
        "question": "<p>Which lifecycle function should you use to set default property values?</p><ol><li>getInitialState</li><li>getInitialProps</li><li>getDefaultProps</li></ol>",
        "answer": "C. getDefaultProps"
      },
      {
        "points": 400,
        "question": "Which lifecycle method is invoked once, immediately after the initial rendering occurs?",
        "answer": "componentDidMount"
      }
    ]
  },
  {
    "category": "ES 2015",
    "questions": [
      {
        "points": 100,
        "question": "<p>Constants (const) are:</p><ol><li>Block scoped</li><li>Function scoped</li><li>Global</li></ol>",
        "answer": "A. Block scoped"
      },
      {
        "points": 200,
        "question": "Name 3 new collection classes in ES2015",
        "answer": "<ul><li>Map</li><li>WeakMap</li><li>Set</li><li>WeakSet</li></ul>"
      },
      {
        "points": 300,
        "question": "<p>What's being logged and how is this new ES6 feature called?</p><code>var colors = ['red', 'blue', 'green'];<br/>var [primary, secondary, tertiary] = colors;<br/>console.log(secondary);</code>",
        "answer": "<ul><li>blue</li><li>Array destructuring</li></ul>"
      },
      {
        "points": 400,
        "question": "<p>What's being logged and name 4 new features of ES6 used in this code snippet?</p><code>let greeting = (name, msg='Hello') => `${msg}, ${name}`;<br/>console.log(greeting('Christophe');</code>",
        "answer": "<p>Hello, Christophe</p><ul><li>let variables</li><li>Arrow functions</li><li>Default parameters</li><li>Template strings</li></ul>"
      }
    ]
  },
  {
    "category": "Feeling Lucky",
    "questions": [
      {
        "points": 100,
        "question": "Using the proposed ECMAScript module syntax, how do you load the Mortgage.js module from the current directory and make all its members available in an object named mortgage?",
        "answer": "<code>import * as mortgage from './Mortgage';</code>"
      },
      {
        "points": 200,
        "question": "What are the colors of the olympic rings?",
        "answer": "<img src='../../server/static/assets/img/olympic_rings.png'/>"
      },
      {
        "points": 300,
        "question": "What's the date of the first React commit on GitHub?",
        "answer": "May 26th, 2013"
      },
      {
        "points": 400,
        "question": "What's the hex color of the React logo?",
        "answer": "#61DAFB"
      }
    ]
  }
];


class Trivia extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        data: data
      };
  }
   
  handleResize(event) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }


  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
        
    let rows = 0;
    data.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });
    
    this.setState({data: data, rows: rows, cols: data.length});
  }

  /*
   // Traditional XHR implementation. Getting questions from data.json using XHR. Will run into cross origin issues in some browsers
   // if loading index.html from the local file system (using the file:// protocol) -->
   componentDidMount() {
     window.addEventListener('resize', this.handleResize.bind(this));
     request({url: "data.json"}).then(result => {
       let data = JSON.parse(result),
           rows = 0;
            data.forEach(category => {
                if (category.questions.length > rows) {
                    rows = category.questions.length;
                }
            });
            this.setState({data: data, rows: rows, cols: data.length});
        });
    }
    */

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    
    let headerHeight = this.state.windowWidth > 640 ? 60 : 32,
      cardWidth = this.state.windowWidth / this.state.cols,
      cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows,
      cards = [];

    this.state.data.forEach((category, categoryIndex) => {
      let left = categoryIndex * cardWidth;
      
      category.questions.forEach((question, questionIndex) => {
        cards.push(<Card left={left} top={questionIndex * cardHeight + headerHeight} height={cardHeight} width={cardWidth} question={question} key={categoryIndex + '-' + questionIndex}/>);
      })
    });
    
    return (
      <div>
        <Headers data={this.state.data} headerWidth={cardWidth}/>
        {cards}
      </div>
    );
  }
}

export default Trivia;