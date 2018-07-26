import React, { Component } from 'react';
import SlideLoading from './SlideLoading'
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import SlideFour from './SlideFour';
import SlideFive from './SlideFive';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import axios from 'axios'

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideCount: 1,
      articleCount:0,
      articles: null,
      prefArray: []
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  componentDidMount(){
    console.log('component mounted')
    this.fetchArticles();
  }

  fetchArticles(){
    axios.get("api/scrape")
      .then(res => {
        this.setState({articles: res})
        this.setPreferredArray()
      })
  }


  setPreferredArray() {
    this.setState({prefArray: this.state.user.preferredCat})
  }

  nextSlide() {
    if (this.state.slideCount === 5) {
      this.setState({ slideCount: 1})
    }
    else {
      this.setState({ slideCount: this.state.slideCount + 1 })
    }
  }

  previousSlide() {
    if (this.state.slideCount === 1) {
      this.setState({ slideCount: 5})
    }
    else {
      this.setState({ slideCount: this.state.slideCount - 1 })
    }
  }

  getCategoryArticles(preference) {
    var arr = []
    this.state.article.forEach(elem => {
      if(elem.category ===  preference){
          arr.push(elem)
      }
    })

    return this.articleChooser(arr)
  }

  articleChooser(array) {
    return array[this.state.articleCount]
  }

  updateArticleCount() {
    this.setState({articleCount: Math.floor(Math.random() * 10)});
  }

  render() {
    return (
      <div>
        <h1>WE BE HERE</h1>
        <Slider>
          { this.state.articles === null ? <SlideLoading/> : null}
          { this.state.slideCount === 1 ? <SlideOne category = {this.state.prefArray[0]} articles = {this.getCategoryArticles(this.state.prefArray[0])}/> : null }
          { this.state.slideCount === 2 ? <SlideTwo category = {this.state.prefArray[1]} articles = {this.getCategoryArticles(this.state.prefArray[1])}/> : null }
          { this.state.slideCount === 3 ? <SlideThree category = {this.state.prefArray[2]} articles = {this.getCategoryArticles(this.state.prefArray[2])}/> : null }
          { this.state.slideCount === 4 ? <SlideFour category = {this.state.prefArray[3]} articles = {this.getCategoryArticles(this.state.prefArray[3])}/> : null }
          { this.state.slideCount === 5 ? <SlideFive category = {this.state.prefArray[4]} articles = {this.getCategoryArticles(this.state.prefArray[4])}/> : null }
  				
          <RightArrow nextSlide={this.nextSlide} />
          <LeftArrow previousSlide={this.previousSlide} />

        </Slider>
      </div>
    );
  }
}

export default Slider