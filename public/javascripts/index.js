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
                this.setState({pageTitles: JSON.parse(xhr.responseText).titles});
            }
        }.bind(this);
        xhr.send();

    loadPageFromServer: function(id){
        xhr.open('GET', '/api/page?id=' + id);
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                console.log(page);
                this.setState({pageTitle: page.title, pageContent: page.title, pageId: id});
            }
        }.bind(this);
        xhr.send();
    },
    render: function(){
        return (
<div className='wikiBox'>
<NavBar />
<PageList titles={this.state.pageTitles} getPage={this.loadPageFromServer}/>
<PageBox title={this.state.pageTitle} content={this.state.pageContent}/>
</div>
               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
