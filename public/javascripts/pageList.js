var PageList = React.createClass({
    render: function(){
        // var ulStyle = {"listStyleType": "none"};
        return (
        <div className='pageList'>
        <ul style={{"listStyleType": "none"}}>  //byron we'll add this to the css later
        {this.props.titles.map(function(title){
            return (
        <li><PageListElement title={title.title} key={title._id} id={title._id} getPage={this.props.getPage} isPressed={title.isClicked}/></li>
                   );
        }, this)}
        <li><button type="button" onClick={this.props.createNewPage}>New Page</button></li>
        </ul>
        </div>
               );
    }
});

var PageListElement = React.createClass({
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