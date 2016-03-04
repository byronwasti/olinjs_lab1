var xhr = new XMLHttpRequest();

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [], pageTitle: "", pageContent: "", pageId:"", search:"", homepage:true};
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
        this.setState({homepage: false});
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
        this.setState({homepage: false});
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
        this.setState({search: e.target.value.toLowerCase()});
    },
    render: function(){
        if(this.state.homepage) {
            var pageDisplay = <PageHome />
        }else {
            var pageDisplay = <PageBox title={this.state.pageTitle} 
                     content={this.state.pageContent}
                     updateServer={this.editPageServerUpdate}
                     deletePage={this.deletePageServerUpdate}/>
        }
        return (
<div className='wikiBox'>
    <NavBar />
    <div className='flexWrapper'>
        <PageList titles={this.state.pageTitles.filter(function(elem){
            return elem.title.toLowerCase().search(this.state.search) > -1;
        }, this).sort(function(a,b){
                            a = a.title.toLowerCase();
                            b = b.title.toLowerCase();
                            return a > b;
                        })} 
                getPage={this.loadPageFromServer} 
                searchChange={this.searchChange}
                createNewPage={this.createNewPage}/>

        {pageDisplay}

        <div className='EmptySpace'></div>
    </div>
</div>
               );
    }
});

var PageHome = React.createClass({
    render: function(){
        return (
<div className='pageBox'>
    <h1>Welcome to Drugpedia!</h1>
    <p> Please click a drug on the left to learn more! <br/>
        Feel free to add more!
    </p>
</div>


               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
