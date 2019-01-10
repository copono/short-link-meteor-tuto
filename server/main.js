import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  
  WebApp.connectHandlers.use((req, res, next)=>{
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});
    if(link) {
      res.statusCode = 302;
      res.setHeader('location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  })

  // WebApp.connectHandlers.use((req, res, next)=> {
  //   console.log('stuffff');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   // res.statusCode = 404;
  //   // res.setHeader('my-custom-header', 'Ger here!');
  //   // res.write('<h1>this is my middleware at wrok</h1>');
  //   // res.end()
  //   next();
  //})
});
