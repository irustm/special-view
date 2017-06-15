/*
    JQuery SpecialView v1.0.0
    author:Jamak
    gitHub:Jamaks
    02.02.2017

*/
var visorName = 'visorSettings';

var SpecialView = {
    run: function (runSettings) {
        //global functions
        $("#vi-close").click(function () {
            // $("#vi-open").show();
            SpecialView.visibleOff();
        });
        $(".vi-open").click(function () {

            SpecialView.visibleOn();
        });
        //private
        function getDefaultOrOriginSettings() {
            var settModel = SpecialView.SettingsManager.get();
            if (settModel == null) {
                settModel = SpecialView.settings.defaultSettings;
            }
            return settModel;
        }
        //setting actions
        $("#VisualHeader .vi_panel a").click(function () {
            var mainCor = $(this).attr("Id");

            //get settings model
            var settModel = getDefaultOrOriginSettings();
            switch (mainCor) {
                case "vi-color1":
                    settModel.data["color"] = "black";
                    settModel.data["background-color"] = "white";
                    break;
                case "vi-color2":
                    settModel.data["color"] = "white";
                    settModel.data["background-color"] = "black";
                    break;
                case "vi-color3":
                    settModel.data["color"] = "#a9e44d";
                    settModel.data["background-color"] = "#3b2716";
                    break;
                case "vi-fontsize-smallest":
                    settModel.data["font-size"] = "14px";
                    break;
                case "vi-fontsize-small":
                    settModel.data["font-size"] = "16px";
                    break;
                case "vi-fontsize-normal":
                    settModel.data["font-size"] = "18px";
                    break;
                case "vi-fontsize-big":
                    settModel.data["font-size"] = "22px";
                    break;
                case "vi-fontsize-bigest":
                    settModel.data["font-size"] = "26px";
                    break;
                case "vi-image1":
                    settModel.image = "gray";
                    break;
                case "vi-image2":
                    settModel.image = "full";
                    break;
                case "vi-image3":
                    settModel.image = "none";
                    break;
                default:
            }
            SpecialView.PageManager.updatePage(settModel);
        });

        //first load
        var model = SpecialView.SettingsManager.get();
        if (model != null && model.visibly == true) {
            SpecialView.visibleOn();
        }
    },
    visibleOn: function () {
        $("#VisualHeader").show();
       
        $(".vi-open").hide();
        SpecialView.PageManager.updatePage(SpecialView.SettingsManager.get());
    },
    visibleOff: function () {
        var model = SpecialView.SettingsManager.get();
        model.visibly = false;
        SpecialView.SettingsManager.set(model);
        window.location.reload();
    },

    SettingsManager: {
        get: function () {
            if (localStorage.getItem(visorName) != null) {
                return JSON.parse(localStorage.getItem(visorName));
            }
            else {
                return null;
            }
        },
        set: function (setting) {
            SpecialView.SettingsManager.clear();
            localStorage.setItem(visorName, JSON.stringify(setting));
        },
        clear: function () {
            localStorage.removeItem(visorName);
        }
    },
    PageManager: {
        updatePage: function (model) {
            if (model == null) {
                model = SpecialView.settings.defaultSettings;
            }
            model.visibly = true;
            SpecialView.SettingsManager.set(model);

            var data = model.data;

            //update VisualHeader
            $("#VisualHeader .vi_panel #vi-colors").children().removeClass("active");
            $("#VisualHeader .vi_panel #vi-fontsize").children().removeClass("active");
            $("#VisualHeader .vi_panel #vi-image").children().removeClass("active");
            //fontSize
            switch (data["font-size"]) {
                case "14px":
                    $("#VisualHeader .vi_panel #vi-fontsize #vi-fontsize-smallest").addClass("active");
                    break;
                case "16px":
                    $("#VisualHeader .vi_panel #vi-fontsize #vi-fontsize-small").addClass("active");
                    break;
                case "18px":
                    $("#VisualHeader .vi_panel #vi-fontsize #vi-fontsize-normal").addClass("active");
                    break
                case "22px":
                    $("#VisualHeader .vi_panel #vi-fontsize #vi-fontsize-big").addClass("active");
                    break
                case "26px":
                    $("#VisualHeader .vi_panel #vi-fontsize #vi-fontsize-bigest").addClass("active");
                    break;
                default:
            }
            //Color
            switch (data["color"]) {
                case "black":
                    $("#VisualHeader .vi_panel #vi-colors #vi-color1").addClass("active");
                    break;
                case "white":
                    $("#VisualHeader .vi_panel #vi-colors #vi-color2").addClass("active");
                    break;
                case "#a9e44d":
                    $("#VisualHeader .vi_panel #vi-colors #vi-color3").addClass("active");
                    break;
                default:
            }
            //Color
            switch (model.image) {
                case "gray":
                    $("#VisualHeader .vi_panel #vi-image #vi-image1").addClass("active");
                    $('img:not(.vi-nopart)').css("-webkit-filter", "grayscale(100%)");
                    break;
                case "full":
                    $("#VisualHeader .vi_panel #vi-image #vi-image2").addClass("active");
                    $('img:not(.vi-nopart)').css("-webkit-filter", "");
                    $('img:not(.vi-nopart)').css("display", "block");
                    break;
                case "none":
                    $("#VisualHeader .vi_panel #vi-image #vi-image3").addClass("active");
                    $('img:not(.vi-nopart)').css("display", "none");
                    break;
                default:
            }

          //  $('img').css("-webkit-filter", "grayscale(100%)");
            $('iframe').css("display", "none");
            $('*').map(function () {

                //console.log();
                if (this.nodeName != 'I' && this.nodeName != 'HTML' && this.nodeName != 'HEAD' && this.id != "VisualHeader" && !$(this).hasClass("vi-nopart")) {

                    if ($(this).parents("#VisualHeader").length != 1) { //&& $(this).parent().parent().attr("id") != "VisualHeader" && $(this).parent().parent().parent().attr("id") != "VisualHeader") {
                        //для искючений
                        if (!$(this).hasClass("blog-item-small-image-responsive")) {
                            $(this).css("background", data['background'])
                           .css("color", data['color'])
                           .css("font-size", data['font-size'])
                           .css("box-shadow", data['box-shadow'])
                           .css("font-family", data['font-family'])
                           .css("text-shadow", data['text-shadow'])
                           .css("letter-spacing", data['letter-spacing'])
                           .css("font-weight", data['font-weight'])
                           .css("background-color", data['background-color'])
                           .css("border", data['border']);
                        }
                        else {
                            switch (model.image) {
                                case "gray":
                                    $(this).css("-webkit-filter", "grayscale(100%)");
                                    $(this).css("display", "block");
                                    break;
                                case "full":
                                    $(this).css("-webkit-filter", "");
                                    $(this).css("display", "block");
                                    break;
                                case "none":
                                    $(this).css("display", "none");
                                    break;
                                default:
                            }
                        }

                    }
                }
            });

            

        }
    },
    settings: {
        defaultSettings: {
            visibly: false,
            data: {
                "background": "none",
                "color": "black",
                "font-size": "22px",
                "box-shadow": "none",
                "font-family": "Arial, sans-serif",
                "text-shadow": "none",
                "letter-spacing": "0px",
                "font-weight": "0px",
                "background-color": "white",
                "border": "none",
            },
            image:"none"
        }
    },
    htmlBody:' <div id="VisualHeader" style="display: none;">'
    +' <div class="vi_panel"> <span id="vi-fontsize"><a href="#"'
    +' id="vi-fontsize-smallest" title="Маленький размер шрифта">A</a><a hre'
    +'f="#" id="vi-fontsize-small" title="Уменьшенный размер шрифта" class="'
    +'">A</a><a href="#" id="vi-fontsize-normal" title="Нормальный размер шр'
    +'ифта">A</a><a href="#" id="vi-fontsize-big" title="Увеличенный размер '
    +'шрифта" class="active">A</a><a href="#" id="vi-fontsize-bigest" title='
    +'"Большой размер шрифта">A</a></span> <span id="vi-colors">'
    +' <a href="#" id="vi-color1" title="Цветовая схема: Чер'
    +'ным по белому" class="">A</a> <a href="#" id="vi-color'
    +'2" title="Цветовая схема: Белым по черному" class="active">A</a>'
    +'<a href="#" id="vi-color3" title="Цветовая схема:  Коричнев'
    +'ым по бежевому">А</a></span>' +' <span id="vi-image"> <a href="#" id="vi-image1"  titl'
    +'e="Изображения: Черно-Белое"><img class="vi-nopart" src="data:image/sv'
    +'g+xml;base64,PHN2ZyBmaWxsPSIjOTk5IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgM'
    +'jQgMjQiIHdpZHRoPSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4'
    +'gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkP'
    +'SJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDI'
    +'tLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0em0tNS4wNC02Ljcxb'
    +'C0yLjc1IDMuNTQtMS45Ni0yLjM2TDYuNSAxN2gxMWwtMy41NC00LjcxeiIvPjwvc3ZnPg='
    +'="/> </a><a href="#" id="vi-image2" title="Изображени'
    +'я: Включить"><img class="vi-nopart" src="data:image/svg+xml;base64,PHN'
    +'2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZ'
    +'HRoPSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGg'
    +'gZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTkgM0g1Y'
    +'y0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjV'
    +'jMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0em0tNS4wNC02LjcxbC0yLjc1IDMuN'
    +'TQtMS45Ni0yLjM2TDYuNSAxN2gxMWwtMy41NC00LjcxeiIvPjwvc3ZnPg=="/></a> '
    +'<a href="#" id="vi-image3" title="Изображения: Выключить"'
    +' class="active"><img class="vi-nopart" src="data:image/svg+xml;base64,'
    +'PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIH'
    +'dpZHRoPSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBh'
    +'dGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMyA1dj'
    +'RoMlY1aDRWM0g1Yy0xLjEgMC0yIC45LTIgMnptMiAxMEgzdjRjMCAxLjEuOSAyIDIgMmg0'
    +'di0ySDV2LTR6bTE0IDRoLTR2Mmg0YzEuMSAwIDItLjkgMi0ydi00aC0ydjR6bTAtMTZoLT'
    +'R2Mmg0djRoMlY1YzAtMS4xLS45LTItMi0yeiIvPjwvc3ZnPg=="/></a>'
    +'</span><span id="vi-close"> <a href="#" t'
    +'itle="Выход из специального режима" class="active">x</a> <'
    +'/span> </div> </div>',
}
 $('body').before(SpecialView.htmlBody);