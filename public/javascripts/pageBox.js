var PageBox = React.createClass({ //class for displaying pages, editing pages, deleting pages, and posting pages to server
    getInitialState: function(){
        return { editable: false,
                 content: this.props.content,
                 title: this.props.title
                };
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({ editable: false,
                 content: nextProps.content,
                 title: nextProps.title
                });
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
        this.props.updateServer(this.state.title, this.state.content);
    },
    cancelEdit: function(){
        this.setState({editable: false,
                       content: this.props.content,
                       title: this.props.title
                        });
    },
    deletePage: function(){
        this.props.deletePage();
    },
    render: function(){
        if( this.state.editable ){
            // this is probably how I would format these lines
            var title = <PageTitleEdit
                            title={this.state.title}
                            update={this.onTitleChange}
                        />
            var content = <PageContentEdit content={this.state.content}
                                       update={this.onContentChange}/>
            var button = <Button value='Done' onClick={this.finishEdit}/>
            var deleteButton = <Button value='Delete' onClick={this.deletePage}/>
            var cancelButton = <Button value='Cancel' onClick={this.cancelEdit}/>
        }else{
            var title = <PageTitle title={this.state.title} />
            var content = <PageContent content={this.state.content} />
            var button = <Button value='Edit' onClick={this.makeEditable}/>
        }
        return (
<div className='pageBox'>
    {title}
    {content}
    <div className='buttonBox'>
        //I like the es6 but do you have any way to make sure it works on most browsers?
        {button}
        {(()=> {if( this.state.editable ) return cancelButton})() }
        {(()=> {if( this.state.editable ) return deleteButton})() }
    </div>
</div>
               );
    }
});

var PageTitle = React.createClass({ //class for displaying the title of each page
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

var PageTitleEdit = React.createClass({ //class for editing the title of each page and creating a new page
    render: function(){
        return (
            <input type='text'
                value={this.props.title}
                onChange={this.props.update}
                placeholder="Title"
                className="pageTitleEdit"
            />
        );
    }
});

var PageContent = React.createClass({ //class for displaying the content of each page
    render: function(){
        if( this.props.content == '' ){
            return (
<p className='emptyText'> Content </p>
                   );
        }

        // Return the content with line breaks where \n is
        return (
<p>
{this.props.content.split("\n").map(function(item){
    return (
<span key={Math.random()} >
    {item}
    <br/>
</span>
           );
})}
</p>
               );
    }
});

var PageContentEdit = React.createClass({ //class for editing the content of a new page and creating a new page
    render: function(){
        return (
<textarea type='text'
       value={this.props.content}
       onChange={this.props.update}
       placeholder="Content"
       className="pageContentEdit"/>
               );
    }
});

var Button = React.createClass({  //class for the edit, delete, done, and cancel buttons
    render: function(){
        return (
<input type='button'
       value={this.props.value}
       onClick={this.props.onClick}/>
               );
    }
});


window.PageBox = PageBox;
