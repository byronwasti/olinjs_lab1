var NavBar = React.createClass({	//class for title
    render: function(){
        return (
<div className='navBar'>
<WebsiteName />
</div>
        );
    }
});

var WebsiteName = React.createClass({
    render: function(){
        return (
<h1>Drugpedia</h1>
        );
    }
});

window.NavBar = NavBar;
