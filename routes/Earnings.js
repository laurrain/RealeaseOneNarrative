exports.show_product_earnings = function (req, res, next) {
    req.services(function(err, services){
        var earningData = services.earningDataServ;
    	earningData
        .show_product_earnings()
        .then(function(results){
            if (err) return next(err);

            res.render( 'product_earnings', {
                data : results,
                administrator : administrator
            });
       })
        .catch(function(err){
            console.log(err)
        });
    })
};

exports.show_category_earnings = function(req, res, next){
    req.services(function(err, services){
        var earningData = services.earningDataServ;
    earningData.show_category_earnings(function(err, results){
        if (err) return next(err);

            res.render( 'category_earnings', {
                data : results,
                administrator : administrator
            });
        });
    })
};

exports.show_products_price_cost = function (req, res, next) {
    req.services(function(err, services){
        var earningData = services.earningDataServ;
        earningData.show_products_price_cost(function(err, results){
            if (err) return next(err);

            res.render( 'products_price_cost', {
                data : results,
                administrator : administrator
            });
        });
    })
};
