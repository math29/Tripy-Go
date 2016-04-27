'use strict';

var _ = require('lodash');


// Get list of transports
exports.index = function(req, res) {
  var matchQuery = {
    'distance':{}
  };
  if(req.query.min_dist){
    matchQuery.distance['$gt'] = Number(req.query.min_dist);
  }
  if(req.query.max_dist){
    matchQuery.distance['$lt'] = Number(req.query.max_dist);
  }
  if(req.query.min_date){
    matchQuery.date_departure = {};
    matchQuery.date_departure['$gte'] = new Date(req.query.min_date);
  }
  if(req.query.max_date){
    if(!matchQuery.date_departure)matchQuery.date_departure = {};
    matchQuery.date_departure['$lte'] = new Date(req.query.max_date);
  }

  global.mongo_connection.collection('transports')
    .aggregate(
        {$match: matchQuery},
        {$group: {
            _id:'$departure',
            'avg_cost':{$avg: '$cost'},
            'avg_dist':{$avg: '$distance'},
            'dest': {$push : '$arrival'}
          }}, function(err, aggregation){
            if(err){
              return res.status(500).send("ERROR");
            }

            var locations = [];
            // pour chaque transport, ajout de la destination de départ dans la liste des locations
            for(var i = 0; i < aggregation.length; i++){
              var localTransport = aggregation[i];
              locations.push(localTransport._id);
              // pour chaque destination dans cet agrégat, on ajoute à la liste des transports
              for(var j = 0; j < localTransport.dest.length; j++){
                locations.push(localTransport.dest[j]);
              }
            }

            // filtrer le tableau pour n'avoir qu'une seule fois la location
            locations = _.uniq(locations);

            // récupération des locations à partir de leurs ids
            findLocations(locations, function(locationsArray){
              if(locationsArray == []){
                return res.status(500).send("ERROR");
              }
              console.log(locationsArray);
              for(var l = 0; l < aggregation.length; l++){
                var localAg = aggregation[l];
                localAg.departure = locationsArray[_.findIndex(locationsArray, function(o) { return String(o._id) == String(localAg._id); })];
                delete localAg._id;

                for(var j = 0 ; j < localAg.dest.length; j++){
                  console.log('J: '+j + ' obj: '+ localAg.dest[j]);
                  var fi = _.find(locationsArray, function(o) {
                    return String(o._id) == String(localAg.dest[j]); });
                  if(fi){
                    localAg.dest[j] = fi;
                  }
                }

              }
              return res.status(200).send(aggregation);

              console.log("OK");
            })
          });
  //return res.status(200).send("[]");
};


/**
 * Requête de recherche des locations en base de donnée
 *
 * @param locationsId tableau des Ids des locations
 * @param callback fonction de retour
 */
var findLocations = function(locationsId, callback) {
  var locationArray = [];
  // curseur de la requête
  var cursor =global.mongo_connection.collection('locations').find( {_id: {$in: locationsId}} );
  // parcours du curseur
  cursor.each(function(err, doc) {
    if(err){
      calback([]);
    }
    if (doc != null) {
       locationArray.push(doc);
    } else {
       callback(locationArray);
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
