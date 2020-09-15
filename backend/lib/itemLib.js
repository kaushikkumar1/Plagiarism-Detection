exports.getAllItems = function (itemModel, cb) {
    console.log('Getting All Items');
    var query = {}; // get all
    itemModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
};

// { path: 'fans', select: 'name' }
exports.getAllItemsWithPopulate = function (itemModel, populateJson, cb) {
    console.log('Getting All Items With Populate');
    var query = {}; // get all
    itemModel.find(query).populate(populateJson).exec(function (err, allDBItems) {
        cb(err, allDBItems);
    });
};

exports.getItemById = function(id, itemModel, cb){
    console.log('Getting Single item with ID '+id);
    itemModel.findById(id, function (err, singleDBItem) {
        cb(err, singleDBItem);
    });
}

exports.getItemByQuery = function(query, itemModel, cb){
    console.log('Getting item with Query '+JSON.stringify(query));
    itemModel.find(query, function (err, allDBItems) {
        if(err)
            console.log("ERROR: "+err);
        cb(err, allDBItems);
    });
}

exports.getSingleItemByQuery = function(query, itemModel, cb){
    console.log('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query, function (err, singleItem) {
        if(err)
            console.log("ERROR: "+err);
        cb(err, singleItem);
    });
}

exports.getSingleItemByQueryAndSortedOnField = function(query, fieldName, itemModel, cb){
    console.log('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query).sort(fieldName).exec(function (err, singleItem) {
        if(err)
            console.log("ERROR: "+err);
        cb(err, singleItem);
    });
}

exports.createitem = function (itemDetails, itemModel, cb) {
    console.log('Create New item for ' + JSON.stringify(itemDetails));
    var ti = new itemModel(itemDetails);
    ti.save(function (err) {
        if(err)
            console.log("ERROR "+ err);
        cb(err, ti);
    });
};

exports.updateItem = function (itemDetails, itemModel, cb) {
    console.log('Edit Resource ' + itemDetails.id);
    console.log("MODEL: "+ JSON.stringify(itemModel))
    itemModel.findById(itemDetails.id, function (err, qObj) {
        if (err || !qObj)
            cb(err, null);
        else {
            if (itemDetails._id)
                delete itemDetails._id;

            console.log(JSON.stringify(itemDetails));
            for (var p in itemDetails) {
                //console.log(itemDetails[p])
                if(itemDetails[p])
                    qObj[p] = itemDetails[p];
            }

            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};


exports.deleteItem = function (id, softDelete, itemModel, cb) {
    console.log('Delete Resource ' + id);
    cb(null, null); // Disabled Delete
    /*
    if(!softDelete){
        itemModel.findByIdAndDelete(id, cb);
    }
    else{
        itemModel.findById(id, function (err, qObj) {
            if (err)
                cb(err, null);
            else {
                qObj.isDeleted = true;
                // Save Updated Statement
                qObj.save(function (err) {
                    cb(err, qObj);
                });
            }
        });
    }
    */
};