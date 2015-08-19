module.exports = function(){ 
this.show_product_profits = function (req, res, next) {
        req.services(function(err, services){
        var profitData = services.profitDataServ;
        profitData.show_product_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'product_profits', {
                data : results,
                administrator : administrator
            });
        });
    });
};

this.show_daily_profits = function(req, res, next){
    req.services(function(err, services){
        var profitData = services.profitDataServ;
        profitData.show_daily_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'daily_profits', {
                data : results,
                administrator : administrator
            });
        });
    });
};

this.show_category_profits = function(req, res, next){
        req.services(function(err, services){
        var profitData = services.profitDataServ;
        profitData.show_category_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'category_profits', {
                data : results,
                administrator : administrator
            });
        });
    });
};
}
