import React from 'react';
import Select from 'react-select';

export default class HeaderComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            "catagory": {"label":"All", "value": "all"},
            "counrty": {"label":"US", "value":"us"},
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
            {"label":"", "value":"ca"},
            {"label":"", "value":"ch"},
            {"label":"", "value":"cn"},
            {"label":"", "value":"co"},
            {"label":"", "value":"cu"},
            {"label":"", "value":"cz"},
            {"label":"", "value":"de"},
            {"label":"", "value":"eg"},
            {"label":"", "value":"fr"},
            {"label":"", "value":"gb"},
            {"label":"", "value":"gr"},
            {"label":"", "value":"hk"},
            {"label":"", "value":"hu"},
            {"label":"", "value":"id"},
            {"label":"", "value":"ie"},
            {"label":"", "value":"il"},
            {"label":"", "value":"it"},
            {"label":"", "value":"jp"},
            {"label":"", "value":"kr"},
            {"label":"", "value":"lt"},
            {"label":"", "value":"lv"},
            {"label":"", "value":"ma"},
            {"label":"", "value":"mx"},
            {"label":"", "value":"my"},
            {"label":"", "value":"ng"},
            {"label":"", "value":"nl"},
            {"label":"", "value":"no"},
            {"label":"", "value":"nz"},
            {"label":"", "value":"ph"},
            {"label":"", "value":"pl"},
            {"label":"", "value":"pt"},
            {"label":"", "value":"ro"},
            {"label":"", "value":"rs"},
            {"label":"", "value":"ru"},
            {"label":"", "value":"sa"},
            {"label":"", "value":"se"},
            {"label":"", "value":"sg"},
            {"label":"", "value":"si"},
            {"label":"", "value":"sk"},
            {"label":"", "value":"th"},
            {"label":"", "value":"tr"},
            {"label":"", "value":"tw"},
            {"label":"", "value":"ua"},
            {"label":"", "value":"us"},
            {"label":"", "value":"ve"},
            {"label":"", "value":"za"}
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
        }
        if (catagory !== "all") {
            const url = "https://newsapi.org/v2/top-headlines?country="+country+"&category="+catagory+"&apiKey=f3409e21804448d989163e03e4b538f9"
            console.log("Counrty ", url)
        }
    }

    render() {
        // console.log("---", this.state.counrty);
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-4">
                            <Select
                                options={this.getCatagories()}
                                value={this.state.catagory}
                                onChange = {(e)=> this.handleChangeCata(e)}
                            />
                        </div>
                        <div className="col-md-4">
                            <Select
                                options={this.getCountries()}
                                value={this.state.counrty}
                                onChange = {(e)=> this.handleChangeCountry(e)}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-mm btn-primary" onClick={()=> this.handleSearchBTN()}>go</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
