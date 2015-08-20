module.exports = function(){ 

this.show_supplier_popular_product = function (req, res, next) {
    req.services(function(err, services){
        var supplierData = services.supplierDataServ;
        
        supplierData
            .show_supplier_popular_product()
            .then(function(results) {
                res.render( 'supplier_popular_product', {
                    data : results,
                    administrator : administrator
                });
            })
            .catch(function(err){
                console.log(err);
            });
    });
};

this.show_supplier_profitable_product = function (req, res, next) {
    req.services(function(err, services){
        var supplierData = services.supplierDataServ;
        supplierData
        .show_supplier_profitable_product()
        .then(function(results) {
            if (err) return next(err);

            res.render( 'supplier_profitable_product', {
                data : results,
                administrator : administrator
            });
        }).catch(function(err){
            console.log(err)
        });
    });
};

this.show_all_suppliers = function(req, res, next){
    req.services(function(err, services){
        var supplierData = services.supplierDataServ;
        supplierData
        .show_all_suppliers()
        .then(function(results) {
            if (err) return next(err);

            res.render( 'all_suppliers', {
                data : results,
                administrator : administrator
            });
        })
        .catch(function (err) {
            console.log(err);
        });
    });
};

this.getSearchAllSuppliers = function(req, res, next){
    req.services(function(err, services){
        var supplierData = services.supplierDataServ;

        req.getConnection(function(err, connection){
            if(err){
                console.log(err);
                
                return next(err);
            }

            var searchValue = req.params.searchValue;
            supplierData.getSearchAllSuppliers(searchValue, function(err, results){
                    if (err){
                    return next(err);
                }

                res.render('suppliersList', {
                    username: req.session.user,
                    administrator: administrator,
                    data: results,
                    layout: false
                })
            });

        })
    })
};
}