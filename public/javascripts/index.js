var xhr = new XMLHttpRequest();

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [], pageTitle: "", pageContent: "", pageId:""};
    },
    componentDidMount: function(){
        this.loadPageTitlesFromServer();
    },
    loadPageTitlesFromServer: function(){
        xhr.open('GET', '/api/titles');
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var titles = JSON.parse(xhr.responseText).titles;
                var newTitles = titles.map(function(title){
                    return {title: title.title, _id: title._id, isClicked: false};
                });
                this.setState({pageTitles: newTitles});
            }
        }.bind(this);
        xhr.send();
    },
    loadPageFromServer: function(id){
        xhr.open('GET', '/api/page?id=' + id);
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                console.log(page);
                this.setState({pageTitle: page.title, pageContent: page.content, pageId: id});
            }
        }.bind(this);
        xhr.send();
        var newTitles = this.state.pageTitles.map(function(title){
            if (title._id === id){
                title.isClicked = true;
            } else {
                title.isClicked = false;
            }
            return title;
        });
        this.setState({pageTitles: newTitles});
    },
    createNewPage: function(){
        this.setState({pageTitle: '', content: ''});
    },
    editPageServerUpdate: function(title,content){
        xhr.open('PUT', '/api/page');
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                this.setState({pageTitle: page.title, pageContent:page.content, pageId: page._id});
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('title='+title+'&content='+content+'&id='+this.state.pageId);

        this.setState({pageTitle: title, pageContent:content});
    },
    deletePageServerUpdate: function(){
        xhr.open('DELETE', '/api/page');
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                this.setState({pageTitle: '', pageContent: '', pageId: ''});
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id='+this.state.pageId);
    },
    render: function(){
        return (
<div className='wikiBox'>
<NavBar />
<div className='flexWrapper'>
    <PageList titles={this.state.pageTitles} getPage={this.loadPageFromServer} createNewPage={this.createNewPage}/>
    <PageBox title={this.state.pageTitle} 
             content={this.state.pageContent}
             updateServer={this.editPageServerUpdate}
             deletePage={this.deletePageServerUpdate}/>
</div>
</div>
               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
