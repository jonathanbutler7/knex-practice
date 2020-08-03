const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: "postgresql://dunder_mifflin@localhost/knex-practice",
});

// knexInstance
//   .from("shopping_list")
//   .select("*")
//   .then((result) => {
//     console.log(result);
//   });

function searchByProductName(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => console.log(result));
}

function addedDaysAgo(daysAgo) {
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then((results) => {
      console.log(results);
    });
}

function costPerCategory() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log(result);
    });
}

// searchByProductName("sandwich");
// paginateProducts(2)
// addedDaysAgo(5);
costPerCategory()
