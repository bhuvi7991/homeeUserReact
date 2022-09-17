import React, { Component, } from 'react'
import { ActivityIndicator, Text } from 'react-native'

export default class test extends Component {

    constructor() {
        super()
        this.state = {
            ofLoad: true
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ofLoad: false
            })
        },
            1000)
    }


    render() {
        return (
            <>
                {
                    this.state.ofLoad ? <ActivityIndicator size='large' color='#000' /> : <Text>hello</Text>
                }
            </>
        )
    }
}
