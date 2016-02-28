var xhr = new XMLHttpRequest();

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [], pageTitle: "", pageContent: "" };
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
    },
    updateServer: function(){
    },
    render: function(){
        return (
<div className='wikiBox'>
<NavBar />
<div className='flexWrapper'>
    <PageList titles={this.state.pageTitles}/>
    <PageBox title={this.state.pageTitle} 
             content={this.state.pageContent}
             updateServer={this.updateServer}
             />
</div>
</div>
               );
    }
});

ReactDOM.render(
    <WikiBox url='/api/tasks' pollInterval={5000}/>,
    document.getElementById('content')
);
