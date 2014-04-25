/**
 * Created with JetBrains WebStorm.
 * User: Jinay Mehta
 * Date: 2/8/14
 * Time: 11:14 PM
 * To change this template use File | Settings | File Templates.
 */
var console = console ? console : {};

$(document).ready(function(){
    var lib = new AGRONALYSIS_HOME_LIB({});
    $(".left_side").disableSelection();
    $(".center_side").disableSelection();
    //$(document).tooltip();



    $(".cross_disc").on("click",function(){
        $(this).toggleClass("hyperactive");
        $(this).siblings(".cdt_desc").toggle();
        $(".cdtclass path").toggle();
        if(!$(this).hasClass("hyperactive")){
            $(".cross_disc_det span").removeClass("hyperactive");
            lib.cdt_enabled = false;
            lib.cdt_state = [];
            d3.selectAll(".cdtclass path")
                .style("fill","#CCCCCC")
                .style("stroke", "#fff")
                .style("opacity",1);
        }else{
            lib.cdt_enabled = true;
        }

        $(".cross_disc_det").toggle();
    });


    lib.drawFieldChart();
    lib.mapSwitch();
    lib.studyMap();


});