//this is the parent module for our React front-end, WikiBox is the parent class and contains the list of all pages and contains our NavBar, 
//PageList, and PageDisplay classes
var xhr = new XMLHttpRequest(); //we chose to use xhr instead of ajax since we didn't need all of jquery just to make ajax requests

var WikiBox = React.createClass({
    getInitialState: function(){
        return { pageTitles: [], pageTitle: "", pageContent: "", pageId:"", search:"", homepage:true};
    },
    componentDidMount: function(){
        this.loadPageTitlesFromServer();
    },
    loadPageTitlesFromServer: function(){   //makes the get request for all of the titles, initially none of the titles have been clicked
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
    loadPageFromServer: function(id){   //when the user clicks on a page, send the id to the server to retrieve the selected page
        this.setState({homepage: false});   //we know the user wants to view a page so we replace the home page with the page they clicked on
        xhr.open('GET', '/api/page?id=' + id);  //this is how we sent the id in the query to the server
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                console.log(page);
                this.setState({pageTitle: page.title, pageContent: page.content, pageId: id});
            }
        }.bind(this);
        xhr.send();
        var newTitles = this.state.pageTitles.map(function(title){
            if (title._id === id){  //finds the title that was clicked and sets its isClicked attribute to true
                title.isClicked = true;
            } else {
                title.isClicked = false;   //set the isClicked attribute of all other titles to false
            }
            return title;
        });
        this.setState({pageTitles: newTitles});
    },
    createNewPage: function(){
        this.setState({pageTitle: '', pageContent: '', pageId: ''});    //replace the home page with a blank PageBox class
        this.setState({homepage: false});
    },
    postPageServerUpdate: function(title, content){
        xhr.open('POST', '/api/page');  //makes a post request to the server with the title and content for the new page
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                this.setState({pageTitle: page.title, pageContent:page.content, pageId: page._id});
                this.loadPageTitlesFromServer();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('title='+title+'&content='+content);
        this.setState({pageTitle: title, pageContent:content, pageTitles: this.state.pageTitles.append(title)});
    },
    editPageServerUpdate: function(title,content){
        if( this.state.pageId == '' ){  //if there is no page id then we need to create a new page
            return this.postPageServerUpdate(title, content);
        }
        xhr.open('PUT', '/api/page');   //used a put request since put and get are supposed to be inverse operations
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
        xhr.open('DELETE', '/api/page');    //deletes the page from the database
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var page = JSON.parse(xhr.responseText);
                this.setState({pageTitle: '', pageContent: '', pageId: '', homepage:true}); //empty out page title, content, id and load home page
                this.loadPageTitlesFromServer();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id='+this.state.pageId);
    },
    searchChange: function(e){ 
        this.setState({search: e.target.value.toLowerCase()});  //makes sure state matches input in search bar
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
