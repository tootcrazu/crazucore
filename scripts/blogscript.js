// Hey. If you're looking at this code (and you are) and thinking "wow, why did they do it that way. That looks so so so stupid and inefficient!" that's because this is (quite literally) my first time writing any javascript from scratch. All things considered it's a miracle it functions at all.


    let chronoSort = 0;
    let hideGames = 0;
    let hideMoviesTV = 0;
    let hideMusic = 0;
    let hideRambling = 0;

    function toggleChronoSort() {
        if (chronoSort == 0) {
            document.getElementById("blog-entrycont").style.flexDirection = "column-reverse";
            document.getElementById("bc-sortbutton").innerHTML = "↑ Sort Newest First";
            chronoSort = 1;}
        else {document.getElementById("blog-entrycont").style.flexDirection = "column";
            document.getElementById("bc-sortbutton").innerHTML = "↓ Sort Oldest First";
            chronoSort = 0;}
    }

    // Switches number for button press
    function toggleGames() {
        if (hideGames == 0) {hideGames = 1}
        else {hideGames = 0;}
        updateAll();
    }

    function toggleMoviesTV() {
        if (hideMoviesTV == 0) {hideMoviesTV = 1}
        else {hideMoviesTV = 0;}
        updateAll();
    }

    function toggleMusic() {
        if (hideMusic == 0) {hideMusic = 1}
        else {hideMusic = 0;}
        updateAll();
    }

    function toggleRambling() {
        if (hideRambling == 0) {hideRambling = 1}
        else {hideRambling = 0;}
        updateAll();
    }

    // hides or shows all entries depending on their current setting
    function updateAll() {
        let gameEntries = document.getElementsByClassName("be-games");
        
        if (hideGames == 1){
            for (let i = 0; i < gameEntries.length; i++) {gameEntries[i].style.display = "none";
                document.getElementById("bc-gamefilter").innerHTML = "Show Games";
            }
        }
        else{
            for (let i = 0; i < gameEntries.length; i++) {gameEntries[i].style.display = "block";
                document.getElementById("bc-gamefilter").innerHTML = "Hide Games";
            }
        }


        let moviestvEntries = document.getElementsByClassName("be-moviestv");
        
        if (hideMoviesTV == 1){
            for (let i = 0; i < moviestvEntries.length; i++){moviestvEntries[i].style.display = "none";
                document.getElementById("bc-moviestvfilter").innerHTML = "Show Movies & TV";
            }
        }
        else{
            for (let i = 0; i < moviestvEntries.length; i++) {moviestvEntries[i].style.display = "block";
                document.getElementById("bc-moviestvfilter").innerHTML = "Hide Movies & TV";
            }
        }


        let musicEntries = document.getElementsByClassName("be-music");

        if (hideMusic == 1){
            for (let i = 0; i < musicEntries.length; i++){musicEntries[i].style.display = "none";
                document.getElementById("bc-musicfilter").innerHTML = "Show Music";
            }
        }
        else{
            for (let i = 0; i < musicEntries.length; i++) {musicEntries[i].style.display = "block";
                document.getElementById("bc-musicfilter").innerHTML = "Hide Music";
            }
        }


        let ramblingEntries = document.getElementsByClassName("be-rambling");

        if (hideRambling == 1){
            for (let i = 0; i < ramblingEntries.length; i++){ramblingEntries[i].style.display = "none";
                document.getElementById("bc-ramblingfilter").innerHTML = "Show Rambling";
            }
        }
        else{
            for (let i = 0; i < ramblingEntries.length; i++) {ramblingEntries[i].style.display = "block";
                document.getElementById("bc-ramblingfilter").innerHTML = "Hide Rambling";
            }
        }
    }

    function resetFilters() {
        hideGames = 0;
        hideMoviesTV = 0;
        hideMusic = 0;
        hideRambling = 0;
        updateAll()
    }