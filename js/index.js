"use strict";






// Create Filter Elements
create_information_filter(LEVELS, "level");
create_information_filter(SUBJECTS, "subject");
create_information_filter(LANGUAGES, "language");

create_countries_cities_filters();

// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();

