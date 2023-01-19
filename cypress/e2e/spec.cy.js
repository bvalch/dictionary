///<referece types ="cypress"/>

describe("Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  //dont pass

  it("should render the navbar", () => {
    cy.get(".navContainer").should("exist");
  })

  it("should have a navbar with favorites",()=>{
    cy.get("a").first().should("have.text", " FAVOURITES ")

  })
  it("should have a navbar with search",()=>{
    cy.get("a").last().should("have.text", " SEARCH ")

  })

  it("should have the message area should be hidden if there is no error or message to display", () => {
    cy.get(".message").should("be.hidden");
  })
  it("should be able to navigate to search", () => {
    cy.get("a").last().click();
    cy.get(".search-bar").should("exist");
  })
  it("should be able to type in a word in the search bar", () => {
    cy.visit("http://localhost:3000/search")
      .get("#searchField")
      .type("banana")
      .get("#searchField")
      .should("have.value", "banana");
  })
  it("should be able to type in a word in the search bar and send a query", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".nodesContainer").should("exist");
  })
  it("should be able to add a definition to local storage", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.window().then((win) => {
      const favs = JSON.parse(win.localStorage.getItem("favs"));
      expect(favs).to.be.an("array");
      expect(favs[0].word).to.equal("banana");
    })
  })

  it("should display a delete button if word exists in local storage", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.get(".buttonSave").should("have.text", "Delete");
  })
  it("should revert delete button back to a save button once entry is deleted", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.get(".buttonSave").click();
    cy.get(".buttonSave").should("have.text", "Save this word");
  })
  it("should delete entry from local storage once delete button is pressed", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.get(".buttonSave").click();
    cy.window().then((win) => {
      const favs = JSON.parse(win.localStorage.getItem("favs"));
      expect(favs).to.be.empty
    });
  });
  it("should be able to fetch a word definition from the synonyms", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get("span").first().click().get("h1").should("have.text","twinkie")
  });
  it("should be able to fetch a word from the synonyms of the definition", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("white");
    cy.get("button").click();
    cy.get('.nodesContainer > :nth-child(14)').get(".synonym").first().click()
    cy.get("h1").should("have.text","fair")

  });
  it("should be able to fetch a word from the antonyms", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("white");
    cy.get("button").click();
    cy.get("span").last().click().get("h1").should("have.text","tanned")

  });

  it("should be able to visit the favorites section",()=>{
    cy.visit("http://localhost:3000/favs")
  })
    it("should have an empty favorites section when no favorites are present",()=>{
      cy.visit("http://localhost:3000/favs")
      cy.get(".favscontainer").should("have.text"," ")
      cy.window().then((win) => {
            expect(win.localStorage.length).to.eq(0)
          });
    });

    it("should display a favorite when a word is added to local storage",()=>{
      cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
      cy.get("button").click();
      cy.get(".buttonSave").click();

  })

  it("should display favorites when there are words in local storage", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.visit("http://localhost:3000/favs");
    cy.get(".favscontainer").should("have.text", " Xbanana");
  });

  it("should display multiple favorites when there are multiple words in local storage", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.get("#searchField").type("cucumber");
    cy.get("button").first().click();
    cy.get(".buttonSave").click();
    cy.visit("http://localhost:3000/favs");
    cy.get(".favscontainer")
      .get("li")
      .first()
      .should("have.text", "Xbanana");
    cy.get(".favscontainer")
      .get("li")
      .last()
      .should("have.text", "Xcucumber");
  });

  it("should have working delete button in favorites", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.visit("http://localhost:3000/favs");
    cy.get(".deletebutton").click();
    cy.window().then((win) => {
      const favs = JSON.parse(win.localStorage.getItem("favs"));
      expect(favs).to.be.empty;
    });
  });

  it("should display definition from favorites collection when clicking on the word", () => {
    cy.visit("http://localhost:3000/search").get("#searchField").type("banana");
    cy.get("button").click();
    cy.get(".buttonSave").click();
    cy.visit("http://localhost:3000/favs");

    cy.get(".favscontainer").get('button.deletebutton').last().parent().click()
    cy.get(".fav-def-container").find("div").should("have.length",18)

  });

  it("should display an error message for invalid input in search field",()=>{
    cy.visit("http://localhost:3000/search").get("#searchField").type("3");
    cy.get(".errorMessage").get("h2").should("have.text","Only letters allowed for input with no whitespaces")

  })
  it("should display an error message when trying to submit an empty query",()=>{
    cy.visit("http://localhost:3000/search").get("button").click()
    cy.get(".errorMessage").get("h2").should("have.text","Minimum one charachter required")
    

  })












});
