/**
 * Created by mac on 16/8/28.
 */

"use strict"
app.constant("Modules_Config",[
        {
            name:"f_model",
            module:true,
            files:[
                "/angularMenus/module/f/f.controller.js"
            ]
        },
        {
            name:"m_model",
            module:true,
            files:[
                "/angularMenus/module/m/m.controller.js"
            ]
        },
        {
            name:"e_model",
            module:true,
            files:[
                "/angularMenus/module/e/e.controller.js"
            ]
        },
        {
            name:"h_model",
            module:true,
            files:[
                "/angularMenus/module/h/h.controller.js"
            ]
        }

    ])
    .config(["$ocLazyLoadProvider","Modules_Config",function($ocLazyLoadProvider,Modules_Config){
        $ocLazyLoadProvider.config({
            debug:false,
            events:false,
            modules:Modules_Config
        });
    }]);