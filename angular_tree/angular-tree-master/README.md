# angular-multicheckbox-tree
a tree with multi checkbox ,can slide toggle<br />
<img src="http://static.zhiziyun.com/images/multicheck-tree.png" />
#denpencies
jquery 1.7 or later<br />
angular 1.2 or later
#parameters
inputModel like
    [{
        id:1,
        name:'jonh',
        checked:false,
        children:[
            {
                id:2,
                name:'jack',
                checked:false,
                children:[{
                    id:7,
                    name:'rose',
                    checked:false
                }]
            },
            {
                id:3,
                name:'fancy',
                checked:false
            }
        ]
    },{
        id:4,
        name:'mike',
        checked:true,
        children:[
            {
                id:5,
                name:'susan',
                checked:true
            }
        ]
    },{
        id:6,
        name:'stark',
        checked:true
    }]<br />
outputModel is a json array which must be definded in controller
