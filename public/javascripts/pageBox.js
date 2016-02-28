var PageBox = React.createClass({
    getInitialState: function(){
        return { editable: false,
                 content: this.props.content,
                 title: this.props.title
                };
    },
    makeEditable: function(){
        this.setState({editable: true});
    },
    onTitleChange: function(e){
        this.setState({title: e.target.value});
    },
    onContentChange: function(e){
        this.setState({content: e.target.value});
    },
    finishEdit: function(){
        this.setState({editable: false});
        this.props.updateServer();
    },
    render: function(){
        if( this.state.editable ){
            var title = <PageTitleEdit title={this.state.title} 
                                       update={this.onTitleChange}/>
            var content = <PageContentEdit content={this.state.content}
                                       update={this.onContentChange}/>
            var button = <DoneButton onClick={this.finishEdit}/>
        }else{
            var title = <PageTitle title={this.state.title} />
            var content = <PageContent content={this.state.content} />
            var button = <EditButton onClick={this.makeEditable}/>
        }
        return (
<div className='pageBox'>
    <div className='pageHeader'>
        {title}
        {button}
    </div>
    {content}
</div>
               );
    }
});

var PageTitle = React.createClass({
    render: function(){
        if( this.props.title == '' ){
            return (
<h1 className='emptyText'>Title</h1>
                   );
        } else {
            return (
<h1> {this.props.title} </h1>
                   );
        }
    }
});

var PageTitleEdit = React.createClass({
    render: function(){
        return (
<input type='text' 
       value={this.props.title}
       onChange={this.props.update}
       placeholder="Title"
       />
               );
    }
});

var PageContent = React.createClass({
    render: function(){
        if( this.props.content == '' ){
            return (
<p className='emptyText'> Content </p>
                   );
        }
        return (
<p> {this.props.content} </p>
               );
    }
});

var PageContentEdit = React.createClass({
    render: function(){
        return (
<input type='text'
       value={this.props.content}
       onChange={this.props.update}
       placeholder="Content"
       />
               );
    }
});

var EditButton = React.createClass({
    render: function(){
        return (
<input type='button' 
       value='Edit' 
       onClick={this.props.onClick}
       />
               );
    }
});

var DoneButton = React.createClass({
    render: function(){
        return (
<input type='button'
       value='Done'
       onClick={this.props.onClick}
       />
               );
    }
});

window.PageBox = PageBox;
