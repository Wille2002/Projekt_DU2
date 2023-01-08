



function click_filter_element(event) {

    if (event.target.className === "filter_container") {
        event.target.classList.add("selected")
        event.target.classList.remove("filter_container")
    } else {
        event.target.classList.remove("selected")
        event.target.classList.add("filter_container")
    }



    /*
      ARGUMENTS
        event: event-object created when user clicks on one of the filter elements.
  
      SIDE-EFFECTS
        Marks the clicked filter element as selected / unselected.
        Since a filter element will have changed after the click, the list of
        programmes must be updated.
  
  
      NO RETURN VALUE
  
    */

}



function create_filter_element(data) {


    let new_element = document.createElement("li")
    new_element.classList.add(data.class)
    new_element.textContent = data.textContent
    data.parent.append(new_element)

    new_element.addEventListener("click", click_filter_element)


    return new_element


    /*
      ARGUMENTS
        data: object that contains the following keys:
          class (string): a class-name given to the created element
          textContent (string): the text that the element contains
          parent (reference to HTML-element): the HTML-element that is the parent of the created element
  
        No control of arguments.
  
      SIDE-EFFECTS
        Creates a new dom-element with the tag "li".
        Gives the new dom-element the class contained in data.class
        Appends the new dom-element to the element referenced in data.parent
        Sets the text content of the new dom-element to data.textContent
        Sets the function click_filter_element as a listener to "click" for the new dom-element
  
      RETURN VALUE
        Returns a reference to the new dom-element
    */

}



function add_group_toggling(filter_container_dom) {

    /*
      ARGUMENT
        filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
              Exempel: the <ul> that contains the filters for Language.
  
      SIDE EFFECTS
        The function makes sure that when the user clicks on filter_container_dom, all the
        filter_elements that it contains are selected / unselected.
        Since some filter elements will have changed after the click, the list of
        programmes must be updated.
  
      NO RETURN VALUE
  
    */

}


function toggle_cities(event) {

    /*
  
      ARGUMENTS
        This function does not take any arguments
  
      SIDE EFFECTS
        This function checks the state of the first city-filter-element (Madrid).
        If it is selected then it de-selects ALL city-filter-elements
        If it is de-selected then it selects ALL city-filter-elements 
  
      NO RETURN VALUE
  
    */

}



function create_countries_cities_filters() {
    /*
    ARGUMENTS
   This function does not take any arguments.

    SIDE EFFECTS
    This function uses the function array_each to go through the array (COUNTRIES) 
    and for every object in the array it uses the function create_country.
     */


    function create_country(country) {
        /*
        ARGUMENTS
        country: an object from the array (COUNTRIES) that contains the following keys
        id, name of the country and imagesNormal. 

        SIDE EFFECTS
        This function creates "div" elements adds the classes ("country") & ("filter_container"),
        creates specific id`s for every "div" using the argument to get each country id, 
        refering to the HTML-element "#country_filter>ul" to append the variable. 

        Creates the HTML-elements <h1> and writing each specific country name using the argument to access 
        the key "name". Creates another HTML-element <ul> then adds the class "filter_list" to it,
        
        Then uses the function array_filter to go through the array (CITIES), and for each object in the array 
        uses the function test_function to test if the value of the key "countryID" in the array (CITIES) and the key 
        "id" from the objects in the array (COUNTRIES) is the same.
        */
        const dom = document.createElement("div");
        dom.classList.add("country");
        dom.classList.add("filter_container");
        dom.id = "country_" + country.id;
        document.querySelector("#country_filter > ul").append(dom);

        dom.innerHTML = `
        <h1>${country.name}</h1>
        <ul class="filter_list"></ul>
      `;

        const cities = array_filter(CITIES, test_function);
        function test_function(city) {
            return city.countryID === country.id;
        }

        array_each(cities, create_city);
    }
    function create_city(city) {
        /*
        ARGUMENTS
        city: an object from the array (CITIES) that contains the following keys
        id, name, countryID, sun and imagesNormal

        SIDE EFFECTS
        This function calls on the function create_filter_element with an object as argument
        with the keys "parent" which is a reference to the id´s of each of the countrys id´s. 
        the key "class" contains the class "selected" and the last key "textContent" which 
        contains the city name. 

        gives the variable which contains the function create_filter_element the same id as city id.
        */

        const dom = create_filter_element({
            parent: document.querySelector(`#country_${city.countryID} > ul`),
            class: "selected",
            textContent: city.name,
        });
        dom.dataset.id = city.id;

    }

    array_each(COUNTRIES, create_country);
}




function create_information_filter(array, filter_name) {
    /*
    ARGUMENTS
    array: takes an array and a filter name 

    SIDE EFFECTS
    Calls on the function array_each and array_each uses the function create_info.  
        */

    function create_info(filter) {
        /*
        ARGUMENTS
        filter: contains an objects information 

        SIDE EFFECTS
        creates a new variable which contains the function create_filter_element 
        then gives an id to the new variable using the argument. 

        */
        const dom = create_filter_element({
            parent: document.querySelector(`#${filter_name}_filter >ul`),
            class: "selected",
            textContent: filter.name
        })
        dom.dataset.id = filter.id
    }
    array_each(array, create_info)

}





