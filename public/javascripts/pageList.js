var PageList = React.createClass({  //class for the page list displays all of the pages
    render: function(){
        return (
        <div className='pageList'>
        <input type='text' placeholder='Search' onChange={this.props.searchChange}/>
        <ul style={{"listStyleType": "none"}}>
        {this.props.titles.map(function(title){
            return (
        <li key={title._id+'_li'}><PageListElement title={title.title} key={title._id} id={title._id} getPage={this.props.getPage} isPressed={title.isClicked}/></li>
                   );
        }, this)}
        <li><button type="button" onClick={this.props.createNewPage} >New Page</button></li>
        </ul>
        </div>
               );
    }
});

var PageListElement = React.createClass({ //class for each page title
    getPage: function(){
      this.props.getPage(this.props.id);
    },
    render: function(){
        return (
    <a href='#/' className={this.props.isPressed? "isClicked": "notClicked"} id={this.props.id} onClick={this.getPage}> {this.props.title} </a>
               );
    }
});

window.PageList = PageList;
