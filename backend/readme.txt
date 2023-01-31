More About Database Indexes

Compound index example:

productSchema.index({ category: 1, name: 1 });

we can use such index if one query covers two fields, for example: find products from laptops category and sort by name,

other possibilities:

find products from laptops category

find products from laptops category and name is like "Dell"

ind products from laptops category and name is like "Dell" order by name desc

The above compound index will not be used for query on "name" field alone, for example "find products where name is like Dell". So we need a separate index for this.


Single field index example:

productSchema.index({ category: 1 });
productSchema.index({ name: 1 });
If we want to find only by category or name



seeder is used for testing our app by creating fake data from mockaroo.com
seeder is just the dummy data to check how our application is going to work using real work Database