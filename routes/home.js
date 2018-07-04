var google = require('google');
google.resultsPerPage = 25;


module.exports = (router) => {
    router.get('/details/:name', (req, res) =>{
        if(!req.params.name){
            res.json({
                success: false,
                message: 'Name must be not empty'
            });
        }else{
            let searchString = 'marvel com ' + req.params.name;
                google(searchString, function (err, res){
                if (err) console.error(err);
                let matchLink = false;
                for (var i = 0; i < res.links.length; ++i) {
                    var link = res.links[i];
                    const regExp = new RegExp(/marvel.com\/characters\//);
                    if(regExp.test(link.href)){
                        matchLink = link.href;
                        sendResult(matchLink);
                        return;
                    }
                    sendResult(matchLink);
                }
            });
            function sendResult(link) {
                if(!link){
                    res.json({
                        success: false,
                        link: 'Incorrect hero name, no matches'
                    });
                }else {
                    res.json({
                        success: true,
                        link: link
                    });
                }
            }
        }
    });

    return router;
};
