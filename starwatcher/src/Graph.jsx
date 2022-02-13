import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';
import axios from 'axios';

const API_URL = "http://localhost:3000"
class Graph extends React.Component{

  state = {
    q:null
  }

  componentDidMount = () => {
    this.setState({graphData: null});
  }

  componentDidUpdate = (nextProps) => {
      const q1 = this.props.q;
      const q2 = this.state.q;

      if (q1 !== q2) {
      axios.get(`${API_URL}/search/googleTrends?q=${this.props.q}`, {
        headers: {
            'Content-type': 'application/json',
        }}).then(res => {
          const data = res.data.map((item, i) => {
            return {x:i, y:item.value}
          })
          this.setState({"graphData":data, "q":this.props.q});
        })
    }
  }

  render() {
    return (
      <div className='container'>
        <h3>Search Frequency in the Past Year</h3>
        { this.state.graphData &&  
        <XYPlot height={300} width={600}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <LineSeries data={this.state.graphData} />
        </XYPlot> } 
      </div>
    );
  }
}

export default Graph;
