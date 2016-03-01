var xhr = new XMLHttpRequest();

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [] };
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
    render: function(){
        return (
<div className='wikiBox'>
<NavBar />
<PageList titles={this.state.pageTitles} getPage={this.loadPageFromServer} createNewPage={this.createNewPage}/>
<PageBox title={this.state.pageTitle} content={this.state.pageContent}/>
</div>
               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
