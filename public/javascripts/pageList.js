var PageList = React.createClass({
    render: function(){
        return (
        <div className='pageList'>
        {this.props.titles.map(function(title){
            return (
        <PageListElement title={title.title} key={title._id} id={title._id} getPage={this.props.getPage} isPressed={title.isClicked}/>
                   );
        }, this)}
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