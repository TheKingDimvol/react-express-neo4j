import React, { Component } from 'react'
import axios from 'axios'
import './nodes.css'

export default class Nodes extends Component{
    constructor() {
        super()
        this.state = {
            nodes: []
        }

    }

    componentDidMount() {
        axios.get('/nodes').then(res => res.data).then(nodes => {
            this.setState({nodes}, () => console.log('Nodes fetched...', nodes))
        })
    }

    render() {
        return (
            <div>
                <h1>Nodes:</h1>
                <ul>
                    {this.state.nodes.map(node => 
                        <li key={node.id}> {node.id} {node.title} {node.size} {node.community} </li>
                    )}
                </ul>
            </div>
        )
    }
}
