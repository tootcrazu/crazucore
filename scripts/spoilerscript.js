function spoilerReveal(id){
    let targetWall = document.getElementById("spoilwall" + id);
    let spoilRevealAnim = targetWall.animate([{filter:"opacity(92%)"}, {filter:"opacity(0%)"}], {duration:500, fill:"forwards"});
    targetWall.classList.add("_nointeract");
}