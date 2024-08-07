import React, {Component} from "react";
import {Bar} from "react-chartjs-2";

class DetGraph5800 extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let data = {
            labels: this.props.xticks,
            color: "whitesmoke",
            datasets: [{
                data: this.props.data,
                label: "",
                backgroundColor: this.props.gr_colors.graph,
                fill: true
            }]
        }
        let options = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales:{
                y:{
                    grid:{
                        color: "whiteSmoke"
                    },
                    suggestedMin:0, suggestedMax:110,
                    ticks:{
                        color: "whitesmoke"
                    }
                },
                x:{
                    grid:{
                        color: "whitesmoke"
                    },
                    ticks:{
                        color: "whitesmoke"
                    }
                }
            }
        }
        return(
            <div className="det_graph5800">
                <Bar 
                    type="Bar"
                    options={options}
                    data={data}
                />
            </div>
        )
    }
}

export default DetGraph5800