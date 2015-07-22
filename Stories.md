

###Nelisa wants to know what to order in bulk
* Nelisa wants to see the most popular product
  * How do we know the answer is right?
* Nelisa wants to see the most popular category
  * Use a test framework to prove your function works*
* Nelisa wants to see the least popular product & category 
  * always use a test framework!
 
Hint: You will need to capture the sales data in order to do these stories

### Nelisa wants to find out what is profitable
* Nelisa wants to see the earnings per category & product
* Nelisa wants to see the most profitable product & category

### Xolani wants to find out trends over time
<<<<<<< HEAD
* Story 6: Xolani wants to see the most regular sales 
<<<<<<< HEAD
* Story 7:  Xolani wants to see the stock levels going down the fastest & slowest - this is still nice, but then we need stock purchase history...
=======
* Story 7:  Xolani wants to see the stock levels going down the fastest & slowest
=======
* Xolani wants to see the most regular sales 
>>>>>>> 36a8a5daf4cba0337e8402e09261ff29d541823e
 
Hint: You will need to capture the purchase data in order to calculate stock levels.
>>>>>>> 17fa67c2f5c34e5abfab5779569f32d0cd46353d

---

### Xolani wants to know the sales trends per day and week.
Know that he knows the most regular sales, Xolani realises that he also needs to see what the average sales are.
* Xolani wants to see the average total sales per day & week
* Xolani wants to see the average sales per day & week per category & product
* Xolani wants to see the stock levels going down the fastest & slowest
Which days are the most profitable?

### Nelisa wants to see her stock info wherever she is

* Nelisa wants to see the average sales figures on a web page.

### Xolani would like to have standard orders to simplify his admin
Now that we know what we should be ordering, Xolani think it would be great to have standard orders. For this we need to know which supplier we purchase each item from.

* Which supplier is supplying the most popular product.
* Which supplier is supplying the most profitable product.

### Nelisa wants to adds data

* Add support for adding products and product categories
* Add support for adding sales data
* Add support for adding purchase data
* Be sure that all the add screens have data validation
*  Add Update and Delete support for all the above screens
 
### Nelisa wants to limit access to her shop’s data

Now that the system is working so well and Xolani can add products, purchase and sales data to the system, Nelisa is concerned about what different people can do in the system. She wants administrators to be able to add new data and others only to access the reporting functionality in the system.

* Administrators can only use the system once they are logged in.
* Add two roles to the system - one roles for people who can only see sales reports and another role for an administrator that can do everything in the system.
* After logging in, the site should remember the person’s credentials.


### Nelisa wants to the navigation to be simpler

* Nelisa wants her experience more seamless with less visible screen refreshes.
* Nelisa wants to view the products list screen with a very smooth transition when searching for products by product name or category.

### Nelisa wants to share a list of products she wants to order from each supplier

Nelisa went to a networking event and spoke to others running a spaza shop system. They already have systems of their own - but they are interested in working together to place their orders in bulk.

* Nelisa wants to create a list of products to order from each supplier
* Nelisa wants her lists to be visible to other Spaza shop owners in the network

### Stretch goals
* Add the ability for people to access the system without using screens. (Create an API)
* Single Page App support (SPA)
  * this is all about using client side Handlebars template 
  * potentially paving the way to write Mobile Phone App in JS using javascript
  * one can have SPA apps in the browser as well with the application using data via the API
