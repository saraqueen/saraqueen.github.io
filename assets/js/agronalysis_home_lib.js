/**
 * Created with JetBrains WebStorm.
 * User: Jinay
 * Date: 2/8/14
 * Time: 11:21 PM
 * To change this template use File | Settings | File Templates.
 */

var console = console ? console : {log: function () {}, dir: function () {} };
var AGRONALYSIS_HOME_LIB = (function(){
    var lib = function(valuesArg){
         this.people_overload = $("#people_overload").remove();
         this.course_overload = $("#course_overload").remove();
         this.project_overload = $("#project_overload").remove();
         this.chart_state = [];
         this.content_chart_state = [];
         this.clicked_state = false;
         this.cdt_enabled = false;
         this.cdt_state = [];
         //this.chart_object_name = "CHART_OBJECT";
         //this.chart_object_URL = "http://152.46.20.113:5000/chartdata";
        this.server = SEEDINGFOODSTUDY_SERVERS.prod;
        this.chart_object_URL = this.server+"/chartdata";
        this.crossrefence_data_URL = this.server+"/crossref/";
        this.cdt_data_URL = this.server+"/cdt";
        this.get_content_data_URL = this.server+"/contentdata/"
         //this.whenclick_li = $("#whenclick li").remove();
         this.als_list_id = "#content-als-list";
         this.als_list = $(this.als_list_id).remove();
         this.prev_clicked_jquery = null;
         this.group_keys = ["F1","F2","F3","F4","F5","F6","F7","F8","F9"];
         this.cdt = ["SOCIAL EQUITY","PUBLIC POLICY","FOOD ACCESS","CULTURAL HERITAGE","HEALTH NUTRITION","SUSTAINABILITY","ENVIORNMENTAL IMPACTS","ECONOMIC DEVELOPMENT","EDUCTAION"];
         this.switch = 0;
    };
    lib.prototype = {
        constructor: lib,

        drawFieldChart : function(){
        var values = {
            width: 780,
            height: 740
        };
            this.fieldChart(values);

        },


        fieldChart : function(values){
            var that = this;
            var width = values.width,
                height = values.height,
                radius = Math.min(width, height) / 2,
                color = d3.scale.category20c();

            var count = 0;

            var end_space_keys = ["F1","F1_R1","F1_R1_I1","F2","F2_R1","F2_R1_I1","F3","F3_R1","F3_R1_I1",
                                    "F4","F4_R1","F4_R1_I1","F5","F5_R1","F5_R1_I1","F6","F6_R1","F6_R1_I1",
                                    "F7","F7_R1","F7_R1_I1","F8","F8_R1","F8_R1_I1","F9","F9_R1","F9_R1_I1"];


            var start_space_keys = ["F1","F1_P1","F1_P1_I1","F2","F2_P1","F2_P1_I1","F3","F3_P1","F3_P1_I1",
                                    "F4","F4_P1","F4_P1_I1","F5","F5_P1","F5_P1_I1","F6","F6_P1","F6_P1_I1",
                                    "F7","F7_P1","F7_P1_I1","F8","F8_P1","F8_P1_I1","F9","F9_P1","F9_P1_I1"];

            var start_cdt_space_keys = ["CDT1_F1_P1","CDT2_F1_P1","CDT3_F1_P1","CDT4_F1_P1","CDT5_F1_P1","CDT6_F1_P1","CDT7_F1_P1","CDT8_F1_P1","CDT9_F1_P1",
                "CDT1_F2_P1","CDT2_F2_P1","CDT3_F2_P1","CDT4_F2_P1","CDT5_F2_P1","CDT6_F2_P1","CDT7_F2_P1","CDT8_F2_P1","CDT9_F2_P1",
                "CDT1_F3_P1","CDT2_F3_P1","CDT3_F3_P1","CDT4_F3_P1","CDT5_F3_P1","CDT6_F3_P1","CDT7_F3_P1","CDT8_F3_P1","CDT9_F3_P1",
                "CDT1_F4_P1","CDT2_F4_P1","CDT3_F4_P1","CDT4_F4_P1","CDT5_F4_P1","CDT6_F4_P1","CDT7_F4_P1","CDT8_F4_P1","CDT9_F4_P1",
                "CDT1_F5_P1","CDT2_F5_P1","CDT3_F5_P1","CDT4_F5_P1","CDT5_F5_P1","CDT6_F5_P1","CDT7_F5_P1","CDT8_F5_P1","CDT9_F5_P1",
                "CDT1_F6_P1","CDT2_F6_P1","CDT3_F6_P1","CDT4_F6_P1","CDT5_F6_P1","CDT6_F6_P1","CDT7_F6_P1","CDT8_F6_P1","CDT9_F6_P1",
                "CDT1_F7_P1","CDT2_F7_P1","CDT3_F7_P1","CDT4_F7_P1","CDT5_F7_P1","CDT6_F7_P1","CDT7_F7_P1","CDT8_F7_P1","CDT9_F7_P1",
                "CDT1_F8_P1","CDT2_F8_P1","CDT3_F8_P1","CDT4_F8_P1","CDT5_F8_P1","CDT6_F8_P1","CDT7_F8_P1","CDT8_F8_P1","CDT9_F8_P1",
                "CDT1_F9_P1","CDT2_F9_P1","CDT3_F9_P1","CDT4_F9_P1","CDT5_F9_P1","CDT6_F9_P1","CDT7_F9_P1","CDT8_F9_P1","CDT9_F9_P1"];

            var svg = d3.select("#field_chart").append( "svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("id","container")
                .attr("transform", "translate(" + width / 2 + "," + height * .5 + ")");


            var partition = d3.layout.partition()
                .size([2 * Math.PI, radius * radius])
                .value(function(d) {
                    return d.size; });


            var arc = d3.svg.arc()
                .startAngle(function(d) {

                    //console.log("Start: "+ d.id+" dx - "+d.dx+" size = "+d.size);
                    if(start_space_keys.indexOf(d.id) > -1){
                        return d.x + 0.02;
                    }

                    return d.x; })
                .endAngle(function(d) {
                    //console.log("End: "+ d.id+" dx - "+d.dx+" size = "+d.size);
                    /*if(d.x > 0 && end_space_keys.indexOf(d.id) > -1){
                        return d.x+ d.dx - 0.02;
                    }*/
                    return d.x + d.dx; })
                .innerRadius(function(d) {
                    //var t = Math.round(Math.sqrt(d.y));
                    //console.log("IN: "+t+" - "+ d.depth);
                    switch(d.depth){
                        case 1:
                            return 278;
                        case 2:
                            return 263;
                        case 3:
                            return 210;
                        default :
                            return Math.round(Math.sqrt(d.y));
                    }
                    })
                .outerRadius(function(d) {
                    //var t = Math.round(Math.sqrt(d.y + d.dy));
                    //console.log("OUT: "+t+" - "+ d.depth);
                    switch(d.depth){
                        case 0:
                            return 0;
                        case 1:
                            return 285;
                        case 2:
                            return 275;
                        case 3:
                            return 260;
                        default :
                            return Math.round(Math.sqrt(d.y + d.dy));
                    }
                     });


            var arc2 = d3.svg.arc()
                .startAngle(function(d) {

                    //console.log("Start: "+ d.id+" dx - "+d.dx+" size = "+d.size);
                    if(start_cdt_space_keys.indexOf(d.id) > -1){
                        return d.x + 0.02;
                    }

                    return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) {
                    //var t = Math.round(Math.sqrt(d.y));
                    //console.log(d.id+" - IN : "+t+" - "+ d.depth);
                    switch(d.depth){
                        case 3:
                            return 303;
                        case 4:
                            return 310;
                        case 5:
                            return 317;
                        case 6:
                            return 324;
                        case 7:
                            return 331;
                        case 8:
                            return 338;
                        case 9:
                            return 345;
                        case 10:
                            return 352;
                        case 11:
                            return 359;
                        default:
                            return Math.round(Math.sqrt(d.y));
                    }

                })
                .outerRadius(function(d) {
                    //var t = Math.round(Math.sqrt(d.y + d.dy));
                    //console.log(d.id+" - OUT : "+t+" - "+ d.depth);
                    switch(d.depth){
                        case 3:
                            return 308;
                        case 4:
                            return 315;
                        case 5:
                            return 322;
                        case 6:
                            return 329;
                        case 7:
                            return 336;
                        case 8:
                            return 343;
                        case 9:
                            return 350;
                        case 10:
                            return 357;
                        case 11:
                            return 364;
                        default:
                            return Math.round(Math.sqrt(d.y + d.dy));

                    }
                });




            svg.append("circle")
                .attr("r", radius)
                .style("opacity", 0);

            d3.json(this.chart_object_URL,parse_JSON);

            function parse_JSON(error,root){
                //nodes = partition.nodes(root);//.reverse();
                //console.log(root);
                if(error != null){
                    console.log(error);
                }

                d3.select("#load").style("visibility","hidden");

                var outer_g = svg.datum(root).selectAll("g")
                                .data(partition.nodes.sort(null))
                                .enter().append("g")
                                .attr("class","func")
                                .append("path")
                                .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
                                .attr("id",function(d){return d.id})
                                .attr("title",function(d){return d.name})
                                .attr("d", arc)
                                .style("fill", function(d) {
                                    return "#"+d.color;
                                })
                                .style("stroke", "#fff")
                                .style("opacity",1)
                                .on("mouseover",mouseover)
                                .on("click",mouseclick);


                defaultText();



                 svg.selectAll("g")
                 .filter(function(d){
                 //console.log(d);
                 return (d.depth>0 && d.depth < 3);
                 })
                 .attr("overflow","hidden")
                 .append("text")
                 .attr("x", 6)
                 .attr("dy", function(d){
                         switch(d.depth){
                             case 1: return -3;
                             case 2: return 11;
                             //case 3: return 2;
                             default: return 0;
                         }
                     })
                 .attr("text-anchor","start")
                 .attr("fonts-family","Klavika Bold")
                 .style("fill",function(d){
                         switch(d.depth){
                             case 1: return d.color;
                             case 2: return "#fff";
                         }
                     })
                 .append("textPath")
                 .attr("xlink:href", function (d) { return "#"+d.id; })
                 .text(function (d) {
                         return labelText(d);
                 }).on("mouseover",mouseover);

            }

            d3.select("#container").on("mouseleave", mouseleave);
            d3.select(".btn-circle").on("click", mousedblclick);
            cdtclicked();


            //svg.selectAll("path")

            function mouseover(d){
                // Fade all the segments.

                d3.select("#header_data")
                  .text(d.header_text);


                d3.select("#mid_data")
                    .text(d.mid_text);

                d3.select("#content_data")
                    .text(d.content_text);

                d3.select("#whenhover")
                    .style("visibility", "");

                d3.select("#whenclick")
                    .style("visibility", "hidden");

                d3.selectAll(".func path")
                    .filter(function(d){
                        if($.inArray(d.id,that.chart_state) == -1){
                            return true;
                        }
                    })
                    .style("opacity", 0.3);


                if(that.cdt_enabled){
                    d3.selectAll(".cdtclass path")
                        .style("fill","#CCCCCC")
                        .style("stroke", "#fff")
                        .style("opacity",1);

                    $(".cross_disc_det span").removeClass("hyperactive");
                }

                var parentArray = getAncestors(d);
                if(d.depth == 2){
                    parentArray = parentArray.concat(getChildren(d));
                }

                // Then highlight only those that are an ancestor of the current segment.

                svg.selectAll(".func path")
                    .filter(function(node) {
                            return(parentArray.indexOf(node)>=0);
                    })
                    .style("opacity", 1);


            }

            function mouseleave(d){

                d3.selectAll("#field_chart path").on("mouseover", null);

                // Transition each segment to full opacity and then reactivate it.
                d3.selectAll("#field_chart .func path")
                    .transition()
                    .duration(1000)
                    .style("opacity", 1)
                    .each("end", function() {
                        d3.select(this).on("mouseover", mouseover);
                    });

                d3.select("#whenhover")
                    .transition()
                    .duration(1000)
                    .style("visibility", "hidden");


                if(that.cdt_enabled){
                    d3.selectAll(".cdtclass path")
                        .style("fill","#CCCCCC")
                        .style("stroke", "#fff")
                        .style("opacity",1);

                    $(".cross_disc_det span").removeClass("hyperactive");

                     d3.selectAll(".cdtclass path")
                       .filter(function(cdt){
                             if($.inArray(cdt.id,that.cdt_state) > -1){
                                return true;
                             }
                         }).style("fill","#F7921E")
                         .style("stroke", "#fff")
                         .style("opacity",1);
                    var carray = [];
                    $.each(that.cdt_state,function(i,l){
                        var str = l.substring(0,4);
                        console.log(str);
                        if($.inArray(str,carray) == -1){
                           carray.push(str);
                            var id = "#"+str;
                            $(id).addClass("hyperactive");
                        }
                    });
                }


                if(that.clicked_state){

                    d3.select("#whenclick")
                        .style("visibility", "");

                    var t_array = that.chart_state.concat(that.content_chart_state);




                    d3.selectAll("#field_chart .func path")
                        .filter(function(d){
                            if($.inArray(d.id,t_array) > -1){
                                return true;
                            }
                        })
                        .transition()
                        .duration(1000)
                        .style("opacity", 1)
                        .each("end", function() {
                            d3.select(this).on("mouseover", mouseover);
                        });


                    d3.selectAll("#field_chart .func path")
                        .filter(function(d){
                            if($.inArray(d.id,t_array) == -1){
                                return true;
                            }
                        })
                        .transition()
                        .duration(1000)
                        .style("opacity", 0.3)
                        .each("end", function() {
                            d3.select(this).on("mouseover", mouseover);
                        });
                }else{

                    defaultText();
                d3.select("#whenclick")
                    .transition()
                    .duration(1000)
                    .style("visibility", "hidden");

                }

            }

            function mouseclick(node){
                that.cdt_state = [];
                that.clicked_state = true;
                that.content_chart_state = [];
                //$("#overload_block").remove();
                switch(node.depth){
                    case 3:
                        d3.select("#whenhover")
                            .transition()
                            .duration(1000)
                            .style("visibility", "hidden");
                        $("#overload_info").hide();

                        d3.select(that.als_list_id).remove();
                        that.als_list.clone().appendTo("#whenclick");


                        var click_node = d3.select("#whenclick").select("ul");
                        var divs = click_node.selectAll("li")
                                             .data(node.content).enter()
                                             .append("li")
                                             .attr("class","als-item")
                                             .append("a")
                                             .attr("href","javascript:void(0)")
                                             .on("click",content_clicked);

                        divs.append("div")
                            .text(function(d){
                                if(d.i_header_text == "" || d.i_header_text == "0"){
                                    return "";
                                }else if(d.i_header_text.length>60){
                                    return d.i_header_text.substring(0,60)+" ...";
                                }else{
                                    return d.i_header_text;
                                }
                            });

                        divs.append("div")
                            .text(function(d){
                                if(d.i_content_text == "" || d.i_content_text == "0"){
                                    return "";
                                }else if(d.i_content_text.length>60){
                                    return d.i_content_text.substring(0,60)+" ...";
                                }else{
                                    return d.i_content_text;
                                }
                            });



                        d3.select("#whenclick")
                            .style("visibility", "");


                        $(that.als_list_id).als({
                            visible_items: 3,
                            scrolling_items: 2,
                            orientation: "vertical"
                        });

                        break;
                    default :
                        d3.select("#header_data")
                            .text(node.header_text);

                        d3.select("#content_data")
                            .text(node.content_text);

                        d3.select("#whenhover")
                            .style("visibility", "");

                        break;
                }



                // Fade all the segments.
                d3.selectAll(".func path")
                    .style("opacity", 0.3);

                var parentArray = getAncestors(node);
                var state = [];

                //getChildren(d,childArray);

                // Then highlight only those that are an ancestor of the current segment.
                svg.selectAll("path")
                    .filter(function(node) {
                        if(parentArray.indexOf(node)>=0){
                            state.push(node.id);
                            return(true);
                        }
                        //return ((parentArray.indexOf(node) >= 0 && node.depth>=2) || childArray.indexOf(node) >= 0);
                    })
                    .style("opacity", 1);

                that.chart_state = state;
               // console.log(that.chart_state);
               // console.log("Exit Click");
            }

            function mousedblclick(d){
                console.log("Dbl click Enter");
                that.chart_state = [];
                that.content_chart_state = [];
                that.clicked_state = false;
                that.cdt_state = [];
                $("#overload_block").remove();
                $("#overload_info").hide();
                if(that.prev_clicked_jquery != null){
                    that.prev_clicked_jquery.removeClass("active");
                    that.prev_clicked_jquery = null;
                }


                d3.select("#whenclick")
                    .transition()
                    .duration(1000)
                    .style("visibility", "hidden");
                d3.select(that.als_list_id).remove();

                mouseleave(d);

                defaultText();
                console.log("Dbl click Enter");

            }

            function content_clicked(d){
                $("#overload_block").remove();
                that.content_chart_state = [];
                that.cdt_state = []

                mouseleave(d);

                that.cdt_state = d.cdt;
                d3.json(that.crossrefence_data_URL+ d.i_header_text,function(error,root){
                    var path_ids = root.data;
                    var cdt_path_ids = root.cdt;
                    that.content_chart_state = path_ids;
                    that.cdt_state = that.cdt_state.concat(cdt_path_ids);

                    mouseleave(d);
                });

                if(that.prev_clicked_jquery != null){
                    that.prev_clicked_jquery.removeClass("active");
                }
                $(this).parent().addClass("active");
                that.prev_clicked_jquery = $(this).parent();
                create_overload_info(d);


            }

            //d3.select(".cross_disc").on("click",cdtclicked);

            function cdtclicked(){
                d3.json(that.cdt_data_URL,function(error,root){
                    svg.append("g").attr("class","cdtclass").datum(root).selectAll("g")
                        .data(partition.nodes.sort(null))
                        .enter().append("g")
                        .filter(function(d){
                            return d.visible ? true : false;
                        })
                        .append("path")
                        .attr("display", function(d) {
                            //console.log(d.id+": "+ d.visible);
                            return "none"; })
                        .attr("id",function(d){return d.id})
                        .attr("d", arc2)
                        .style("fill", "#CCCCCC")
                        .style("stroke", "#fff")
                        .style("opacity",1);


                });
            }
            // Given a node in a partition layout, return an array of all of its ancestor
            // nodes, highest first, but excluding the root.
            function getAncestors(node) {
                var path = [];
                var current = node;
                while (current.parent) {
                    path.unshift(current);
                    current = current.parent;
                }
                return path;
            }

            function create_overload_info(d){

                switch(d.i_type){
                    case "people":

                        var block = that.people_overload.clone();
                        block.attr("id","overload_block");
                        block.find("#people_header").text(d.i_header_text);
                        block.find("#people_desc").text(d.i_content_text);
                        if(d.i_degree_text != "" && d.i_degree_text != "0"){
                            block.find("#degree_title").text("Degrees: ");
                            block.find("#degree").text(d.i_degree_text);
                        }
                        if(d.i_department != "" && d.i_department != "0"){
                            block.find("#dept_title").text("Department: ");
                            block.find("#dept").text(d.i_department);
                        }
                        if(d.i_college != "" && d.i_college != "0"){
                            block.find("#coll_title").text("College: ");
                            block.find("#coll").text(d.i_college);
                        }
                        if(d.i_courses.length > 0){
                            block.find("#course_title").text("Courses: ");
                            for (var i=0;i<d.i_courses.length;i++){
                                block.find("#courses").append($("<li></li>").text(d.i_courses[i].course_no+" : "+ d.i_courses[i].course_title));
                            }
                        }

                        var f_array = [];
                        for(var i=0;i< d.i_focus.length;i++){
                            f_array.push(capitalize(d.i_focus[i]));
                        }
                        block.find("#people_focus").text(f_array.join(", "));

                        if(d.i_projects.length > 0){
                            block.find("#project_title").text("Projects: ");
                            for(var i=0;i<d.i_projects.length;i++){
                                block.find("#projects").append($("<li></li>").text(d.i_projects[i].project_title));
                            }
                        }



                        $("#overload_info").append(block);
                        break;
                    case "courses":
                        var block = that.course_overload.clone();
                        block.attr("id","overload_block");
                        block.find("#course_header").text(d.i_header_text);
                        block.find("#course_desc").text(d.i_content_text);
                        if(d.i_professor != "" && d.i_professor != "0"){
                            block.find("#prof_title").text("Professor: ");
                            block.find("#prof").text(d.i_professor);
                        }
                        if(d.i_keywords != "" && d.i_keywords != "0"){
                            block.find("#key_title").text("Keywords/Topics: ");
                            block.find("#keywords").text(d.i_keywords);
                        }
                        var f_array = [];
                        for(var i=0;i< d.i_focus.length;i++){
                            f_array.push(capitalize(d.i_focus[i]));
                        }
                        block.find("#course_focus").text(f_array.join(", "));
                        if(d.cdt.length>0){
                            block.find("#course_cdt_title").text("Inter-Disciplinary Themes: ");
                            var strs = [];
                            for(var i=0;i< d.cdt.length;i++){
                                var index = parseInt(d.cdt[i].substring(3,4));
                                strs.push(capitalize(that.cdt[index-1]));
                            }
                            block.find("#course_cdt").text(strs.join(", "));
                        }



                        $("#overload_info").append(block);
                        break;
                    case "projects":
                        var block = that.project_overload.clone();
                        block.attr("id","overload_block");
                        block.find("#project_header").text(d.i_header_text);
                        block.find("#pi").text(d.i_content_text);
                        if(d.i_ncsu_team != "" && d.i_ncsu_team != "0"){
                            block.find("#rt_title").text("Research Team at NCSU: ");
                            block.find("#research").text(d.i_ncsu_team);
                        }
                        if(d.i_start_date !="" && d.i_start_date != "0" && d.i_end_date!="" && d.i_end_date!="0"){
                            block.find("#date_title").text("Dates: ");
                            block.find("#date").text(d.i_start_date+" - "+ d.i_end_date);
                        }
                        if(d.i_website != "" && d.i_website != "0"){
                            block.find("#web_title").text("Website: ");
                            block.find("#web").text(d.i_website);
                            block.find("#web").attr("href",d.i_website);
                        }
                        var f_array = [];
                        for(var i=0;i< d.i_focus.length;i++){
                            f_array.push(capitalize(d.i_focus[i]));
                        }
                        block.find("#project_focus").text(f_array.join(", "));
                        if(d.cdt.length>0){
                            block.find("#project_cdt_title").text("Inter-Disciplinary Themes: ");
                            var strs = [];
                            for(var i=0;i< d.cdt.length;i++){
                                var index = parseInt(d.cdt[i].substring(3,4));
                                strs.push(capitalize(that.cdt[index-1]));
                            }
                            block.find("#project_cdt").text(strs.join(", "));
                        }

                        $("#overload_info").append(block);
                        break;
                }
                $("#overload_info").show();
            }


            function labelText(node){
                var trail = "..";
                var size = Math.floor(node.value/2);

                    //console.log(node.id+" : "+size);
                    switch(size){

                        case 0: case 1:
                            size = 0;
                            trail = "";
                            break;
                        case 2:
                            size = 1;
                            trail = "";
                            break;
                        case 3:case 4:
                            size = 2;
                            trail = ".";
                            break;
                        case 5:case 6:
                            size = 3;
                            trail = "..";
                            break;

                    }


                if(size < node.name.length){
                    return node.name.substring(0,size)+trail;
                }
                return node.name;
            }

            function defaultText(){
                /*d3.select("#header_data")
                    .text("Overview Definition of the Food System");
                */
                d3.select("#header_data").text("");
                d3.select("#content_data")
                    .text("The food system consists of the interconnected processes and resources required to grow, " +
                        "ship, process, and deliver the food we eat. This system can be broken down into segments of " +
                        "activity, each an area of study its own right, from food production to waste management and " +
                        "all the linking elements in between.");

                d3.select("#mid_data")
                    .text("");

                d3.select("#whenhover")
                    .transition()
                    .duration(1000)
                    .style("visibility", "")

            }

            function getChildren(node){
                var child = [];
                child.push(node.children[0]);
                return child;
            }

            function capitalize(string)
            {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }


},

        studyMap : function(){
        },

        mapSwitch : function(){
            var that = this;
            var width = 100;
            var height = 100;
            var radius = Math.min(width, height) / 2;

            var svg = d3.select("#map_switch").append("svg:svg")
                .attr("width", width)
                .attr("height", height)
                .append("svg:g")
                .attr("id", "switch_container")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var partition = d3.layout.partition()
                .size([2 * Math.PI, radius * radius])
                .value(function(d) { return d.size; });

            var arc = d3.svg.arc()
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) {
                    switch(d.depth){
                        case 0:
                            return 0;
                        case 1:
                            return 44;
                        case 2:
                            return 30;
                        case 3:
                            return 37;
                        default :
                            return Math.round(Math.sqrt(d.y + d.dy));
                    }
                })
                .outerRadius(function(d) {
                    switch(d.depth){
                        case 0:
                            return 0;
                        case 1:
                            return 47;
                        case 2:
                            return 37;
                        case 3:
                            return 44;
                        default :
                            return Math.round(Math.sqrt(d.y + d.dy));
                    }
                });

            svg.append("circle")
                .attr("r", radius)
                .style("opacity", 0)
                .on("click",switchfunc);

            d3.json("../../assets/json/data.json",function(error,root){
                svg.datum(root).selectAll("g")
                    .data(partition.nodes)
                    .enter().append("g")
                    .append("path")
                    .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
                    .attr("d", arc)
                    .style("fill", "#EFC9CA")
                    .style("stroke", "#fff")
                    .style("opacity",1)
                    .on("click",switchfunc);
            });

            function switchfunc(d){
                console.log("switch clicked");

                 if(that.switch == 0){
                     //Phase 2
                     that.switch = 1;
                     $(".phase1").hide();
                     $(".phase2").show();
                     svg.selectAll("path")
                         .style("fill", "#B5C490")
                         .style("stroke", "#fff")
                         .style("opacity",1);
                 }else{
                     // Phase 1
                     that.switch = 0;
                     $(".phase2").hide();
                     $(".phase1").show();
                     svg.selectAll("path")
                         .style("fill", "#EFC9CA")
                         .style("stroke", "#fff")
                         .style("opacity",1);
                 }
            }
        }
};

return lib;
}());