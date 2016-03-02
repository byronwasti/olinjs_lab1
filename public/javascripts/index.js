var xhr = new XMLHttpRequest();

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [], pageTitle: "", pageContent: "", pageId:"", search:""};
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
        this.setState({pageTitle: '', pageContent: '', pageId: ''});
    },
    postPageServerUpdate: function(title, content){
        console.log("Posting a new page!");
        xhr.open('POST', '/api/page');
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                this.setState({pageTitle: page.title, pageContent:page.content, pageId: page._id});
                this.loadPageTitlesFromServer();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('title='+title+'&content='+content);

        this.setState({pageTitle: title, pageContent:content});
        this.setState({pageTitles: this.state.pageTitles.append(title)});
    },
    editPageServerUpdate: function(title,content){
        if( this.state.pageId == '' ){
            return this.postPageServerUpdate(title, content);
        }
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
                this.loadPageTitlesFromServer();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id='+this.state.pageId);
    },
    searchChange: function(e){
        this.setState({search: e.target.value});
    },
    render: function(){
        return (
<div className='wikiBox'>
<NavBar />
<div className='flexWrapper'>
    <PageList titles={this.state.pageTitles.filter(function(elem){
        return elem.title.search(this.state.search) > -1;
    }, this).sort(function(a,b){
                        a = a.title.toLowerCase();
                        b = b.title.toLowerCase();
                        return a > b;
                    })} 
            getPage={this.loadPageFromServer} 
            searchChange={this.searchChange}
            createNewPage={this.createNewPage}/>

    <PageBox title={this.state.pageTitle} 
             content={this.state.pageContent}
             updateServer={this.editPageServerUpdate}
             deletePage={this.deletePageServerUpdate}/>
    <div className='EmptySpace'>
    </div>
</div>
</div>
               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
