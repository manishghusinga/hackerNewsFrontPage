import React, { Component } from 'react';
import { getStories } from "../utility/services/apis";
import { TabPane, Row, Col, Spinner } from "reactstrap";
import "../styles/News.css"
import moment from "moment";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        getStories()
            .then(resp => {
                let data = resp.hits.filter(item => item.title && item.url)
                this.setState({
                    data
                })
            });
    }

    hidestory = (i) => {
        let data = this.state.data;
        data.splice(i, 1);
        this.setState({ data })
    }

    upvote = (i) => {
        let data = this.state.data;
        data[i].upvote = (data[i].upvote || 0) + 1;
        this.setState({
            data
        })
        //send it to api
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.data.map((item, index) => (
                        <TabPane key={"tab-" + (item.id) + item.time} tabId={item.id}>
                            <div className="news-Block font-size-12">
                                <Row>
                                    <Col lg={1} xs={1} className="pr-0">
                                        {index + 1}
                                    </Col>
                                    <Col lg={11} xs={11}>
                                        <a href={item.url} target="_blank" rel="noopener">{item.title} </a>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={1} xs={1}> </Col>
                                    <Col lg={2} xs={2} className="font-size-small">
                                        <div onClick={() => this.upvote(index)}>
                                            <span className="pr-2 font-weight-bold">
                                                {item.upvote ? item.upvote : ""}
                                            </span>
                                            Upvote
                                        </div>

                                    </Col>
                                    <Col lg={3} xs={3}>
                                        <span >{moment(new Date(item.created_at)).format("DD/MM/YYYY")}</span>
                                    </Col>

                                    <Col lg={3} xs={3}>
                                        <span>By: </span>
                                        <span> {item.author}</span>
                                    </Col>

                                    <Col lg={3} xs={3}>
                                        <div onClick={() => this.hidestory(index)}>
                                            Hide
                                        </div>
                                    </Col>


                                </Row>
                            </div>
                        </TabPane>
                    ))
                }
            </React.Fragment>
        )
    }
}

export default Dashboard;
