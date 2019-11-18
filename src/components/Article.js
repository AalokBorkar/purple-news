import React, { Component } from 'react'

// the actual article component takes in props from the article_data file and returns JSX with that data
// uses bootstraps card content box to format article
class Article extends Component {
    getPartyColor(bias) {
        if (bias < 0) {
            return "left";
        } else if (bias > 0) {
            return "right";
        } else {
            return "mid";
        }
    }
    render() {
        return (
            <div className="article card">
                <div className={"banner-source banner-source-" + this.getPartyColor(this.props.bias)}>{this.props.source}</div>
                <img src={this.props.img} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-header">{this.props.author}</div>
                    <p className="card-text">{this.props.content}</p>
                </div>
                <button type="button" className="btn btn-primary">Upvote</button>
                <button type="button" className="btn btn-danger">Downvote</button>
            </div>
        )
    }
}


export default Article;