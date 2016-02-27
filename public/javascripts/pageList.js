var PageList = React.createClass({
    render: function(){
        return (
<div className='pageList'>
{this.props.titles.map(function(title){
    return (
<PageListElement title={title.title} key={title._id}/>
           );
})}
</div>
               );
    }
});

var PageListElement = React.createClass({
    render: function(){
        return (
<a href='#/' className='pageListElement'> {this.props.title} </a>
               );
    }
});

window.PageList = PageList;
