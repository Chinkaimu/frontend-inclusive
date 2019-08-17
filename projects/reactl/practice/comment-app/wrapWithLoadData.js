import React, { Component } from 'react';

export default (WrappedComponent, name) => {
    class NewComponent extends Component {
        constructor() {
            super();
            this.state = {data: null}
        }

        componentWillMount() {
            let data = localStorage.getItem(name);
            try {
                // JSON.parse解析非JSON格式的字符串时会出错，无法继续往下执行。需要catch并作相应的处理。
                this.setState({ 
                    data: JSON.parse(data)
                })
            } catch (e) {
                this.setState({
                    data,
                })
            }
        }

        saveData(data) {
            this.setState({
                data,
            })
            try {
                localStorage.setItem(name, JSON.stringify(data));
            } catch(e) {
                localStorage.setItem(name, `${data}`);
            }
        }

        render() {
            return <WrappedComponent data={this.state.data} saveData={this.saveData.bind(this)} {...this.props}/>
        }
    }

    return NewComponent;
}