var PageList = React.createClass({
    getInitialState: function(){
      return {titles: this.props.titles.map(function(title){
        return {title: title.title, _id: title._id, isClicked: false};  
      })};
    },
    getPage: function(id){
      this.props.getPage(id);
      var updatedTitles = this.state.titles.map(function(title){
        if (id === title._id){
          title.isClicked = true;
        } else {
          title.isClicked = false;
        }
        return title;
      });
      this.setState({titles: updatedTitles});
    },
    render: function(){
        return (
        <div className='pageList'>
        {this.state.titles.map(function(title){
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