import React from 'react';
// import HeaderComponent from './HeaderComponent';
import Select from 'react-select';

export default class HeaderComponent extends React.Component {
  constructor(props){
      super(props);
      this.state={
          "catagory": {"label":"All", "value": "all"},
          "counrty": {"label":"US", "value":"us"},
          "data":""
      }
  }

  getCatagories () {
      const arr = [
          {"label":"All", "value": "all"},
          {"label":"Business", "value": "business"},
          {"label":"Entertainment", "value": "entertainment"},
          {"label":"General", "value": "general"},
          {"label":"Health", "value": "health"},
          {"label":"Science", "value": "science"},
          {"label":"Sports", "value": "sports"},
          {"label":"Technology", "value": "technology"},
      ]
      return arr
  }

  handleChangeCata(e) {
      this.setState({"catagory": e})
  }
  
  getCountries() {
      const arr = [
          {"label":"INDIA", "value":"in"},
          {"label":"UNITED ARAB EMIRATES", "value":"ae"},
          {"label":"ARGENTINA", "value":"ar"},
          {"label":"AUSTRIA", "value":"at"},
          {"label":"AUSTRALIA", "value":"au"},
          {"label":"BELGIUM", "value":"be"},
          {"label":"BULGARIA ", "value":"bg"},
          {"label":"SWITZERLAND", "value":"br"},
      ]
      return arr
  }

  handleChangeCountry(e) {
      this.setState({"counrty": e})
  }

  handleSearchBTN() {
      const country = this.state.counrty["value"]
      const catagory = this.state.catagory["value"]
      if (catagory === "all"){
          const url = "https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=f3409e21804448d989163e03e4b538f9"
          console.log("URL ", url );
          fetch(url).then((res) =>{
            const promise = res.json()
              .then((data)=>{
                this.setState({"data": data})
              })
            })
      }
      if (catagory !== "all") {
          const url = "https://newsapi.org/v2/top-headlines?country="+country+"&category="+catagory+"&apiKey=f3409e21804448d989163e03e4b538f9"
          console.log("Counrty ", url)
          fetch(url).then((res) =>{
            const promise = res.json()
              .then((data)=>{
                this.setState({"data": data})
              })
            })
      }

  }

  render() {
      return(
          <div className="container">
              <div className="row" >
                  <div className="col-md-12" style={{"margin-top": "20px", "margin-bottom": "20px", "margin-left": "20px"}}>
                      <div className="col-md-4  ">
                          <Select
                              options={this.getCatagories()}
                              value={this.state.catagory}
                              onChange = {(e)=> this.handleChangeCata(e)}
                          />
                      </div>
                      <div className="col-md-4  ">
                          <Select
                              options={this.getCountries()}
                              value={this.state.counrty}
                              onChange = {(e)=> this.handleChangeCountry(e)}
                          />
                      </div>
                      <div className="col-md-4  ">
                          <button className="btn btn-mm btn-primary" onClick={()=> this.handleSearchBTN()} style={{"fontWeight": "bold"}}> <i className="fas fa-search"></i> </button>
                      </div>
                  </div>
              </div>
              <TopHeadlines searchData={this.state.data["articles"]} />
          </div>
      )
  }
}



class TopHeadlines extends React.Component{
  constructor(props){
    super(props);
    this.state={
      "key": "f3409e21804448d989163e03e4b538f9",
      "topHeadlines":[],
    }
  }

  async componentWillMount() {
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f3409e21804448d989163e03e4b538f9"
    await fetch(url).then((res) =>{
    const promise = res.json()
      .then((data)=>{
        this.setState({"topHeadlines": data["articles"], "isOk": true})
      })
    })
  }

  handleDate(date) {
    var date = new Date(date)
    return date.toString()
  }

  handleContent(content) {
     if (content !== null) {
         const text = content.includes('…')
         if (text){
             const text = content.split('…')
             return text[0]
         }
         else {
             const text = content.slice(0, 150)
             return text
         }
     }
  }

  async handleReadMore(url) {
      let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/html',
            'Cache-Control': 'no-cache'
        },
        mode: 'no-cors'};
      await fetch(url, config)
       .then((res) =>{
           console.log(res.headers);
           if (!res.ok){
               throw new Error("Falied >>> "+ res.status);
           }
      const promise = res.text()
      console.log("Text >>> ", res.text())
        .then((data)=>{
            console.log("data >> ", data);
        })
      })
  }

  render() {
      const imgUrl = "https://image.shutterstock.com/image-vector/no-image-available-vector-hand-600w-745639717.jpg"
    return (
      <div className="container">
       {!this.props.searchData ? 
          <div className="col-md-12">
            { this.state.topHeadlines && this.state.topHeadlines.length > 0 && this.state.topHeadlines.map((headline, i)=>{
              return (
                <div className="panel panel-default panel-body">
                  <div className="row">
                      <div className="">
                            <div className="col-md-4 ">
                                {headline["urlToImage"] !== null ? 
                                    <img style={{"width":"320px", "height": "200px", "marginTop": "15px"}} src={headline["urlToImage"]} alt="img not found"  className="rounded float-left"/> : 
                                    <img style={{"width":"320px", "height": "200px"}} src={imgUrl} alt="img not found"  className="rounded float-left"/> }
                            </div>
                            <div className="col-md-8 ">
                            <div >
                                <h4 className="" style={{"fontSize": "25px"}}>{headline["title"]}</h4>
                                <span className="text-muted"> {this.handleDate(headline["publishedAt"])} by  {headline["author"]} </span>
                            </div>
                                <p style={{"marginTop": "1px", "marginBottom": "1px", "fontFamily":"monospace"}}> {headline["description"]} </p>
                                <p style={{"fontFamily":"monospace"}}> {this.handleContent(headline["content"])}<a style={{"fontSize": "15px", "fontWeight": "bold", "cursor":"pointer"}} href={headline["url"]}>...read more</a> </p>
                            </div>
                      </div>
                  </div>
                  <div>
                  </div>
                </div>
              )
            }) }
          </div> :
          <div className="col-md-12 m-t-md">
            { this.props.searchData && this.props.searchData.map((headline, i)=>{
              return (
                <div className="panel panel-default panel-body">
                    <div className="row">
                        <div className="col-md-4 ">
                            {headline["urlToImage"] !== null ? 
                                <img style={{"width":"320px", "height": "200px", "marginTop": "15px"}} src={headline["urlToImage"]} alt="img not found"  className="rounded float-left"/> : 
                                <img style={{"width":"320px", "height": "200px"}} src={imgUrl} alt="img not found"  className="rounded float-left"/> }
                        </div>
                        <div className="col-md-8 ">
                            <div >
                                <h4 className="" style={{"fontSize": "25px"}}>{headline["title"]}</h4>
                                <span className="text-muted"> {this.handleDate(headline["publishedAt"])} by  {headline["author"]} </span>
                            </div>
                                <p style={{"marginTop": "1px", "marginBottom": "1px", "fontFamily":"monospace"}}> {headline["description"]} </p>
                                <p style={{"fontFamily":"monospace"}}> {this.handleContent(headline["content"])}<a style={{"fontSize": "15px", "fontWeight": "bold", "cursor":"pointer"}} href={headline["url"]}>...read more</a> </p>
                        </div>
                    </div>
                </div>
              )
            }) }
        
        </div>}
      </div>
    )
  }
}