function create_programme(programme) {



    let parent = document.querySelector("#programmes>ul")
    let divs = document.createElement("div")
    divs.classList.add("programme")

    divs.innerHTML = `<div><h3>${programme.name}</h3>
        ${UNIVERSITIES[programme.universityID].name}
        <br>
        ${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, 
        ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name}
        <br>
        ${LEVELS[programme.levelID - 1].name}, ${SUBJECTS[programme.subjectID].name}, ${LANGUAGES[programme.languageID].name}
        </div >
    <div class="bottom_programme">${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, sun-index: ${CITIES[UNIVERSITIES[programme.universityID].cityID].sun}</div>
`
    parent.append(divs)


    /*
     
      ARGUMENT
        programme (object): One of the objects from PROGRAMMES
     
      SIDE-EFFECTS
        This function creates the HTML-element that contains all the information
        about one programme, as seen in the video / image.
        
     
      NO RETURN VALUE
     
    */
}
array_filter(PROGRAMMES, create_programme)









function update_programmes() {

    addEventListener("click", update_programmes)

    let filters = read_filters(programmes);

    let program = document.querySelector("#programmes>ul")
    program.innerHTML = ""
    let p = document.querySelector("#programmes>p")
    if (filters.length >= 1) {
        p.innerHTML = ""
    } else {
        p.innerHTML = `<p>Inga program upfyller nuvarande filter.</p>`
    }

    array_each(filters, create_programme)








    /*
        NO ARGUMENTS
  
        SIDE EFFECTS
          This function updates the programmes shown on the page according to
          the current filter status (which filter elements are selected / unselected).
          It uses the function read_filters to know which programmes need to be included.
  
          
  
        NO RETURN VALUE
  
    */

}




/*
ARGUMENT
This function takes no arguments.

SIDE EFFECTS

This function creates a variable with all of the "li.selected" classes it can find. It then 
creates a new array, then it declares a function called Callback_add_cityID with one argument. It then uses the
new array to push in the id`s of li.selected. The code uses array_each to iterate though all of the cities in the 
li.selected elements with the function callback_add_cityID. 
The function then uses a for loop to go through the array city_id_selected, it then creates a new variable
that goes though every city in the in the array and creates a new array of universities that are located there using
a key from the array UNIVERSITIES. It then iterates though each university adding them to the array of univercitys if 
they have the same id as the cityID.

A new function is then declared called callback_add_programmes with one argument. it uses a for loop to go though 
all of the objects in the array PROGRAMMES to create an array of all the programs offered by the univercitys. 
If the univercityID in the array PROGRAMMES matches the id of a univercity it takes the programme and puts it in the programmes array. 
Then it calls on the function using array each to iterate thought the univercities.

The function callback_add_levelID works just the same as the callback_add_cityID function but instead of taking 
city id´s it takes level id´s. 

The function Test_function_level has one argument. It iterates though each of the objects in the array programmes 
with Test_function_level, and if level_id_selected, which is an array containing the level id`s includes levelID 
found in the programmes array it returns it and puts it in the programmes array.

Next we have the callback_add_languageID and the callback_add_subjectID that does the same thing as callback_add_cityID.
but with language and subject

The last bit of code iterates though the array that contains information of all of the arrays (programmes) and filters
out those that dont have a specific value with the function called test_funtion that has one argument. 

lastley read_filters returns the programmes array. 


*/



function read_filters() {

    const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

    const city_id_selected = [];
    function callback_add_cityID(dom_element) {
        const id_as_integer = parseInt(dom_element.dataset.id);
        city_id_selected.push(id_as_integer);
    }
    array_each(city_selected_dom, callback_add_cityID);

    const universities = [];
    for (let i = 0; i < city_id_selected.length; i++) {
        const city_id = city_id_selected[i];
        for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
            const university = UNIVERSITIES[ii];
            if (university.cityID === city_id) {
                universities.push(university);
            }
        }
    }

    let programmes = [];
    function callback_add_programmes(university) {
        const university_id = university.id;
        for (let i = 0; i < PROGRAMMES.length; i++) {
            const programme = PROGRAMMES[i];
            if (programme.universityID === university_id) {
                programmes.push(programme);
            }
        }
    }
    array_each(universities, callback_add_programmes);



    const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
    const level_id_selected = [];
    function callback_add_levelID(dom_element) {
        const id_as_integer = parseInt(dom_element.dataset.id);
        level_id_selected.push(id_as_integer);
    }
    array_each(level_selected_dom, callback_add_levelID);

    function test_function_level(programme) {
        return level_id_selected.includes(programme.levelID);
    }
    programmes = array_filter(programmes, test_function_level);



    const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
    const language_id_selected = [];
    function callback_add_languageID(dom_element) {
        const id_as_integer = parseInt(dom_element.dataset.id);
        language_id_selected.push(id_as_integer);
    }
    array_each(language_selected_dom, callback_add_languageID);



    function test_function_language(programme) {
        return language_id_selected.includes(programme.languageID);
    }
    programmes = array_filter(programmes, test_function_language);



    const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
    const subject_id_selected = [];
    function callback_add_subjectID(dom_element) {
        const id_as_integer = parseInt(dom_element.dataset.id);
        subject_id_selected.push(id_as_integer);
    }
    array_each(subject_selected_dom, callback_add_subjectID);



    function test_function_subject(programme) {
        return subject_id_selected.includes(programme.subjectID);
    }
    programmes = array_filter(programmes, test_function_subject);



    const search_string = document.querySelector("#search_field input").value;
    if (search_string !== "") {
        function test_function(programme) {
            return programme.name.includes(search_string);
        }
        programmes = array_filter(programmes, test_function);
    }

    return programmes;

}
